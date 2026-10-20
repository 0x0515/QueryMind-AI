# QUERYMIND AI — React frontend preview

A UI prototype for learning how a React frontend can communicate with a FastAPI backend. It currently uses mock/sample data and does **not** authenticate users or connect to a database.

## Included routes

- `/dashboard` — overview, sample metrics, recent questions
- `/chat` — chat UI with a clearly labeled mock response
- `/login` — login screen (form is not connected)
- `/register` — registration screen (form is not connected)
- `/data-sources` — sample connections and a demo connection form
- `/settings` — profile settings demo

## Requirements

Install Node.js (LTS recommended), which includes `npm`.

## Run locally

From this folder:

```bash
npm install
npm run dev
```

Open the local URL Vite prints in the terminal, usually `http://localhost:5173`.

For a production build:

```bash
npm run build
npm run preview
```

## How the frontend will connect to FastAPI

React pages should call FastAPI endpoints over HTTP. The frontend should **not** connect directly to the database.

Example future flow:

- React chat form → `POST http://localhost:8000/api/v1/chat`
- Dashboard list → `GET http://localhost:8000/api/v1/dashboards`
- Data-source UI → future authenticated FastAPI endpoints

When the backend is running on another port, configure CORS in FastAPI to allow the Vite frontend origin (usually `http://localhost:5173`). Do not place database passwords or API secrets in React environment variables: frontend variables can be visible to users.

## Notes

- Vite is the tool that runs the React development server and bundles the app. It is likely the “V” tool you were remembering.
- React Router handles frontend page navigation. These paths are not the same thing as FastAPI API endpoints.
- This is a prototype, not production authentication. The login/register forms show demo messages only.
