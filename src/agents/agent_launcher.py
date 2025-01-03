from src.agents.quantum_agent import QuantumAgent

def launch_agent(task, params):
    agent = QuantumAgent("OsirisAgent", capabilities=["basic_computation", "grover_search", "quantum_fourier_transform"])
    return agent.run_task(task, params)
