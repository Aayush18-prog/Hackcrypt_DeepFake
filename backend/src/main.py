from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.config import Config
import shutil
import os
import uuid
import uvicorn
import json


app = FastAPI()

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

# --- 2. ROUTES ---

@app.get("/")
def home():
    return {"status": "online", "message": "Simple Backend is Ready"}

@app.post("/scan-video")
async def scan_video(file: UploadFile = File(...)):
    print(f"📥 Receiving file: {file.filename}")
    

    # unique request id
    request_id = str(uuid.uuid4())

    # Generate a unique name (to prevent overwriting)
    file_ext = file.filename.split(".")[-1]
    new_filename = f"{uuid.uuid4()}.{file_ext}"
    save_path = f"public/temp/{new_filename}"
    
    # Save the file to disk
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    print(f"✅ Video saved successfully at: {save_path}")

    analysis_request[request_id] = {
        "status":"processing",
        "filename": file.filename,
        "saved_path": save_path,
        "progress": 0,
        "result": None
    }
    
    # Return success message
    return {
        "status": "success",
        "request_id":request_id,
        "message": "Analysis started. Check status with request",
        "original_name": file.filename,
        "saved_path": save_path
    }
@app.get("/analysis-status/{request_id}")
async def check_analysis_status(request_id: str):
    """
    Poll this endpoint to check if analysis is complete
    """
    if request_id not in analysis_request:
        raise HTTPException(status_code=404,detail="Request not found")

    request_data = analysis_request[request_id]

    return{
        "request_id":request_id,
        "status": request_data["status"],
        "progress": request_data["progress"],
        "result": request_data["result"]
    }

@app.delete("/analysis/{request_id}")
async def clear_analysis(request_id: str):
    """ Clear analysis data """
    if request_id in analysis_request:
        del analysis_request[request_id]

    return {
        "status": "cleared"
    }

# --- 3. RUNNER ---
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

# https://brashiest-florinda-pseudodemocratically.ngrok-free.dev