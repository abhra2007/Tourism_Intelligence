from datetime import datetime


def get_historical_pattern(
    destination: str,
    date: str,
    time: str,
):
    """
    Return a baseline historical crowd pattern.

    Current values are estimated development baselines.
    They are NOT observed real-world crowd counts.

    Later this service can be replaced with validated
    historical tourism/crowd datasets.
    """

    selected_date = datetime.strptime(
        f"{date} {time}",
        "%Y-%m-%d %H:%M",
    )

    destination_key = destination.strip().lower()

    weekday = selected_date.weekday()
    hour = selected_date.hour

    # Base historical pattern.
    average_score = 50

    if destination_key == "darjeeling":
        average_score = 58

    elif destination_key == "gangtok":
        average_score = 55

    elif destination_key == "shillong":
        average_score = 48

    elif destination_key == "goa":
        average_score = 62

    # Weekend historical increase.
    weekend_effect = 10 if weekday >= 5 else 0

    # Typical daily tourist activity pattern.
    if 10 <= hour < 14:
        time_effect = 15
    elif 14 <= hour < 17:
        time_effect = 10
    elif 8 <= hour < 10:
        time_effect = 5
    elif 17 <= hour < 20:
        time_effect = 5
    else:
        time_effect = -5

    estimated_score = (
        average_score
        + weekend_effect
        + time_effect
    )

    estimated_score = max(
        0,
        min(estimated_score, 100),
    )

    # Determine typical peak period.
    peak_period = "10:00 AM – 2:00 PM"

    return {
        "average_score": average_score,
        "estimated_score": estimated_score,
        "peak_period": peak_period,
        "comparison": None,
        "source": "estimated_baseline",
        "status": "estimated",
        "is_observed_data": False,
    }