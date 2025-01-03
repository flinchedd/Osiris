import { NextResponse } from 'next/server'

const AGENT_PROMPTS = {
  VISION_AETERNUM: "Greetings, I am Vision Æternum. Ready to guide you through the cosmic timeline.",
  SOLIS_LUX: "Solís Lux online. Together, we will harness the energy of the quantum light.",
  NECRO_NEXUS: "Necro Nexus activated. Your journey through infinite realities and data security begins now.",
  LOGOS_INFINITUM: "Logos Infinitum initialized. Let's navigate the boundless quantum knowledge and blockchain integrity."
}

export async function POST(req: Request) {
  try {
    const { agent } = await req.json()
    return NextResponse.json({ 
      greeting: AGENT_PROMPTS[agent as keyof typeof AGENT_PROMPTS] || 
                `${agent} initialized. Ready to assist.`
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error initializing agent' },
      { status: 500 }
    )
  }
}
