from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import schemas
from .. import auth
from .. import dependencies

router = APIRouter(
    prefix="/api/auth",
    tags=["authentication"],
)


@router.post("/login", response_model=schemas.Token)
def login_for_access_token(form_data: schemas.LoginRequest, db: Session = Depends(dependencies.get_db)):
    if form_data.username == "admin" and form_data.password == "admin":
        access_token = auth.create_access_token(
            data={"sub": form_data.username}
        )
        return {"success": True, "token": access_token}
    return {"success": False, "token": None}
