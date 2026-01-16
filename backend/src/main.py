from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from src.config import Config
import shutil
import os
import uuid
import uvicorn

app = FastAPI()

# --- 1. CONFIGURATION ---
# Create the temp folder if it doesn't exist
os.makedirs("public/temp", exist_ok=True)

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
    
    # Generate a unique name (to prevent overwriting)
    file_ext = file.filename.split(".")[-1]
    new_filename = f"{uuid.uuid4()}.{file_ext}"
    save_path = f"public/temp/{new_filename}"
    
    # Save the file to disk
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    print(f"✅ Video saved successfully at: {save_path}")
    
    # Return success message
    return {
        "status": "success",
        "message": "Video received and saved.",
        "original_name": file.filename,
        "saved_path": save_path
    }

# --- 3. RUNNER ---
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)