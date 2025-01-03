import random

class QuantumBackend:
    def __init__(self):
        self.supported_tasks = {
            "basic_computation": self.basic_computation,
            "grover_search": self.grover_search,
            "quantum_fourier_transform": self.quantum_fourier_transform,
        }

    def execute(self, task, params=None):
        if task not in self.supported_tasks:
            raise ValueError(f"Task '{task}' is not supported by QuantumBackend.")
        return self.supported_tasks[task](params)

    def basic_computation(self, params):
        # Simulate a basic quantum computation
        data = params.get("data", [1, 0, 1, 0])
        result = sum(data) % 2
        return {"result": result, "method": "basic_computation"}

    def grover_search(self, params):
        # Simulate Grover's search algorithm
        database = params.get("database", list(range(100)))
        target = params.get("target", random.choice(database))
        iterations = int(len(database)**0.5)
        return {"found": target, "iterations": iterations}

    def quantum_fourier_transform(self, params):
        # Simulate a QFT operation
        data = params.get("data", [1, 0, 1])
        result = [x**2 for x in data]  # Placeholder
        return {"transformed_data": result}
