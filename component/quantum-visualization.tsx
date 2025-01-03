'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function QuantumFluxVisualization() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 300
  const connectionDistance = 2.0
  const lineOpacity = 0.1

  // Create particles with wave-based initial velocities for more dynamic motion
  const { particles, velocities } = useMemo(() => {
    const tempParticles = new Float32Array(particleCount * 3)
    const tempVelocities = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      tempParticles[i] = (Math.random() - 0.5) * 15
      tempParticles[i + 1] = (Math.random() - 0.5) * 15
      tempParticles[i + 2] = (Math.random() - 0.5) * 15

      tempVelocities[i] = (Math.random() - 0.5) * 0.01
      tempVelocities[i + 1] = (Math.random() - 0.5) * 0.01
      tempVelocities[i + 2] = (Math.random() - 0.5) * 0.01
    }

    return { particles: tempParticles, velocities: tempVelocities }
  }, [])

  // Create cosmic and dynamic colors
  const colors = useMemo(() => {
    const temp = new Float32Array(particleCount * 3)
    const particleColors = [
      [0.5, 0.3, 1],    // Cosmic Purple
      [0, 1, 1],        // Teal
      [1, 0.8, 0],      // Neon Orange
      [0.8, 0.2, 0.5],  // Fuchsia Pink
      [0.2, 0.9, 0.2]   // Neon Green
    ]

    for (let i = 0; i < particleCount * 3; i += 3) {
      const colorSet = particleColors[Math.floor(Math.random() * particleColors.length)]
      temp[i] = colorSet[0]
      temp[i + 1] = colorSet[1]
      temp[i + 2] = colorSet[2]
    }
    return temp
  }, [])

  // Create a more dynamic line material with a glowing effect
  const linesMaterial = useMemo(() => 
    new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true,
      opacity: lineOpacity,
      blending: THREE.AdditiveBlending,
      linewidth: 2
    }), 
  [])

  const linesGeometry = useMemo(() => new THREE.BufferGeometry(), [])
  const lines = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    if (!particlesRef.current || !lines.current) return
    
    const time = state.clock.getElapsedTime()
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    
    // Update particle positions with velocities and add cosmic wave-like motion
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Apply velocity
      positions[i] += velocities[i]
      positions[i + 1] += velocities[i + 1]
      positions[i + 2] += velocities[i + 2]
      
      // Add cosmic wave motion to particles' movements
      positions[i + 1] += Math.sin(time * 2 + positions[i]) * 0.004
      positions[i] += Math.cos(time * 1.5 + positions[i + 1]) * 0.004
      positions[i + 2] += Math.sin(time * 0.5 + positions[i]) * 0.003

      // Boundary checking with bouncy effect
      for (let j = 0; j < 3; j++) {
        if (Math.abs(positions[i + j]) > 7) {
          velocities[i + j] *= -1
        }
      }
    }
    
    // Create connections with a cosmic "network" feel
    const linePositions: number[] = []

    for (let i = 0; i < particleCount; i++) {
      const x1 = positions[i * 3]
      const y1 = positions[i * 3 + 1]
      const z1 = positions[i * 3 + 2]
      
      for (let j = i + 1; j < particleCount; j++) {
        const x2 = positions[j * 3]
        const y2 = positions[j * 3 + 1]
        const z2 = positions[j * 3 + 2]
        
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) +
          Math.pow(y2 - y1, 2) +
          Math.pow(z2 - z1, 2)
        )
        
        if (distance < connectionDistance) {
          linePositions.push(x1, y1, z1)
          linePositions.push(x2, y2, z2)
        }
      }
    }
    
    linesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    )
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={lines} geometry={linesGeometry} material={linesMaterial} />
    </>
  )
}
