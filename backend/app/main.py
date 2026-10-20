
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="QUERYMIND AI")

# Temporary mock data
dashboards = [
    {
        "id": 1,
        "title": "Sales Dashboard",
        "visualization": "bar",
        "data": [
            {"product": "Product A", "sales": 12000},
            {"product": "Product B", "sales": 9500},
        ],
    },
    {
        "id": 2,
        "title": "Inventory Dashboard",
        "visualization": "table",
        "data": [
            {"item": "Item A", "quantity": 150},
            {"item": "Item B", "quantity": 80},
        ],
    },
]


# Define the structure of a chat request
class ChatRequest(BaseModel):
    message: str


@app.get("/")
async def read_root():
    return {"message": "Welcome to QUERYMIND AI"}


@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok"}


@app.get("/api/v1/dashboards")
async def list_dashboards():
    return dashboards


@app.get("/api/v1/dashboards/{dashboard_id}")
async def read_dashboard(dashboard_id: int):
    for dashboard in dashboards:
        if dashboard["id"] == dashboard_id:
            return dashboard

    raise HTTPException(
        status_code=404,
        detail="Dashboard not found",
    )


@app.post("/api/v1/chat")
async def chat(request: ChatRequest):
    question = request.message.strip()

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty",
        )

    # Temporary response; no AI model is connected yet.
    return {
        "answer": f"Your question was: {question}",
        "data": [],
        "visualization": None,
    }
