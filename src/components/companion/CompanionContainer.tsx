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

  // Detect low-end devices (only check reduced motion preference)
  useEffect(() => {
    const checkPerformance = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsLowEnd(prefersReducedMotion);
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

  // Don't render on low-end devices with reduced motion preference
  if (isLowEnd) {
    return null;
  }

  // Mobile-specific sizing and positioning
  const containerSize = isMobile 
    ? { width: '100px', height: '130px' } 
    : { width: '140px', height: '180px' };
  
  const mobilePosition = isMobile ? 80 + (verticalPosition - 120) * 0.6 : verticalPosition;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`fixed z-40 ${isMobile ? 'right-1' : 'right-4 md:right-6 lg:right-8'}`}
      style={{
        top: `${mobilePosition}px`,
        width: containerSize.width,
        height: containerSize.height,
        pointerEvents: 'auto',
      }}
    >
      {/* Speech Bubble */}
      <SpeechBubble
        message={getSpeechBubbleMessage()}
        interactionState={interactionState}
        onNavigate={handleNavigate}
        onClose={handleClose}
        isMobile={isMobile}
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
          camera={{ position: [0, 0, isMobile ? 3.8 : 3.2], fov: 45 }}
          style={{ background: 'transparent' }}
          gl={{ 
            alpha: true, 
            antialias: !isMobile,
            powerPreference: isMobile ? 'low-power' : 'high-performance',
          }}
          dpr={isMobile ? [1, 1] : [1, 1.5]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <pointLight position={[-5, 5, 5]} intensity={0.6} color="#10b981" />
            {!isMobile && <pointLight position={[0, -3, 3]} intensity={0.3} color="#6366f1" />}
            
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
      {isScrolling && !isMobile && (
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
