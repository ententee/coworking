Setup instructions:

Choose your combination of backend/frontend as assigned.

Backend will always start on port 5000, frontend on port 3000.

# Backend

## .NET

Prerequisity: .NET 9

navigate to backend/dotnet
> dotnet restore
> dotnet run

## Java Spring Boot

Prerequisity: Java 21

navigate to backend/java
> mvn package
> java -jar target/coworking-0.0.1-SNAPSHOT.jar

## Python - FastAPI

Prerequisity: Python 3.8+

navigate to backend/python/FastAPI
> python -m venv venv
> source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
> pip install -r requirements.txt
> uvicorn main:app --host 0.0.0.0 --port 5000 --reload

# Frontend

## React

Prerequisity: node.js 18 (should work on higher versions as well)

navigate to frontend/react
> npm clean-install
> npm run dev

## Angular

Prerequisity: node.js 20 (should work on higher versions as well)

navigate to frontend/angular
> npm clean-install
> npm run dev