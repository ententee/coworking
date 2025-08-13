from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from . import crud
from . import schemas
from .database import SessionLocal, engine
from .routers import auth_router, items_router

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router.router)
app.include_router(items_router.router)


@app.on_event("startup")
def startup_event():
    # Pre-populate the database with some data for demonstration
    db = SessionLocal()
    if not crud.get_items(db):
        crud.create_item(db, schemas.ItemCreate(name="Laptop", amount=10))
        crud.create_item(db, schemas.ItemCreate(name="Monitor", amount=15))
        crud.create_item(db, schemas.ItemCreate(name="Keyboard", amount=30))
    db.close()
