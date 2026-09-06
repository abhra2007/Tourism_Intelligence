from app.database.database import Base
from app.database.session import engine
from app.models.destination import Destination


def init_database():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully.")


if __name__ == "__main__":
    init_database()