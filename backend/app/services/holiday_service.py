HOLIDAYS = {
    "2026-01-26": "Republic Day",
    "2026-03-04": "Holi",
    "2026-04-02": "Ram Navami",
    "2026-04-14": "Ambedkar Jayanti",
    "2026-05-01": "May Day",
    "2026-08-15": "Independence Day",
    "2026-08-28": "Janmashtami",
    "2026-10-02": "Gandhi Jayanti",
    "2026-10-20": "Dussehra",
    "2026-11-08": "Diwali",
    "2026-11-09": "Diwali Holiday",
    "2026-11-24": "Guru Nanak Jayanti",
    "2026-12-25": "Christmas",
}


def get_holiday(date: str):
    """
    Return holiday information for a date.

    Returns None when no holiday is recorded.
    """

    holiday_name = HOLIDAYS.get(date)

    if holiday_name is None:
        return None

    return {
        "name": holiday_name,
        "type": "national",
    }


def get_holiday_effect(
    date: str,
    destination: str,
):
    """
    Return the estimated crowd impact of a holiday.

    This is currently a rule-based baseline.
    It will later be replaced or calibrated using
    proper regional holiday and tourism data.
    """

    holiday = get_holiday(date)

    if holiday is None:
        return {
            "name": None,
            "type": None,
            "effect": 0,
        }

    destination_key = destination.strip().lower()

    effect = 20

    # Hill destinations can experience stronger
    # domestic tourist movement during holidays.
    if destination_key in {
        "darjeeling",
        "gangtok",
        "shillong",
    }:
        effect = 22

    # Goa has strong holiday and vacation demand,
    # but the effect is kept within a controlled range.
    elif destination_key == "goa":
        effect = 20

    return {
        "name": holiday["name"],
        "type": holiday["type"],
        "effect": effect,
    }