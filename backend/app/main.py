from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.repositories import router as repositories_router
from app.api.graph import router as graph_router


app = FastAPI(
    title="TENVOR",
    version="0.1.0",
    description="AI-powered codebase intelligence platform",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(repositories_router)
app.include_router(graph_router)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "tenvor-api",
        "version": "0.1.0",
    }
