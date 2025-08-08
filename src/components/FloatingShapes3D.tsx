import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingShape({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.2
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.01
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        roughness={0.1}
      />
    </mesh>
  )
}

export function FloatingShapes3D() {
  const shapes = useMemo(() => [
    { position: [-4, 2, -2] as [number, number, number], color: "#10b981", scale: 0.8 },
    { position: [4, -1, -3] as [number, number, number], color: "#34d399", scale: 1.2 },
    { position: [2, 3, -1] as [number, number, number], color: "#6ee7b7", scale: 0.6 },
    { position: [-3, -2, -4] as [number, number, number], color: "#059669", scale: 1.0 },
  ], [])

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          color={shape.color}
          scale={shape.scale}
        />
      ))}
    </Canvas>
  )
}