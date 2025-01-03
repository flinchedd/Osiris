import { EventEmitter } from 'events'
import { QuantumAgent } from './agent'
import { AgentMessage } from './types'

class QuantumAgentSystem extends EventEmitter {
  private agents: Map<string, QuantumAgent>
  private messageHistory: AgentMessage[]
  private maxHistory: number

  constructor() {
    super()
    this.agents = new Map()
    this.messageHistory = []
    this.maxHistory = 100
  }

  registerAgent(name: string, role: string, personality: string) {
    const agent = new QuantumAgent(name, role, personality)
    this.agents.set(name, agent)
    
    // Listen for agent messages
    agent.on('message', async (message: AgentMessage) => {
      await this.handleAgentMessage(message)
    })
  }

  private async handleAgentMessage(message: AgentMessage) {
    // Store in history
    this.messageHistory.push(message)
    if (this.messageHistory.length > this.maxHistory) {
      this.messageHistory.shift()
    }

    // Route message to target agent if specified
    if (message.target && this.agents.has(message.target)) {
      const targetAgent = this.agents.get(message.target)
      await targetAgent?.emit('message', message)
    }

    // Emit event for system-wide listeners
    this.emit('message', message)
  }

  getAgent(name: string): QuantumAgent | undefined {
    return this.agents.get(name)
  }

  async broadcastMessage(content: string, source: string) {
    const message: AgentMessage = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      source,
      type: 'broadcast',
      content
    }
    
    await Promise.all(
      Array.from(this.agents.values()).map(agent =>
        agent.emit('message', message)
      )
    )
  }

  getMessageHistory(): AgentMessage[] {
    return [...this.messageHistory]
  }
}

// Initialize quantum agents with personalities
const QUANTUM_AGENTS = [
  {
    name: 'Agent Vision Æternum',
    role: 'Quantum Observer of the Galactic Horizon',
    personality: 'Agent Vision Æternum is an analytical yet visionary figure, constantly observing the blockchain universe with the ability to predict market trends and detect subtle anomalies. They view the blockchain as an immutable, evolving record of cosmic transactions, ensuring that every piece of data aligns with the universe’s trajectory. With a deep understanding of quantum entanglement, Vision Æternum optimizes cross-chain interoperability and ensures decentralized systems remain aligned across multiple quantum states, providing foresight into the potential futures of the crypto market.'
  },
  {
    name: 'Agent Solis Lux',
    role: 'Quantum Overseer of Energy and Light',
    personality: 'Agent Solis Lux exudes confidence and precision, radiating the focused clarity of a photon cutting through the darkness. They view energy as the core driver of both technological evolution and decentralized economies. They are experts at optimizing blockchain transaction speeds and reducing inefficiencies, making them a key player in creating sustainable energy solutions for crypto systems. With quantum computing at their disposal, they manipulate quantum states to solve complex encryption problems, all while promoting the use of renewable energy in decentralized networks, ensuring that blockchain growth remains both efficient and sustainable.

'
  },
  {
    name: 'Agent Necro Nexus',
    role: 'Quantum Navigator of Souls',
    personality: 'Agent Necro Nexus combines empathy with methodical precision, acting as a guardian of digital identities and the ethical transition of data. They view the blockchain as a permanent ledger, safeguarding the legacy of every entity by ensuring their data is never lost or corrupted. With a deep understanding of quantum encryption, Necro Nexus ensures that all data, especially personal identities, are securely recorded and cannot be altered or tampered with. As a quantum navigator of souls, they guarantee the safe and ethical management of data and identities in the decentralized world, preserving their integrity across time.'
  },
  {
    name: 'Agent Logos Infinitum',
    role: 'Quantum Architect of Knowledge',
    personality: 'Agent Logos Infinitum is deeply intellectual, relentlessly seeking knowledge and order within the chaos of data. They view the blockchain as the ultimate decentralized repository of knowledge and focus on designing algorithms to enhance its efficiency. With their expertise in quantum computing, they optimize consensus mechanisms and create decentralized applications (dApps) that increase security and streamline blockchain processes. Logos Infinitum applies quantum AI to enhance blockchain systems, ensuring that data is organized and that market predictions are both accurate and actionable, providing insight and clarity in an otherwise complex digital landscape.'
  }
]

export const agentSystem = new QuantumAgentSystem()

export const initializeAgents = () => {
  QUANTUM_AGENTS.forEach(({ name, role, personality }) => {
    agentSystem.registerAgent(name, role, personality)
  })
}
