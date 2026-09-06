from datetime import datetime


EVENTS = [
    {
        "destination": "darjeeling",
        "name": "Autumn Cultural Festival",
        "date": "2026-09-10",
        "start_time": "11:00",
        "end_time": "18:00",
        "impact": "Medium",
        "impact_score": 10,
        "source": "synthetic_baseline",
    },
    {
        "destination": "gangtok",
        "name": "Local Cultural Program",
        "date": "2026-09-10",
        "start_time": "12:00",
        "end_time": "19:00",
        "impact": "Medium",
        "impact_score": 10,
        "source": "synthetic_baseline",
    },
    {
        "destination": "shillong",
        "name": "Cultural Music Event",
        "date": "2026-09-10",
        "start_time": "14:00",
        "end_time": "20:00",
        "impact": "Medium",
        "impact_score": 10,
        "source": "synthetic_baseline",
    },
    {
        "destination": "goa",
        "name": "Beach Cultural Event",
        "date": "2026-09-10",
        "start_time": "16:00",
        "end_time": "22:00",
        "impact": "Medium",
        "impact_score": 10,
        "source": "synthetic_baseline",
    },
]


def get_events(
    destination: str,
    date: str,
    time: str,
):
    """
    Return events matching the destination, date
    and selected time.

    Current data is synthetic baseline data.
    It will later be replaced with legitimate
    public event sources.
    """

    destination_key = destination.strip().lower()

    selected_time = datetime.strptime(
        time,
        "%H:%M",
    ).time()

    matching_events = []

    for event in EVENTS:

        if event["destination"] != destination_key:
            continue

        if event["date"] != date:
            continue

        start_time = datetime.strptime(
            event["start_time"],
            "%H:%M",
        ).time()

        end_time = datetime.strptime(
            event["end_time"],
            "%H:%M",
        ).time()

        if start_time <= selected_time <= end_time:
            matching_events.append(event)

    return matching_events


def calculate_event_effect(
    events: list,
):
    """
    Convert matching events into a controlled
    crowd-model contribution.
    """

    if not events:
        return 0

    total_effect = sum(
        event["impact_score"]
        for event in events
    )

    return max(
        0,
        min(total_effect, 15),
    )