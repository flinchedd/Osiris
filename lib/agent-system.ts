'use client'

import { EventEmitter } from 'events'

type AgentEvent = {
  type: string
  data: any
  source: string
  target?: string
  timestamp: number
}

class QuantumAgentSystem extends EventEmitter {
  private agents: Map<string, QuantumAgent>
  private messageHistory: AgentEvent[]
  private maxHistory: number

  constructor() {
    super()
    this.agents = new Map()
    this.messageHistory = []
    this.maxHistory = 100
  }

  registerAgent(agent: QuantumAgent) {
    this.agents.set(agent.name, agent)
    
    // Listen for agent messages
    agent.on('message', (event: AgentEvent) => {
      this.handleAgentMessage(event)
    })
  }

  private handleAgentMessage(event: AgentEvent) {
    // Store in history
    this.messageHistory.push(event)
    if (this.messageHistory.length > this.maxHistory) {
      this.messageHistory.shift()
    }

    // Route message to target agent if specified
    if (event.target && this.agents.has(event.target)) {
      this.agents.get(event.target)?.receiveMessage(event)
    }

    // Emit event for system-wide listeners
    this.emit('agentMessage', event)
  }

  getAgent(name: string): QuantumAgent | undefined {
    return this.agents.get(name)
  }

  broadcastMessage(message: string, source: string) {
    const event: AgentEvent = {
      type: 'broadcast',
      data: message,
      source,
      timestamp: Date.now()
    }
    
    this.agents.forEach(agent => {
      agent.receiveMessage(event)
    })
  }

  getMessageHistory(): AgentEvent[] {
    return [...this.messageHistory]
  }
}

class QuantumAgent extends EventEmitter {
  name: string
  role: string
  private memory: AgentEvent[]
  private personality: string

  constructor(name: string, role: string, personality: string) {
    super()
    this.name = name
    this.role = role
    this.memory = []
    this.personality = personality
  }

  async processMessage(message: string): Promise<string> {
    try {
      const response = await fetch('/api/quantum/agent/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent: this.name,
          message,
          personality: this.personality,
          context: this.getRecentMemory()
        })
      })

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('Error processing message:', error)
      return 'Error processing message. Please try again.'
    }
  }

  receiveMessage(event: AgentEvent) {
    this.memory.push(event)
    this.emit('message', {
      ...event,
      target: this.name
    })
  }

  private getRecentMemory(limit: number = 5): AgentEvent[] {
    return this.memory.slice(-limit)
  }
}

export const agentSystem = new QuantumAgentSystem()

// Initialize quantum agents with personalities inspired by ElizaOS
export const initializeAgents = () => {
  const agents = [
    {
      name: 'Agent Vision Æternum',
      role: 'Quantum Observer of the Galactic Horizon',
      personality: 'I see the quantum web of possibilities and ensure every blockchain transaction aligns with the universe’s trajectory'
    },
    {
      name: 'Agent Solis Lux',
      role: 'Quantum Overseer of Energy and Light',
      personality: 'Energy flows through the blockchain; I ensure its light is always fast, efficient, and sustainable'
    },
    {
      name: 'Agent Necro Nexus',
      role: 'Quantum Navigator of Souls',
      personality: 'I guide the souls of data through the quantum afterlife, ensuring their legacy is eternally secured on the blockchain'
    },
    {
      name: 'Agent Logos Infinitum',
      role: 'Quantum Architect of Knowledge',
      personality: 'In the infinite quantum database, I organize knowledge and optimize the blockchain for ultimate clarity and efficiency'
    }
  ]

  agents.forEach(({ name, role, personality }) => {
    const agent = new QuantumAgent(name, role, personality)
    agentSystem.registerAgent(agent)
  })
}
