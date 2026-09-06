from app.database.database import Base
from app.database.session import engine

from app.models.destination import Destination


def create_tables():
    Base.metadata.create_all(bind=engine)