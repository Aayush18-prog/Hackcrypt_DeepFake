# Add this to d:\Shlok\Hackcrypt_DeepFake\backend\src\main.py

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.config import Config
import shutil
import os
import uuid
import uvicorn
import json

app = FastAPI()

# Store for analysis requests (in production, use a database)
analysis_requests = {}

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("public/temp", exist_ok=True)

@app.get("/")
def home():
    return {"status": "online", "message": "Simple Backend is Ready"}

@app.post("/scan-video")
async def scan_video(file: UploadFile = File(...)):
    print(f"📥 Receiving file: {file.filename}")
    
    # Generate a unique request ID
    request_id = str(uuid.uuid4())
    
    # Generate a unique filename
    file_ext = file.filename.split(".")[-1]
    new_filename = f"{request_id}.{file_ext}"
    save_path = f"public/temp/{new_filename}"
    
    # Save the file
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    print(f"✅ Video saved successfully at: {save_path}")
    
    # Store request status
    analysis_requests[request_id] = {
        "status": "processing",
        "filename": file.filename,
        "saved_path": save_path,
        "progress": 0,
        "result": None
    }
    
    # TODO: Here you would trigger your AI model analysis in background
    # For now, we'll simulate it with asyncio task
    
    return {
        "status": "success",
        "request_id": request_id,
        "message": "Analysis started. Check status with request_id."
    }

@app.get("/analysis-status/{request_id}")
async def check_analysis_status(request_id: str):
    """Poll this endpoint to check if analysis is complete"""
    
    if request_id not in analysis_requests:
        raise HTTPException(status_code=404, detail="Request not found")
    
    request_data = analysis_requests[request_id]
    
    return {
        "request_id": request_id,
        "status": request_data["status"],  # 'processing' or 'completed' or 'failed'
        "progress": request_data["progress"],
        "result": request_data["result"]
    }

@app.delete("/analysis/{request_id}")
async def clear_analysis(request_id: str):
    """Clear analysis data"""
    if request_id in analysis_requests:
        del analysis_requests[request_id]
    return {"status": "cleared"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)