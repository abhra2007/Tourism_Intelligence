from datetime import datetime


def get_transport_signal(
    destination: str,
    date: str,
    time: str,
):
    """
    Generate a baseline transport-demand signal.

    This is currently an estimated signal.
    It will later be replaced with legitimate
    public transport data such as GTFS or
    GTFS-Realtime.
    """

    selected_datetime = datetime.strptime(
        f"{date} {time}",
        "%Y-%m-%d %H:%M",
    )

    hour = selected_datetime.hour
    weekday = selected_datetime.weekday()

    demand_score = 40

    # Weekend travel
    if weekday >= 5:
        demand_score += 20

    # Typical tourist movement periods
    if 8 <= hour < 11:
        demand_score += 15

    elif 11 <= hour < 15:
        demand_score += 20

    elif 15 <= hour < 19:
        demand_score += 10

    else:
        demand_score -= 10

    demand_score = max(
        0,
        min(demand_score, 100),
    )

    if demand_score >= 75:
        demand_level = "High"

    elif demand_score >= 50:
        demand_level = "Moderate"

    else:
        demand_level = "Low"

    return {
        "demand_score": demand_score,
        "demand_level": demand_level,
        "status": "Estimated",
        "source": "rule_based_baseline",
    }