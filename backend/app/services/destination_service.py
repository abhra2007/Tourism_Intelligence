from sqlalchemy import select

from app.database.session import SessionLocal
from app.models.destination import Destination


def get_destination(destination: str):
    destination_key = destination.strip().lower()

    db = SessionLocal()

    try:
        statement = select(Destination).where(
            Destination.id == destination_key
        )

        result = db.execute(statement)

        return result.scalar_one_or_none()

    finally:
        db.close()


def get_all_destinations():
    db = SessionLocal()

    try:
        statement = select(Destination).order_by(
            Destination.name
        )

        result = db.execute(statement)

        destinations = result.scalars().all()

        return [
            {
                "id": destination.id,
                "name": destination.name,
                "state": destination.state,
                "country": destination.country,
                "latitude": destination.latitude,
                "longitude": destination.longitude,
            }
            for destination in destinations
        ]

    finally:
        db.close()