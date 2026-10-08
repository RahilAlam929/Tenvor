from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.repository.service import RepositoryService


router = APIRouter(
    prefix="/repositories",
    tags=["repositories"],
)

service = RepositoryService()


class RepositoryRequest(BaseModel):
    url: str


@router.post("/import")
def import_repository(request: RepositoryRequest):
    try:
        return service.clone(request.url)
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )
