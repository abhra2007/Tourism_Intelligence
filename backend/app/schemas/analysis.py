from pydantic import BaseModel


class LocationResponse(BaseModel):
    latitude: float
    longitude: float


class CrowdResponse(BaseModel):
    score: float
    level: str
    confidence: float


class CrowdFactorsResponse(BaseModel):
    base_score: float
    weekend_effect: float
    time_of_day_effect: float
    weather_effect: float
    seasonality_effect: float
    holiday_effect: float
    transport_effect: float
    event_effect: float


class CalendarResponse(BaseModel):
    season: str
    holiday: str | None
    holiday_type: str | None


class WeatherResponse(BaseModel):
    temperature: float | None
    humidity: float | None
    precipitationProbability: float | None
    weatherCode: int | None
    windSpeed: float | None


class TransportResponse(BaseModel):
    demand_score: float
    demand_level: str
    status: str
    source: str


class EventResponse(BaseModel):
    destination: str
    name: str
    date: str
    start_time: str
    end_time: str
    impact: str
    impact_score: float
    source: str


class HistoricalResponse(BaseModel):
    average_score: float
    estimated_score: float
    peak_period: str
    comparison: float | str | None
    source: str
    status: str
    is_observed_data: bool


class CrowdTrendPoint(BaseModel):
    time: str
    score: float


class DataStatusResponse(BaseModel):
    crowd_model: str
    weather: str
    seasonality: str
    holidays: str
    transport: str
    events: str
    historical: str
    crowd_trend: str
    recommendations: str


class AnalysisResponse(BaseModel):
    destination: str
    date: str
    time: str
    location: LocationResponse
    crowd: CrowdResponse
    factors: CrowdFactorsResponse
    calendar: CalendarResponse
    events: list[EventResponse]
    historical: HistoricalResponse
    crowd_trend: list[CrowdTrendPoint]
    recommendations: list[str]
    weather: WeatherResponse
    transport: TransportResponse
    data_status: DataStatusResponse
    message: str