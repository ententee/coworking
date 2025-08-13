from pydantic import BaseModel
from typing import List, Optional


# --- Item Schemas ---
class ItemBase(BaseModel):
    name: str
    amount: int


class ItemCreate(ItemBase):
    pass


class ItemUpdate(ItemBase):
    id: Optional[int] = None


class Item(ItemBase):
    id: int

    class Config:
        from_attributes = True


class Items(BaseModel):
    items: List[Item] = []


# --- Auth Schemas ---
class LoginRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    success: bool
    token: Optional[str] = None
