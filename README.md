# Login CRUD Assignment

## Project Description
A full-stack User Management system built to demonstrate CRUD operations and secure user authentication. 

## Technologies Used
- **Backend:** Spring Boot (REST API), H2 Database (in-memory data storage).
- **Frontend:** React & Vite (fast, responsive UI).

## Functionalities
Register, securely log in, view the dashboard, update details, and delete users.

## Architecture (MVC & REST API)
This application follows a concise Model-View-Controller (MVC) pattern adapted for APIs:
- **Model (Data):** Java classes representing database entities (e.g., `User`). Managed by Spring Data JPA.
- **View (UI):** The React frontend renders the client-side user interface.
- **Controller & API:** Spring Boot `@RestController` classes expose a REST API. They map HTTP requests to backend logic and serve JSON data back to React.

## How it can be used (Initializing it)

### 1. Spring Boot Backend
From the root directory (`Login-Crud-Assignment/`):
```bash
./mvnw spring-boot:run
```
### 2. React Frontend
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*(Runs on `http://localhost:5173`.)*
