from datetime import datetime

from app.services.holiday_service import get_holiday_effect
from app.services.events_service import (
    get_events,
    calculate_event_effect,
)


def calculate_seasonality(
    destination: str,
    date: str,
):
    selected_date = datetime.strptime(
        date,
        "%Y-%m-%d",
    )

    month = selected_date.month
    destination_key = destination.strip().lower()

    season = "Regular Season"
    season_factor = 0

    if destination_key in {"darjeeling", "gangtok"}:
        if month in {3, 4, 5, 10, 11}:
            season = "Peak Tourist Season"
            season_factor = 15
        elif month in {6, 7, 8, 9}:
            season = "Monsoon / Lower Season"
            season_factor = -10
        else:
            season = "Winter Season"
            season_factor = 5

    elif destination_key == "shillong":
        if month in {3, 4, 5, 10, 11}:
            season = "Peak Tourist Season"
            season_factor = 12
        elif month in {6, 7, 8, 9}:
            season = "Monsoon / Lower Season"
            season_factor = -12
        else:
            season = "Winter Season"
            season_factor = 3

    elif destination_key == "goa":
        if month in {11, 12, 1, 2}:
            season = "Peak Tourist Season"
            season_factor = 18
        elif month in {6, 7, 8, 9}:
            season = "Monsoon / Lower Season"
            season_factor = -15
        else:
            season = "Regular Season"
            season_factor = 5

    return {
        "season": season,
        "effect": season_factor,
    }


def calculate_crowd_score(
    date: str,
    time: str,
    weather: dict,
    destination: str,
    transport: dict | None = None,
):
    selected_date = datetime.strptime(
        f"{date} {time}",
        "%Y-%m-%d %H:%M",
    )

    # ==================== BASE ====================

    base_score = 40

    weekend_factor = 0
    time_factor = 0
    weather_factor = 0
    transport_factor = 0
    event_factor = 0

    # ==================== WEEKEND ====================

    if selected_date.weekday() >= 5:
        weekend_factor = 20

    # ==================== TIME OF DAY ====================

    hour = selected_date.hour

    if 10 <= hour < 14:
        time_factor = 25
    elif 14 <= hour < 17:
        time_factor = 15
    elif 8 <= hour < 10:
        time_factor = 5
    elif 17 <= hour < 20:
        time_factor = 10
    else:
        time_factor = -10

    # ==================== WEATHER ====================

    rain_probability = weather.get(
        "precipitationProbability",
        0,
    )

    temperature = weather.get(
        "temperature",
        20,
    )

    if rain_probability >= 70:
        weather_factor -= 15
    elif rain_probability >= 40:
        weather_factor -= 8
    elif rain_probability <= 10:
        weather_factor += 5

    if temperature >= 35:
        weather_factor -= 10
    elif temperature <= 5:
        weather_factor -= 8

    weather_factor = max(
        -20,
        min(weather_factor, 10),
    )

    # ==================== SEASONALITY ====================

    season_data = calculate_seasonality(
        destination,
        date,
    )

    season_factor = season_data["effect"]

    # ==================== HOLIDAY ====================

    holiday_data = get_holiday_effect(
        date=date,
        destination=destination,
    )

    holiday_factor = holiday_data["effect"]
    holiday_name = holiday_data["name"]
    holiday_type = holiday_data["type"]

    # ==================== EVENTS ====================

    events = get_events(
        destination=destination,
        date=date,
        time=time,
    )

    event_factor = calculate_event_effect(events)

    # ==================== TRANSPORT ====================

    if transport:
        demand_score = transport.get(
            "demand_score",
            0,
        )

        transport_factor = round(
            (demand_score - 50) * 0.20,
            1,
        )

        transport_factor = max(
            -10,
            min(transport_factor, 10),
        )

    # ==================== FINAL SCORE ====================

    score = (
        base_score
        + weekend_factor
        + time_factor
        + weather_factor
        + season_factor
        + holiday_factor
        + transport_factor
        + event_factor
    )

    score = max(
        0,
        min(score, 100),
    )

    # ==================== RESULT ====================

    return {
        "score": score,

        "factors": {
            "base_score": base_score,
            "weekend_effect": weekend_factor,
            "time_of_day_effect": time_factor,
            "weather_effect": weather_factor,
            "seasonality_effect": season_factor,
            "holiday_effect": holiday_factor,
            "transport_effect": transport_factor,
            "event_effect": event_factor,
        },

        "calendar": {
            "season": season_data["season"],
            "holiday": holiday_name,
            "holiday_type": holiday_type,
        },

        "events": events,
    }


def get_crowd_level(score: int) -> str:

    if score >= 80:
        return "Very High"

    if score >= 60:
        return "High"

    if score >= 40:
        return "Moderate"

    if score >= 20:
        return "Low"

    return "Very Low"

def generate_crowd_trend(
    date: str,
    weather: dict,
    destination: str,
    transport: dict | None = None,
):
    """
    Generate estimated crowd scores across the day.

    Uses the same rule-based crowd model as the main
    prediction, while changing only the selected time.

    Weather is kept constant for the selected date.
    Transport demand is recalculated for each time.
    """

    trend_times = [
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
    ]

    trend = []

    for trend_time in trend_times:
        trend_transport = transport

        if transport is not None:
            from app.services.transport_service import (
                get_transport_signal,
            )

            trend_transport = get_transport_signal(
                destination=destination,
                date=date,
                time=trend_time,
            )

        scoring = calculate_crowd_score(
            date=date,
            time=trend_time,
            weather=weather,
            destination=destination,
            transport=trend_transport,
        )

        trend.append(
            {
                "time": trend_time,
                "score": scoring["score"],
            }
        )

    return trend