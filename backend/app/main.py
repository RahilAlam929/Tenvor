from fastapi import FastAPI

from app.api.repositories import router as repositories_router


app = FastAPI(
    title="TENVOR",
    version="0.1.0",
    description="AI-powered codebase intelligence platform",
)

app.include_router(repositories_router)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "tenvor-api",
        "version": "0.1.0",
    }
