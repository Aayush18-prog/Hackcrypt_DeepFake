from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.config import Config
from src.model_service import DeepfakeModelService
import shutil
import os
import uuid
import uvicorn
import threading


app = FastAPI()
model_service = DeepfakeModelService()

# --- 1. CONFIGURATION ---
# Create the temp folder if it doesn't exist
os.makedirs("public/temp", exist_ok=True)

# store for analysis requests
analysis_request = {}

# Enable CORS (So your Frontend/Mobile can talk to this)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def run_model_inference(request_id: str, file_path: str, media_type: str):
    try:
        analysis_request[request_id]["progress"] = 25
        result_payload = model_service.predict_media_file(file_path, media_type)
        analysis_request[request_id]["progress"] = 100
        analysis_request[request_id]["status"] = result_payload["status"]
        analysis_request[request_id]["result"] = result_payload["result"]
        analysis_request[request_id]["model_name"] = result_payload.get("model_name")
        analysis_request[request_id]["details"] = result_payload.get("details")
    except Exception as exc:
        analysis_request[request_id]["status"] = "failed"
        analysis_request[request_id]["error"] = str(exc)
        analysis_request[request_id]["progress"] = 100


# --- 2. ROUTES ---

@app.get("/")
def home():
    return {"status": "online", "message": "Simple Backend is Ready"}


@app.post("/scan-video")
async def scan_video(file: UploadFile = File(...), media_type: str = "video"):
    print(f"📥 Receiving file: {file.filename}")

    request_id = str(uuid.uuid4())
    file_ext = file.filename.split(".")[-1] if "." in file.filename else "bin"
    new_filename = f"{uuid.uuid4()}.{file_ext}"
    save_path = f"public/temp/{new_filename}"

    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print(f"✅ File saved successfully at: {save_path}")

    analysis_request[request_id] = {
        "status": "processing",
        "filename": file.filename,
        "saved_path": save_path,
        "progress": 0,
        "result": None,
        "error": None,
        "media_type": media_type,
    }

    inference_thread = threading.Thread(
        target=run_model_inference,
        args=(request_id, save_path, media_type),
        daemon=True,
    )
    inference_thread.start()

    return {
        "status": "success",
        "request_id": request_id,
        "message": "Analysis started. Check status with request",
        "original_name": file.filename,
        "saved_path": save_path,
    }


@app.get("/analysis-status/{request_id}")
async def check_analysis_status(request_id: str):
    """
    Poll this endpoint to check if analysis is complete
    """
    if request_id not in analysis_request:
        raise HTTPException(status_code=404, detail="Request not found")

    request_data = analysis_request[request_id]
    response = {
        "request_id": request_id,
        "status": request_data["status"],
        "progress": request_data["progress"],
        "result": request_data["result"],
    }

    if request_data.get("error") is not None:
        response["error"] = request_data["error"]

    return response


@app.delete("/analysis/{request_id}")
async def clear_analysis(request_id: str):
    """Clear analysis data."""
    if request_id in analysis_request:
        del analysis_request[request_id]

    return {"status": "cleared"}


# --- 3. RUNNER ---
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(Config.PORT or 8000))
