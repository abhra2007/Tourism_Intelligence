from datetime import datetime, date, timedelta

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.schemas.analysis import AnalysisResponse

from app.services.weather_service import get_weather

from app.services.crowd_service import (
    calculate_crowd_score,
    get_crowd_level,
    generate_crowd_trend,
)

from app.services.destination_service import (
    get_destination,
)

from app.services.transport_service import (
    get_transport_signal,
)

from app.services.historical_service import (
    get_historical_pattern,
)

from app.services.recommendation_service import (
    generate_recommendations,
)


router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"],
)


class AnalysisRequest(BaseModel):
    destination: str
    date: str
    time: str


def validate_date_and_time(
    date_string: str,
    time_string: str,
):
    try:
        selected_datetime = datetime.strptime(
            f"{date_string} {time_string}",
            "%Y-%m-%d %H:%M",
        )

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail=(
                "Invalid date or time format. "
                "Use YYYY-MM-DD for date and HH:MM for time."
            ),
        )

    today = date.today()

    max_forecast_date = today + timedelta(days=16)

    selected_date = selected_datetime.date()

    if selected_date < today:
        raise HTTPException(
            status_code=400,
            detail="The analysis date cannot be in the past.",
        )

    if selected_date > max_forecast_date:
        raise HTTPException(
            status_code=400,
            detail=(
                "The selected date is outside the current "
                "live weather forecast range. Please choose "
                "a date within the next 16 days."
            ),
        )

    return selected_datetime


@router.post(
    "/",
    response_model=AnalysisResponse,
)
async def analyze_destination(
    request: AnalysisRequest,
):
    if not request.destination.strip():
        raise HTTPException(
            status_code=400,
            detail="Destination cannot be empty.",
        )

    validate_date_and_time(
        request.date,
        request.time,
    )

    destination = get_destination(
        request.destination
    )

    if destination is None:
        raise HTTPException(
            status_code=404,
            detail=(
                f"Destination '{request.destination}' "
                "is not currently supported."
            ),
        )

    try:
        weather = await get_weather(
            latitude=destination.latitude,
            longitude=destination.longitude,
            date=request.date,
            time=request.time,
        )

    except Exception as error:
        print(
            f"Weather service error: {error}"
        )

        raise HTTPException(
            status_code=502,
            detail="Unable to retrieve weather data.",
        )

    transport = get_transport_signal(
        destination=destination.name,
        date=request.date,
        time=request.time,
    )

    historical = get_historical_pattern(
        destination=destination.name,
        date=request.date,
        time=request.time,
    )

    scoring = calculate_crowd_score(
        date=request.date,
        time=request.time,
        weather=weather,
        destination=destination.name,
        transport=transport,
    )

    score = scoring["score"]

    crowd_trend = generate_crowd_trend(
        date=request.date,
        weather=weather,
        destination=destination.name,
        transport=transport,
    )

    recommendations = generate_recommendations(
        score=score,
        crowd_trend=crowd_trend,
        weather=weather,
        events=scoring["events"],
        calendar=scoring["calendar"],
    )

    return {
        "destination": destination.name,
        "date": request.date,
        "time": request.time,

        "location": {
            "latitude": destination.latitude,
            "longitude": destination.longitude,
        },

        "crowd": {
            "score": score,
            "level": get_crowd_level(score),
            "confidence": 65,
        },

        "factors": scoring["factors"],

        "calendar": scoring["calendar"],

        "events": scoring["events"],

        "historical": historical,

        "crowd_trend": crowd_trend,

        "recommendations": recommendations,

        "weather": weather,

        "transport": transport,

        "data_status": {
            "crowd_model": "rule_based",
            "weather": "live_open_meteo",
            "seasonality": "rule_based",
            "holidays": "rule_based",
            "transport": "estimated_rule_based",
            "events": "synthetic_baseline",
            "historical": "estimated_baseline",
            "crowd_trend": "rule_based",
            "recommendations": "rule_based",
        },

        "message": (
            "Calendar-aware rule-based analysis "
            "generated successfully."
        ),
    }