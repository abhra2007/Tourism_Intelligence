from app.database.database import Base
from app.database.session import SessionLocal, engine
from app.models.destination import Destination


DESTINATIONS = [
    {
        "id": "darjeeling",
        "name": "Darjeeling",
        "state": "West Bengal",
        "country": "India",
        "latitude": 27.041,
        "longitude": 88.2663,
    },
    {
        "id": "gangtok",
        "name": "Gangtok",
        "state": "Sikkim",
        "country": "India",
        "latitude": 27.3389,
        "longitude": 88.6065,
    },
    {
        "id": "shillong",
        "name": "Shillong",
        "state": "Meghalaya",
        "country": "India",
        "latitude": 25.5788,
        "longitude": 91.8933,
    },
    {
        "id": "goa",
        "name": "Goa",
        "state": "Goa",
        "country": "India",
        "latitude": 15.2993,
        "longitude": 74.1240,
    },
]


def seed_destinations():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        for destination_data in DESTINATIONS:
            existing = db.get(
                Destination,
                destination_data["id"],
            )

            if existing is None:
                db.add(
                    Destination(**destination_data)
                )

        db.commit()

        print("DESTINATIONS SEEDED SUCCESSFULLY")

    finally:
        db.close()


if __name__ == "__main__":
    seed_destinations()