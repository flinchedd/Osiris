import argparse
from src.agents.agent_launcher import launch_agent

def cli_main():
    parser = argparse.ArgumentParser(description="Osiris AI CLI Tool")
    parser.add_argument("--task", type=str, required=True, help="Specify the task for the quantum agent.")
    parser.add_argument("--params", type=str, help="Provide parameters for the task as a JSON string.")
    args = parser.parse_args()

    task = args.task
    params = eval(args.params) if args.params else {}

    try:
        print(f"Launching Osiris AI Agent with task '{task}'...")
        result = launch_agent(task, params)
        print(f"Task '{task}' completed. Result: {result}")
    except Exception as e:
        print(f"Error executing task '{task}': {e}")
