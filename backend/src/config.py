import os
from dotenv import load_dotenv

# Force load the .env file
load_dotenv()

class Config:
    PORT = os.getenv("PORT")
    BACKEND = os.getenv("BACKEND_BASE_URL", "http://localhost:8000")


# --- DEBUGGING CHECK ---


settings = Config()