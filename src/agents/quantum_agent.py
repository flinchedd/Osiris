from src.quantum.quantum_backend import QuantumBackend

class QuantumAgent:
    def __init__(self, name, capabilities=None):
        self.name = name
        self.backend = QuantumBackend()
        self.capabilities = capabilities if capabilities else ["basic_computation"]

    def run_task(self, task, params=None):
        if task not in self.capabilities:
            raise ValueError(f"Task '{task}' is not supported by this agent.")
        try:
            result = self.backend.execute(task, params)
            print(f"[{self.name}] Task '{task}' executed successfully. Result: {result}")
            return result
        except Exception as e:
            print(f"[{self.name}] Task '{task}' failed. Error: {e}")
            raise

    def describe(self):
        return {
            "name": self.name,
            "capabilities": self.capabilities
        }
