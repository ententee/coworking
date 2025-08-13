from .database import SessionLocal


def get_db():
    """
    A dependency that provides a database session to the path operation function.
    It creates a new session for each request and closes it when the request is done.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
