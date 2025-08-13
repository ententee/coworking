from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import crud
from .. import schemas
from .. import auth
from .. import dependencies

router = APIRouter(
    prefix="/api/items",
    tags=["items"],
    dependencies=[Depends(auth.verify_token)]
)


@router.get("", response_model=schemas.Items)
def read_items(db: Session = Depends(dependencies.get_db)):
    items = crud.get_items(db)
    return {"items": items}


@router.get("/{item_id}", response_model=schemas.Item)
def read_item(item_id: int, db: Session = Depends(dependencies.get_db)):
    db_item = crud.get_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


@router.post("", response_model=schemas.Item, status_code=status.HTTP_201_CREATED)
def create_item(item: schemas.ItemCreate, db: Session = Depends(dependencies.get_db)):
    return crud.create_item(db=db, item=item)


@router.put("/{item_id}", response_model=schemas.Item)
def update_item(item_id: int, item: schemas.ItemUpdate, db: Session = Depends(dependencies.get_db)):
    if item.id is not None and item.id != item_id:
        raise HTTPException(status_code=400, detail="Item ID in body does not match item ID in path")

    db_item = crud.update_item(db=db, item_id=item_id, item=item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int, db: Session = Depends(dependencies.get_db)):
    success = crud.delete_item(db=db, item_id=item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item not found")
    return
