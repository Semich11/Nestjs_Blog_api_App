Full-Stack Task Manager
This is a simple Task Manager web application built with NestJS for the backend and PostgreSQL for the database. The frontend will be implemented in React. The application allows users to view tasks, add new tasks, and mark tasks as completed. Everything is containerized using Docker Compose for easy setup.

Features
View a list of tasks

Add a new task

Mark a task as completed

Backend API connected to PostgreSQL

Dockerized backend and database


Tech Stack
Backend: NestJS, TypeORM, PostgreSQL
 Frontend: React (planned)
 Containerization: Docker, Docker Compose

Setup Instructions
Clone the repository
Start by cloning the repository from GitHub and navigating into the project folder.

command: https://github.com/Semich11/Fullstack_task_manager.git


Configure Backend Environment
Inside the backend folder, create a .env file with your PostgreSQL configuration. For example:
POSTGRES_HOST=db
 POSTGRES_PORT=5432
 POSTGRES_USER=postgres
 POSTGRES_PASSWORD=postgres
 POSTGRES_DB=tasksdb
The hostname db refers to the PostgreSQL service defined in docker-compose.yml.

Run Docker Compose
From the project root, run Docker Compose to start all services. This will start the PostgreSQL database and the NestJS backend. You can add the frontend later.

Run: docker compose up --build


Backend API Endpoints
The backend provides the following endpoints:
GET /task
 Returns a list of all tasks in the database.

POST /task
 Adds a new task. The request body should include the title and description of the task. Example:
 { "title": "Finish NestJS task", "description": "Write endpoints and connect to database" }

PUT /task/:id/complete
 Marks a task as completed. Provide the task ID in the URL; no request body is required.


Notes
The backend runs on http://localhost:3000.

PostgreSQL runs on port 5432 inside Docker.

Frontend
The frontend is not implemented yet.

Once implemented, it will display all tasks, allow users to add tasks, and mark tasks as completed by calling the backend API.


Author
Name: Christopher Chima

GitHub: https://github.com/Semich11
