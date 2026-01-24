import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

type IdleState = 'waiting' | 'checking-time' | 'looking-around' | 'waving';

interface AnimeCharacterProps {
  idleState: IdleState;
  isScrolling: boolean;
  facingRight: boolean;
}

function AnimeCharacter({ idleState, isScrolling, facingRight }: AnimeCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  
  // Headphones refs
  const headphoneLeftRef = useRef<THREE.Group>(null);
  const headphoneBandRef = useRef<THREE.Mesh>(null);
  const headphoneRightRef = useRef<THREE.Group>(null);

  // Animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(time * 2) * 0.05;
      // Face direction
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        facingRight ? 0.3 : -0.3,
        0.1
      );
    }

    if (headRef.current) {
      // Head bob when scrolling
      if (isScrolling) {
        headRef.current.rotation.x = Math.sin(time * 10) * 0.1;
      } else {
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, 0.1);
      }
      
      // Looking around animation
      if (idleState === 'looking-around') {
        headRef.current.rotation.y = Math.sin(time * 2) * 0.3;
      } else {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0, 0.1);
      }
    }

    // Arm animations
    if (leftArmRef.current) {
      if (idleState === 'waving') {
        leftArmRef.current.rotation.z = Math.sin(time * 8) * 0.5 + 1.5;
      } else if (idleState === 'checking-time') {
        leftArmRef.current.rotation.z = 0.8;
        leftArmRef.current.rotation.x = -0.5;
      } else {
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.3, 0.1);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1);
      }
    }

    if (rightArmRef.current) {
      if (isScrolling) {
        rightArmRef.current.rotation.z = Math.sin(time * 10) * 0.3 - 0.3;
      } else {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.3, 0.1);
      }
    }

    // Eye animations - blinking
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.sin(time * 3) > 0.95;
      const scale = blink ? 0.1 : 1;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, scale, 0.3);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, scale, 0.3);
    }
  });

  const primaryColor = '#10b981'; // Primary green color
  const skinColor = '#ffd9b3';
  const hairColor = '#2d2d2d';

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, 0]} scale={0.8}>
        {/* Body */}
        <mesh position={[0, -0.3, 0]}>
          <capsuleGeometry args={[0.35, 0.5, 16, 32]} />
          <meshStandardMaterial color={primaryColor} />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.5, 0]}>
          {/* Main head sphere */}
          <mesh>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>

          {/* Hair - anime style spiky */}
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          
          {/* Hair spikes */}
          {[0, 0.4, 0.8, -0.4, -0.8].map((angle, i) => (
            <mesh key={i} position={[Math.sin(angle) * 0.3, 0.35, Math.cos(angle) * 0.1]} rotation={[0, 0, angle * 0.3]}>
              <coneGeometry args={[0.08, 0.25, 8]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          ))}

          {/* Headphones - Band */}
          <mesh ref={headphoneBandRef} position={[0, 0.35, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.42, 0.03, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Headphones - Left Ear Cup */}
          <group ref={headphoneLeftRef} position={[-0.45, 0.05, 0]}>
            <mesh>
              <cylinderGeometry args={[0.12, 0.14, 0.08, 32]} />
              <meshStandardMaterial color="#222" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Padding */}
            <mesh position={[0.03, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.02, 32]} />
              <meshStandardMaterial color="#444" />
            </mesh>
            {/* Accent ring */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.11, 0.015, 16, 32]} />
              <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.3} />
            </mesh>
          </group>

          {/* Headphones - Right Ear Cup */}
          <group ref={headphoneRightRef} position={[0.45, 0.05, 0]}>
            <mesh>
              <cylinderGeometry args={[0.12, 0.14, 0.08, 32]} />
              <meshStandardMaterial color="#222" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Padding */}
            <mesh position={[-0.03, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.02, 32]} />
              <meshStandardMaterial color="#444" />
            </mesh>
            {/* Accent ring */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.11, 0.015, 16, 32]} />
              <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.3} />
            </mesh>
          </group>

          {/* Eyes - Anime style large */}
          <mesh ref={leftEyeRef} position={[-0.12, 0, 0.35]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[-0.12, 0, 0.4]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          {/* Eye shine */}
          <mesh position={[-0.1, 0.03, 0.42]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
          </mesh>

          <mesh ref={rightEyeRef} position={[0.12, 0, 0.35]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[0.12, 0, 0.4]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          {/* Eye shine */}
          <mesh position={[0.14, 0.03, 0.42]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
          </mesh>

          {/* Blush */}
          <mesh position={[-0.22, -0.08, 0.3]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#ffb3b3" transparent opacity={0.6} />
          </mesh>
          <mesh position={[0.22, -0.08, 0.3]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#ffb3b3" transparent opacity={0.6} />
          </mesh>

          {/* Mouth */}
          <mesh ref={mouthRef} position={[0, -0.15, 0.35]}>
            <torusGeometry args={[0.06, 0.02, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#cc6666" />
          </mesh>
        </group>

        {/* Arms */}
        <mesh ref={leftArmRef} position={[-0.4, -0.2, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.08, 0.35, 8, 16]} />
          <meshStandardMaterial color={primaryColor} />
        </mesh>
        <mesh ref={rightArmRef} position={[0.4, -0.2, 0]} rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.08, 0.35, 8, 16]} />
          <meshStandardMaterial color={primaryColor} />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.15, -0.85, 0]}>
          <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
          <meshStandardMaterial color={primaryColor} />
        </mesh>
        <mesh position={[0.15, -0.85, 0]}>
          <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
          <meshStandardMaterial color={primaryColor} />
        </mesh>

        {/* Feet */}
        <mesh position={[-0.15, -1.15, 0.05]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[0.15, -1.15, 0.05]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
    </Float>
  );
}

const AnimeCompanion3D = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [idleState, setIdleState] = useState<IdleState>('waiting');
  const [facingRight, setFacingRight] = useState(true);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const idleInterval = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setFacingRight(currentScrollY > lastScrollY.current);
      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
      setIsScrolling(true);
      setIdleState('waiting');

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Idle animations cycle
  useEffect(() => {
    if (!isScrolling) {
      const cycleIdleState = () => {
        const states: IdleState[] = ['waiting', 'checking-time', 'looking-around', 'waving'];
        const randomState = states[Math.floor(Math.random() * states.length)];
        setIdleState(randomState);
      };

      idleInterval.current = setInterval(cycleIdleState, 2500);
      return () => {
        if (idleInterval.current) clearInterval(idleInterval.current);
      };
    }
  }, [isScrolling]);

  // Calculate vertical position based on scroll
  const maxScroll = typeof document !== 'undefined' 
    ? document.documentElement.scrollHeight - window.innerHeight 
    : 1;
  const scrollProgress = Math.min(scrollY / (maxScroll || 1), 1);
  const verticalPosition = 120 + scrollProgress * (window.innerHeight - 240);

  return (
    <div
      className="fixed right-4 z-50 pointer-events-none transition-all duration-300 ease-out md:right-8"
      style={{
        top: `${verticalPosition}px`,
        width: '120px',
        height: '160px',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#10b981" />
        
        <AnimeCharacter 
          idleState={idleState} 
          isScrolling={isScrolling} 
          facingRight={facingRight} 
        />
      </Canvas>

      {/* Speech bubble for idle states */}
      {!isScrolling && idleState !== 'waiting' && (
        <div 
          className="absolute -top-2 -left-16 bg-card border border-border rounded-lg px-3 py-1.5 text-xs whitespace-nowrap shadow-lg animate-fade-in"
        >
          {idleState === 'checking-time' && '🕐 Hmm...'}
          {idleState === 'looking-around' && '👀 ...'}
          {idleState === 'waving' && '👋 Hi!'}
          <div className="absolute bottom-1 right-[-6px] w-3 h-3 bg-card border-r border-b border-border rotate-[-45deg]" />
        </div>
      )}

      {/* Scroll indicator when moving */}
      {isScrolling && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
          <div className="w-1.5 h-4 bg-primary/50 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default AnimeCompanion3D;
