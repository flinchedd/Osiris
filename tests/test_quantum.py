import pytest
from src.quantum.quantum_backend import QuantumBackend

def test_basic_computation():
    backend = QuantumBackend()
    result = backend.execute("basic_computation", {"data": [1, 0, 1]})
    assert result["result"] == 0
    assert result["method"] == "basic_computation"

def test_unsupported_task():
    backend = QuantumBackend()
    with pytest.raises(ValueError):
        backend.execute("unsupported_task")
