from fastapi import APIRouter

from app.services.destination_service import (
    get_all_destinations,
)


router = APIRouter(
    prefix="/destinations",
    tags=["Destinations"],
)


@router.get("/")
def list_destinations():
    return {
        "destinations": get_all_destinations()
    }