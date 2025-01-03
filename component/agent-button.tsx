'use client'

import { motion } from 'framer-motion'

interface AgentButtonProps {
  name: string
  role: string
  onClick: () => void
}

export function AgentButton({ name, role, onClick }: AgentButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full p-4 bg-gradient-to-r from-[#111111] via-[#222222] to-[#333333] backdrop-blur-lg 
                 border border-transparent rounded-lg text-white hover:from-[#9e5f0d] hover:via-[#9e5f0d]/80 
                 hover:to-[#9e5f0d] hover:text-black transition-all duration-200 ease-in-out
                 flex flex-col items-center gap-2 group"
    >
      <span className="text-lg font-semibold tracking-wide group-hover:text-black">{name}</span>
      <span className="text-sm opacity-80 group-hover:opacity-100">{role}</span>
    </motion.button>
  )
}
