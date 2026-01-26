import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import AnimeCharacter3D from './AnimeCharacter3D';
import SpeechBubble from './SpeechBubble';
import { useCompanionLogic } from './useCompanionLogic';
import { useIsMobile } from '@/hooks/use-mobile';

const CompanionContainer = () => {
  const isMobile = useIsMobile();
  const [isLowEnd, setIsLowEnd] = useState(false);
  
  const {
    isScrolling,
    idleState,
    facingRight,
    cursorPosition,
    interactionState,
    setInteractionState,
    isPointing,
    verticalPosition,
    scrollToSection,
    getSpeechBubbleMessage,
  } = useCompanionLogic();

  // Detect low-end devices
  useEffect(() => {
    const checkPerformance = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check device memory (if available)
      const deviceMemory = (navigator as any).deviceMemory;
      const isLowMemory = deviceMemory && deviceMemory < 4;
      
      // Check hardware concurrency
      const cores = navigator.hardwareConcurrency;
      const isLowCores = cores && cores < 4;
      
      setIsLowEnd(prefersReducedMotion || isLowMemory || isLowCores);
    };
    
    checkPerformance();
  }, []);

  const handleClick = () => {
    if (interactionState === 'menu-open') {
      setInteractionState('idle');
    } else {
      setInteractionState('menu-open');
    }
  };

  const handleNavigate = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  const handleClose = () => {
    setInteractionState('idle');
  };

  // Don't render on mobile or low-end devices
  if (isMobile || isLowEnd) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed right-4 z-40 md:right-6 lg:right-8"
      style={{
        top: `${verticalPosition}px`,
        width: '140px',
        height: '180px',
        pointerEvents: 'auto',
      }}
    >
      {/* Speech Bubble */}
      <SpeechBubble
        message={getSpeechBubbleMessage()}
        interactionState={interactionState}
        onNavigate={handleNavigate}
        onClose={handleClose}
      />

      {/* 3D Character Canvas */}
      <div
        onClick={handleClick}
        className="w-full h-full cursor-pointer"
        role="button"
        aria-label="Interactive guide character - click to open navigation menu"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 45 }}
          style={{ background: 'transparent' }}
          gl={{ 
            alpha: true, 
            antialias: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <pointLight position={[-5, 5, 5]} intensity={0.6} color="#10b981" />
            <pointLight position={[0, -3, 3]} intensity={0.3} color="#6366f1" />
            
            <AnimeCharacter3D
              idleState={idleState}
              isScrolling={isScrolling}
              facingRight={facingRight}
              cursorPosition={cursorPosition}
              interactionState={interactionState}
              isPointing={isPointing}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll indicator when moving */}
      {isScrolling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2"
        >
          <div className="w-1.5 h-5 bg-primary/40 rounded-full animate-pulse" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default CompanionContainer;
