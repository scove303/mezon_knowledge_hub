# Entry point — runs the FastAPI app via uvicorn
# Usage: python main.py  OR  uvicorn app.main:app --reload
import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
