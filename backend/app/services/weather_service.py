import httpx


OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"


async def get_weather(
    latitude: float,
    longitude: float,
    date: str,
    time: str,
):
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": (
            "temperature_2m,"
            "relative_humidity_2m,"
            "precipitation_probability,"
            "weather_code,"
            "wind_speed_10m"
        ),
        "start_date": date,
        "end_date": date,
        "timezone": "auto",
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(
                OPEN_METEO_URL,
                params=params,
            )

            response.raise_for_status()

            data = response.json()

    except httpx.HTTPError as error:
        raise RuntimeError(
            f"Open-Meteo request failed: {error}"
        ) from error

    except ValueError as error:
        raise RuntimeError(
            "Open-Meteo returned invalid JSON."
        ) from error

    hourly = data.get("hourly")

    if not hourly:
        raise RuntimeError(
            "Open-Meteo response does not contain hourly weather data."
        )

    hourly_times = hourly.get("time", [])

    target_time = f"{date}T{time}"

    if target_time not in hourly_times:
        raise RuntimeError(
            f"Weather data unavailable for {target_time}."
        )

    index = hourly_times.index(target_time)

    return {
        "temperature": hourly["temperature_2m"][index],
        "humidity": hourly["relative_humidity_2m"][index],
        "precipitationProbability": hourly[
            "precipitation_probability"
        ][index],
        "weatherCode": hourly["weather_code"][index],
        "windSpeed": hourly["wind_speed_10m"][index],
    }