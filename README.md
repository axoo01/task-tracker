# RESTful Task Tracker API

A simple, structured REST API built with **Express.js** and 
**Node.js** using the **MVC (Model-View-Controller)** pattern.

---

## How to Run Locally

*   **Install Dependencies:**
    ```bash
    npm install
    ```

*   **Configure Environment:**
    Create a `.env` file at the root:
    ```env
    PORT=3000
    NODE_ENV=development
    ```

*   **Start the Server (with auto-reload):**
    ```bash
    npm run dev
    ```
    The server will run at: `http://localhost:3000`

---

## API Endpoints

All resource paths are prefixed with `/api/v1`.

*   **GET** `/health` — API health check
*   **GET** `/tasks` — Get all tasks
*   **GET** `/tasks/:id` — Get task by ID
*   **POST** `/tasks` — Create a task (Requires: `{ 
"title": "string" }`)
*   **PATCH** `/tasks/:id` — Update task fields 
(Accepts: `{ "title": "string", "completed": boolean }`)
*   **DELETE** `/tasks/:id` — Delete a task
