import os

from src.model_service import DeepfakeModelService, build_model_result


def test_build_model_result_uses_frontend_contract():
    payload = build_model_result(prediction=0.83, is_fake=True, model_name="demo/deepfake-model")

    assert payload["status"] == "completed"
    assert payload["result"]["results"]["verdict"] == "FAKE"
    assert 0.0 <= payload["result"]["results"]["confidence_score"] <= 1.0


def test_service_reads_model_name_from_env():
    os.environ["DEEPFAKE_MODEL"] = "hf-test/deepfake"

    service = DeepfakeModelService()

    assert service.model_name == "hf-test/deepfake"


def test_default_model_uses_hf_deepfake_repo():
    os.environ.pop("DEEPFAKE_MODEL", None)

    service = DeepfakeModelService()

    assert service.model_name == "dima806/deepfake_vs_real_image_detection"


def test_prediction_maps_real_and_fake_labels_to_fake_probability():
    service = DeepfakeModelService()

    assert service._prediction_to_fake_score({"label": "Fake", "score": 0.81}) == 0.81
    assert service._prediction_to_fake_score({"label": "Real", "score": 0.89}) == 0.11


def test_service_does_not_load_model_during_initialization(monkeypatch):
    import src.model_service as model_service_module

    original_pipeline = model_service_module.pipeline

    def fail_if_called(*args, **kwargs):
        raise AssertionError("model should not load during initialization")

    monkeypatch.setattr(model_service_module, "pipeline", fail_if_called)

    service = model_service_module.DeepfakeModelService()

    assert service.pipeline_instance is None
    assert service.pipeline_error is None

    monkeypatch.setattr(model_service_module, "pipeline", original_pipeline)
