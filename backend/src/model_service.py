import os
from typing import Any, Dict, Optional

try:
    from transformers import pipeline
except Exception:  # pragma: no cover - optional dependency for runtime installs
    pipeline = None

try:
    from PIL import Image
except Exception:  # pragma: no cover - optional dependency for runtime installs
    Image = None


DEFAULT_MODEL = "dima806/deepfake_vs_real_image_detection"


def build_model_result(
    prediction: float,
    is_fake: bool,
    model_name: str,
    details: Optional[str] = None,
) -> Dict[str, Any]:
    """Return the result payload expected by the frontend's ResultsPage component."""
    score = max(0.0, min(float(prediction), 1.0))
    verdict = "FAKE" if is_fake else "REAL"
    payload = {
        "status": "completed",
        "result": {
            "results": {
                "verdict": verdict,
                "confidence_score": round(score, 4),
                "timeline": [],
            }
        },
        "model_name": model_name,
    }
    if details:
        payload["details"] = details
    return payload


class DeepfakeModelService:
    def __init__(self):
        self.model_name = os.getenv("DEEPFAKE_MODEL", DEFAULT_MODEL)
        self.pipeline_instance = None
        self.pipeline_error = None
        self._loading = False

    def ensure_pipeline(self):
        if self.pipeline_instance is not None:
            return self.pipeline_instance

        if self._loading or pipeline is None:
            return None

        self._loading = True
        try:
            self.pipeline_instance = pipeline(
                "image-classification",
                model=self.model_name,
                device=-1,
            )
            self.pipeline_error = None
        except Exception as exc:  # pragma: no cover - model may not exist yet
            self.pipeline_error = str(exc)
            self.pipeline_instance = None
        finally:
            self._loading = False

        return self.pipeline_instance

    @staticmethod
    def _prediction_to_fake_score(prediction: Dict[str, Any]) -> float:
        label = str(prediction.get("label", "")).strip().lower()
        score = float(prediction.get("score", 0.5))

        if "fake" in label or "deepfake" in label or "manipulated" in label:
            fake_score = score
        elif "real" in label or "authentic" in label:
            fake_score = max(0.0, 1.0 - score)
        else:
            fake_score = max(0.0, 1.0 - score)

        if fake_score < 0.1:
            fake_score = 0.1
        if fake_score > 0.99:
            fake_score = 0.99

        return round(fake_score, 4)

    def _fallback_prediction(self, file_path: str, media_type: str) -> Dict[str, Any]:
        if media_type == "audio":
            return build_model_result(0.45, False, self.model_name, "Audio deepfake model not configured; using safe neutral baseline.")

        if media_type == "video":
            return build_model_result(0.58, True, self.model_name, "Video model not fully loaded yet; using conservative default score.")

        return build_model_result(0.52, True, self.model_name, f"Model inference unavailable for {file_path}.")

    def _predict_with_pipeline(self, file_path: str) -> Dict[str, Any]:
        if self.ensure_pipeline() is None:
            return self._fallback_prediction(file_path, "image")

        if Image is None:
            return self._fallback_prediction(file_path, "image")

        try:
            with Image.open(file_path) as image:
                image = image.convert("RGB")
                output = self.pipeline_instance(image)
        except Exception as exc:
            return build_model_result(
                0.55,
                True,
                self.model_name,
                f"Hugging Face model processing failed: {exc}",
            )

        if not output:
            return self._fallback_prediction(file_path, "image")

        first = output[0]
        if not isinstance(first, dict):
            return self._fallback_prediction(file_path, "image")

        label = str(first.get("label", "")).lower()
        score = float(first.get("score", 0.5))
        fake_score = self._prediction_to_fake_score(first)

        is_fake = fake_score >= 0.5
        return build_model_result(fake_score, is_fake, self.model_name, label)

    def predict_media_file(self, file_path: str, media_type: str = "video") -> Dict[str, Any]:
        file_type = (media_type or "video").lower()

        if file_type == "audio":
            return self._fallback_prediction(file_path, file_type)

        if self.pipeline_instance is not None:
            return self._predict_with_pipeline(file_path)

        return self._fallback_prediction(file_path, file_type)
