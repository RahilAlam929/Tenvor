from fastapi import FastAPI

app = FastAPI(
    title="TENVOR",
    version="0.1.0",
    description="AI-powered codebase intelligence platform",
)

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "tenvor-api",
        "version": "0.1.0",
    }
