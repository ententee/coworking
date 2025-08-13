# Python FastAPI Backend for Coworking Warehouse

This is a simple warehouse management backend built with Python and the FastAPI framework. It's designed as a home assignment for candidates.

## Features

- **Authentication**: JWT-based authentication for securing endpoints.
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for warehouse items.
- **In-Memory Database**: Uses SQLite in-memory database, so there are no external database dependencies.
- **CORS**: Pre-configured to allow requests from `http://localhost:3000`.

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication
- `POST /auth/login`: Authenticate and receive a JWT.

### Items
- `GET /items`: Retrieve all items.
- `GET /items/{id}`: Retrieve a single item by its ID.
- `POST /items`: Create a new item.
- `PUT /items/{id}`: Update an existing item.
- `DELETE /items/{id}`: Delete an item.

## Setup and Installation

1.  **Prerequisites**:
    - Python 3.8+

2.  **Create a virtual environment** (recommended):
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install dependencies**:
    Navigate to the `python-fastapi` directory and run:
    ```sh
    pip install -r requirements.txt
    ```

## Running the Application

To start the server, run the following command from within the `python-fastapi` directory:

```sh
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
```

The application will be available at `http://localhost:5000`.
You can access the interactive API documentation at `http://localhost:5000/docs`.