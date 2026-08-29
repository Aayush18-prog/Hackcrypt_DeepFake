import os
from dotenv import load_dotenv

# Force load the .env file
load_dotenv()


class Config:
    PORT = os.getenv("PORT", "8000")
    BACKEND = os.getenv("BACKEND_BASE_URL", "http://localhost:8000")
    DEEPFAKE_MODEL = os.getenv(
        "DEEPFAKE_MODEL",
        "dima806/deepfake_vs_real_image_detection",
    )


# --- DEBUGGING CHECK ---


settings = Config()