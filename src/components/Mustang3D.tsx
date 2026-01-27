import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Mustang3DModelProps {
  progress: number;
}

// Wheel component with spinning animation
const Wheel = ({ position, progress }: { position: [number, number, number]; progress: number }) => {
  const wheelRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (wheelRef.current) {
      wheelRef.current.rotation.x += 0.15 + (progress / 100) * 0.1;
    }
  });

  return (
    <group ref={wheelRef} position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* Tire */}
      <mesh>
        <torusGeometry args={[0.35, 0.12, 16, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Rim */}
      <mesh>
        <cylinderGeometry args={[0.28, 0.28, 0.15, 6]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Hub cap */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
        <meshStandardMaterial color="#808080" metalness={1} roughness={0.1} />
      </mesh>
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <mesh key={i} position={[0, 0.075, 0]} rotation={[0, (angle * Math.PI) / 180, 0]}>
          <boxGeometry args={[0.04, 0.01, 0.25]} />
          <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// Headlight with glow
const Headlight = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial color="#FFFDE7" emissive="#FFEB3B" emissiveIntensity={2} />
    </mesh>
    <pointLight color="#FFEB3B" intensity={0.5} distance={3} />
  </group>
);

// Taillight
const Taillight = ({ position }: { position: [number, number, number] }) => (
  <mesh position={position}>
    <boxGeometry args={[0.05, 0.15, 0.25]} />
    <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={1.5} />
  </mesh>
);

// Main Mustang body
const MustangBody = ({ progress }: { progress: number }) => {
  const bodyRef = useRef<THREE.Group>(null);
  
  // Subtle bounce animation
  useFrame((state) => {
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(state.clock.elapsedTime * 8) * 0.01;
      bodyRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 6) * 0.005;
    }
  });

  // Mustang red color
  const bodyColor = useMemo(() => new THREE.Color('#B91C1C'), []);
  const chromeColor = useMemo(() => new THREE.Color('#E8E8E8'), []);

  return (
    <group ref={bodyRef}>
      {/* Main body - lower section */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[3.2, 0.4, 1.2]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Front hood - angled */}
      <mesh position={[-1.2, 0.45, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[1.0, 0.15, 1.15]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Hood scoop */}
      <mesh position={[-0.8, 0.55, 0]}>
        <boxGeometry args={[0.4, 0.08, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0.2, 0.65, 0]}>
        <boxGeometry args={[1.4, 0.5, 1.0]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Windshield */}
      <mesh position={[-0.35, 0.7, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.6, 0.02, 0.9]} />
        <meshStandardMaterial color="#1a3a4a" metalness={0.1} roughness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* Rear window */}
      <mesh position={[0.75, 0.7, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.5, 0.02, 0.85]} />
        <meshStandardMaterial color="#1a3a4a" metalness={0.1} roughness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* Side windows */}
      <mesh position={[0.2, 0.7, 0.51]}>
        <boxGeometry args={[1.0, 0.35, 0.02]} />
        <meshStandardMaterial color="#1a3a4a" metalness={0.1} roughness={0.1} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.2, 0.7, -0.51]}>
        <boxGeometry args={[1.0, 0.35, 0.02]} />
        <meshStandardMaterial color="#1a3a4a" metalness={0.1} roughness={0.1} transparent opacity={0.6} />
      </mesh>

      {/* Rear trunk - fastback style */}
      <mesh position={[1.1, 0.4, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.8, 0.25, 1.1]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Front grille */}
      <mesh position={[-1.62, 0.25, 0]}>
        <boxGeometry args={[0.05, 0.25, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Chrome front bumper */}
      <mesh position={[-1.65, 0.15, 0]}>
        <boxGeometry args={[0.08, 0.1, 1.1]} />
        <meshStandardMaterial color={chromeColor} metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Chrome rear bumper */}
      <mesh position={[1.55, 0.15, 0]}>
        <boxGeometry args={[0.08, 0.1, 1.1]} />
        <meshStandardMaterial color={chromeColor} metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Racing stripes */}
      <mesh position={[0, 0.52, 0.25]}>
        <boxGeometry args={[3.3, 0.01, 0.08]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.52, -0.25]}>
        <boxGeometry args={[3.3, 0.01, 0.08]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.5} />
      </mesh>

      {/* Side chrome trim */}
      <mesh position={[0, 0.25, 0.61]}>
        <boxGeometry args={[2.8, 0.03, 0.02]} />
        <meshStandardMaterial color={chromeColor} metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.25, -0.61]}>
        <boxGeometry args={[2.8, 0.03, 0.02]} />
        <meshStandardMaterial color={chromeColor} metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Side mirrors */}
      <mesh position={[-0.5, 0.65, 0.65]}>
        <boxGeometry args={[0.1, 0.08, 0.06]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.5, 0.65, -0.65]}>
        <boxGeometry args={[0.1, 0.08, 0.06]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Headlights */}
      <Headlight position={[-1.55, 0.35, 0.35]} />
      <Headlight position={[-1.55, 0.35, -0.35]} />

      {/* Taillights */}
      <Taillight position={[1.53, 0.3, 0.35]} />
      <Taillight position={[1.53, 0.3, -0.35]} />
      <Taillight position={[1.53, 0.3, 0]} />

      {/* Wheels */}
      <Wheel position={[-1.0, 0, 0.7]} progress={progress} />
      <Wheel position={[-1.0, 0, -0.7]} progress={progress} />
      <Wheel position={[1.0, 0, 0.7]} progress={progress} />
      <Wheel position={[1.0, 0, -0.7]} progress={progress} />

      {/* Exhaust pipes */}
      <mesh position={[1.6, 0.1, 0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.05, 0.15, 16]} />
        <meshStandardMaterial color="#404040" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[1.6, 0.1, -0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.05, 0.15, 16]} />
        <meshStandardMaterial color="#404040" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
};

// Exhaust smoke particles
const ExhaustSmoke = ({ progress }: { progress: number }) => {
  const smokeRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 20;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = 1.8 + Math.random() * 0.5;
      positions[i * 3 + 1] = 0.1 + Math.random() * 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (smokeRef.current && progress > 0) {
      const positions = smokeRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3] += 0.02;
        positions[i * 3 + 1] += 0.005;
        if (positions[i * 3] > 3) {
          positions[i * 3] = 1.8;
          positions[i * 3 + 1] = 0.1 + Math.random() * 0.2;
        }
      }
      smokeRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={smokeRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#888888"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

// Ground with moving road lines
const Ground = ({ progress }: { progress: number }) => {
  const linesRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (linesRef.current) {
      linesRef.current.position.x -= 0.05 + (progress / 100) * 0.03;
      if (linesRef.current.position.x < -2) {
        linesRef.current.position.x = 0;
      }
    }
  });

  return (
    <group position={[0, -0.45, 0]}>
      {/* Road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>
      {/* Road lines */}
      <group ref={linesRef}>
        {[-3, -1.5, 0, 1.5, 3].map((x, i) => (
          <mesh key={i} position={[x, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.8, 0.08]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Main scene
const MustangScene = ({ progress }: { progress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Move car forward based on progress
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = -2 + (progress / 100) * 2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.5} rotationIntensity={0} floatIntensity={0.1}>
        <MustangBody progress={progress} />
        <ExhaustSmoke progress={progress} />
      </Float>
    </group>
  );
};

const Mustang3D = ({ progress }: Mustang3DModelProps) => {
  return (
    <div className="w-full h-48 md:h-56">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#4FC3F7" />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.5} penumbra={1} />
        
        {/* Scene */}
        <MustangScene progress={progress} />
        <Ground progress={progress} />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Mustang3D;