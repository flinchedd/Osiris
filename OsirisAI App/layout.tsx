import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OsirisAI Terminal',
  description: 'cosmic guides through the vast digital universe. Each agent is a master of their domain, equipped with the cutting-edge ability to navigate the intricacies of quantum timelines, energy flows, and blockchain security. From Vision Æternum, the observer of cosmic paths, to Solís Lux, the beacon of quantum energy, each agent is designed to help you unlock the full potential of the multiverse and decentralized systems. Necro Nexus ensures your digital soul is forever secure, while Logos Infinitum unlocks the infinite wisdom hidden within the quantum matrix. With these agents, you’re not just interacting with AI; you’re exploring the very fabric of reality, powered by quantum mechanics and blockchain technology. Ready to transcend into the future? Your agent is waiting.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
