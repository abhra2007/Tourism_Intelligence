def generate_recommendations(
    score: float,
    crowd_trend: list,
    weather: dict,
    events: list,
    calendar: dict,
):
    """
    Generate explainable visit recommendations from
    the current rule-based analysis signals.

    These are rule-based recommendations, not AI-generated
    recommendations.
    """

    recommendations = []

    # ==================== CROWD SCORE ====================

    if score >= 80:
        recommendations.append(
            "Expect very high crowd levels. Consider visiting at a quieter time."
        )

    elif score >= 60:
        recommendations.append(
            "Crowd levels are expected to be high. Consider an earlier or later visit."
        )

    elif score >= 40:
        recommendations.append(
            "Crowd levels are expected to be moderate."
        )

    else:
        recommendations.append(
            "Crowd levels are expected to be relatively low."
        )

    # ==================== BEST TIME ====================

    if crowd_trend:
        lowest_period = min(
            crowd_trend,
            key=lambda item: item["score"],
        )

        highest_period = max(
            crowd_trend,
            key=lambda item: item["score"],
        )

        recommendations.append(
            f"The lowest estimated crowd period is around "
            f"{lowest_period['time']} "
            f"with a score of {lowest_period['score']}."
        )

        recommendations.append(
            f"The highest estimated crowd period is around "
            f"{highest_period['time']} "
            f"with a score of {highest_period['score']}."
        )

    # ==================== WEATHER ====================

    rain_probability = weather.get(
        "precipitationProbability",
        0,
    )

    temperature = weather.get(
        "temperature",
    )

    if rain_probability >= 70:
        recommendations.append(
            "A high probability of rain is expected. "
            "Carry suitable rain protection and consider flexible outdoor plans."
        )

    elif rain_probability >= 40:
        recommendations.append(
            "There is a moderate chance of rain. "
            "Keep a rain layer available."
        )

    if temperature is not None:

        if temperature >= 35:
            recommendations.append(
                "High temperatures are expected. "
                "Prefer cooler hours and stay hydrated."
            )

        elif temperature <= 5:
            recommendations.append(
                "Cold conditions are expected. "
                "Plan appropriate clothing for outdoor activities."
            )

    # ==================== EVENTS ====================

    if events:
        event_names = ", ".join(
            event["name"]
            for event in events
        )

        recommendations.append(
            f"An event may increase local visitor activity: "
            f"{event_names}."
        )

    # ==================== HOLIDAY ====================

    holiday = calendar.get(
        "holiday",
    )

    if holiday:
        recommendations.append(
            f"{holiday} may contribute to increased visitor activity."
        )

    # ==================== FALLBACK ====================

    if not recommendations:
        recommendations.append(
            "No major crowd-related recommendation is currently available."
        )

    return recommendations