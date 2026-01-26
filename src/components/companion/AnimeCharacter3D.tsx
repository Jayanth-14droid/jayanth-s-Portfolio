import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { CharacterProps } from './types';

function AnimeCharacter3D({ 
  idleState, 
  isScrolling, 
  facingRight, 
  cursorPosition,
  interactionState,
  isPointing 
}: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const watchRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.08;
      
      // Face direction based on cursor or scroll
      let targetRotation = facingRight ? 0.2 : -0.2;
      
      if (interactionState === 'hover' && cursorPosition) {
        // Look toward cursor
        const centerX = window.innerWidth - 60;
        const offsetX = (cursorPosition.x - centerX) / 300;
        targetRotation = THREE.MathUtils.clamp(offsetX, -0.5, 0.5);
      }
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.08
      );
    }

    if (headRef.current) {
      // Head bob when scrolling
      if (isScrolling) {
        headRef.current.rotation.x = Math.sin(time * 10) * 0.08;
      } else {
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, 0.1);
      }
      
      // Looking around or following cursor
      if (idleState === 'looking-around') {
        headRef.current.rotation.y = Math.sin(time * 2) * 0.25;
      } else if (interactionState === 'hover' && cursorPosition) {
        const centerY = window.innerHeight / 2;
        const offsetY = (cursorPosition.y - centerY) / 500;
        headRef.current.rotation.x = THREE.MathUtils.lerp(
          headRef.current.rotation.x,
          THREE.MathUtils.clamp(offsetY, -0.2, 0.2),
          0.1
        );
      } else {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0, 0.1);
      }

      // Slight head tilt for friendly expression
      if (interactionState === 'hover') {
        headRef.current.rotation.z = THREE.MathUtils.lerp(
          headRef.current.rotation.z,
          Math.sin(time * 2) * 0.05 + 0.08,
          0.1
        );
      } else {
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.1);
      }
    }

    // Arm animations
    if (leftArmRef.current) {
      if (idleState === 'waving' || (interactionState === 'hover' && !isPointing)) {
        leftArmRef.current.rotation.z = Math.sin(time * 8) * 0.4 + 1.3;
        leftArmRef.current.rotation.x = -0.3;
      } else if (idleState === 'checking-time' || interactionState === 'scroll-stopped') {
        leftArmRef.current.rotation.z = 0.8;
        leftArmRef.current.rotation.x = -0.6;
      } else if (isPointing) {
        leftArmRef.current.rotation.z = 1.2;
        leftArmRef.current.rotation.x = -0.2;
      } else {
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.25, 0.1);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1);
      }
    }

    if (rightArmRef.current) {
      if (isPointing) {
        // Pointing animation
        rightArmRef.current.rotation.z = Math.sin(time * 3) * 0.1 - 1.2;
        rightArmRef.current.rotation.x = -0.3;
      } else if (isScrolling) {
        rightArmRef.current.rotation.z = Math.sin(time * 10) * 0.25 - 0.25;
      } else {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.25, 0.1);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1);
      }
    }

    // Watch glow animation when checking time
    if (watchRef.current) {
      const isCheckingTime = idleState === 'checking-time' || interactionState === 'scroll-stopped';
      const targetScale = isCheckingTime ? 1.2 : 1;
      watchRef.current.scale.setScalar(
        THREE.MathUtils.lerp(watchRef.current.scale.x, targetScale, 0.1)
      );
    }

    // Eye animations - blinking with smile when hovering
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.sin(time * 3) > 0.95;
      const isSmiling = interactionState === 'hover';
      const baseScale = isSmiling ? 0.85 : 1;
      const scale = blink ? 0.1 : baseScale;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, scale, 0.3);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, scale, 0.3);
    }

    // Mouth animation for smiling
    if (mouthRef.current) {
      const isHappy = interactionState === 'hover' || interactionState === 'navigating';
      const targetScale = isHappy ? 1.3 : 1;
      mouthRef.current.scale.x = THREE.MathUtils.lerp(mouthRef.current.scale.x, targetScale, 0.1);
    }
  });

  const primaryColor = '#10b981';
  const skinColor = '#ffd9b3';
  const hairColor = '#2d2d2d';
  const hoodieColor = '#374151';
  const sneakerColor = '#ef4444';

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, 0, 0]} scale={0.85}>
        {/* Body - Hoodie */}
        <mesh position={[0, -0.3, 0]}>
          <capsuleGeometry args={[0.38, 0.55, 16, 32]} />
          <meshStandardMaterial color={hoodieColor} />
        </mesh>
        
        {/* Hoodie front pocket */}
        <mesh position={[0, -0.45, 0.3]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#4b5563" />
        </mesh>

        {/* Hoodie drawstrings */}
        <mesh position={[-0.1, -0.05, 0.35]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
        <mesh position={[0.1, -0.05, 0.35]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.55, 0]}>
          {/* Main head */}
          <mesh>
            <sphereGeometry args={[0.42, 32, 32]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>

          {/* Hair - modern anime style */}
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.44, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          
          {/* Hair bangs */}
          {[-0.15, 0, 0.15].map((x, i) => (
            <mesh key={i} position={[x, 0.25, 0.28]} rotation={[0.4, 0, x * 0.5]}>
              <coneGeometry args={[0.06, 0.2, 8]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          ))}
          
          {/* Side hair spikes */}
          {[0.5, 0.9, -0.5, -0.9].map((angle, i) => (
            <mesh 
              key={i} 
              position={[Math.sin(angle) * 0.32, 0.3, Math.cos(angle) * 0.15]} 
              rotation={[0, 0, angle * 0.25]}
            >
              <coneGeometry args={[0.07, 0.22, 8]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          ))}

          {/* Headphones Band */}
          <mesh position={[0, 0.38, 0]}>
            <torusGeometry args={[0.44, 0.035, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Headphones Left Ear Cup */}
          <group position={[-0.48, 0.08, 0]}>
            <mesh>
              <cylinderGeometry args={[0.13, 0.15, 0.09, 32]} />
              <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.11, 0.11, 0.025, 32]} />
              <meshStandardMaterial color="#374151" />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.12, 0.018, 16, 32]} />
              <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.4} />
            </mesh>
          </group>

          {/* Headphones Right Ear Cup */}
          <group position={[0.48, 0.08, 0]}>
            <mesh>
              <cylinderGeometry args={[0.13, 0.15, 0.09, 32]} />
              <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh position={[-0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.11, 0.11, 0.025, 32]} />
              <meshStandardMaterial color="#374151" />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.12, 0.018, 16, 32]} />
              <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.4} />
            </mesh>
          </group>

          {/* Eyes - Anime style */}
          <mesh ref={leftEyeRef} position={[-0.13, 0.02, 0.36]}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[-0.13, 0.02, 0.42]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          <mesh position={[-0.11, 0.05, 0.44]}>
            <sphereGeometry args={[0.022, 16, 16]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.6} />
          </mesh>

          <mesh ref={rightEyeRef} position={[0.13, 0.02, 0.36]}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[0.13, 0.02, 0.42]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          <mesh position={[0.15, 0.05, 0.44]}>
            <sphereGeometry args={[0.022, 16, 16]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.6} />
          </mesh>

          {/* Blush */}
          <mesh position={[-0.24, -0.06, 0.32]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial color="#ffb3b3" transparent opacity={0.5} />
          </mesh>
          <mesh position={[0.24, -0.06, 0.32]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial color="#ffb3b3" transparent opacity={0.5} />
          </mesh>

          {/* Mouth - smile */}
          <mesh ref={mouthRef} position={[0, -0.14, 0.36]}>
            <torusGeometry args={[0.065, 0.022, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#d97066" />
          </mesh>
        </group>

        {/* Arms with hoodie sleeves */}
        <group>
          {/* Left arm */}
          <mesh ref={leftArmRef} position={[-0.45, -0.18, 0]} rotation={[0, 0, 0.25]}>
            <capsuleGeometry args={[0.09, 0.38, 8, 16]} />
            <meshStandardMaterial color={hoodieColor} />
          </mesh>
          
          {/* Left hand */}
          <mesh position={[-0.55, -0.55, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
          
          {/* Smartwatch on left wrist */}
          <group ref={watchRef} position={[-0.52, -0.45, 0.08]}>
            <mesh>
              <boxGeometry args={[0.08, 0.1, 0.04]} />
              <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.025]}>
              <boxGeometry args={[0.06, 0.08, 0.01]} />
              <meshStandardMaterial 
                color={primaryColor} 
                emissive={primaryColor} 
                emissiveIntensity={0.5} 
              />
            </mesh>
          </group>
        </group>

        <group>
          {/* Right arm */}
          <mesh ref={rightArmRef} position={[0.45, -0.18, 0]} rotation={[0, 0, -0.25]}>
            <capsuleGeometry args={[0.09, 0.38, 8, 16]} />
            <meshStandardMaterial color={hoodieColor} />
          </mesh>
          
          {/* Right hand */}
          <mesh position={[0.55, -0.55, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
        </group>

        {/* Legs - Jeans */}
        <mesh position={[-0.15, -0.88, 0]}>
          <capsuleGeometry args={[0.11, 0.32, 8, 16]} />
          <meshStandardMaterial color="#1e3a5f" />
        </mesh>
        <mesh position={[0.15, -0.88, 0]}>
          <capsuleGeometry args={[0.11, 0.32, 8, 16]} />
          <meshStandardMaterial color="#1e3a5f" />
        </mesh>

        {/* Sneakers */}
        <group position={[-0.15, -1.18, 0.06]}>
          <mesh>
            <boxGeometry args={[0.15, 0.1, 0.22]} />
            <meshStandardMaterial color={sneakerColor} />
          </mesh>
          <mesh position={[0, -0.02, 0.05]}>
            <boxGeometry args={[0.15, 0.04, 0.12]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </group>
        <group position={[0.15, -1.18, 0.06]}>
          <mesh>
            <boxGeometry args={[0.15, 0.1, 0.22]} />
            <meshStandardMaterial color={sneakerColor} />
          </mesh>
          <mesh position={[0, -0.02, 0.05]}>
            <boxGeometry args={[0.15, 0.04, 0.12]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export default AnimeCharacter3D;
