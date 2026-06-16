import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SpeechBubble from './SpeechBubble';
import { useCompanionLogic } from './useCompanionLogic';
import { useIsMobile } from '@/hooks/use-mobile';
import companionImage from '@/assets/companion-character.png';

const CompanionContainer = () => {
  const isMobile = useIsMobile();
  const [isLowEnd, setIsLowEnd] = useState(false);

  const {
    isScrolling,
    interactionState,
    setInteractionState,
    verticalPosition,
    scrollToSection,
    getSpeechBubbleMessage,
  } = useCompanionLogic();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsLowEnd(prefersReducedMotion);
  }, []);

  const handleClick = () => {
    setInteractionState(interactionState === 'menu-open' ? 'idle' : 'menu-open');
  };

  if (isLowEnd) return null;

  const containerSize = isMobile
    ? { width: '90px', height: '140px' }
    : { width: '130px', height: '200px' };

  const mobilePosition = isMobile ? 80 + (verticalPosition - 120) * 0.6 : verticalPosition;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={`fixed z-40 ${isMobile ? 'right-1' : 'right-4 md:right-6 lg:right-8'}`}
      style={{
        top: `${mobilePosition}px`,
        width: containerSize.width,
        height: containerSize.height,
        pointerEvents: 'auto',
      }}
    >
      <SpeechBubble
        message={getSpeechBubbleMessage()}
        interactionState={interactionState}
        onNavigate={scrollToSection}
        onClose={() => setInteractionState('idle')}
        isMobile={isMobile}
      />

      <motion.div
        onClick={handleClick}
        className="w-full h-full cursor-pointer relative"
        role="button"
        aria-label="Interactive guide - click to open navigation menu"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleClick();
        }}
        whileHover={{ scale: 1.04 }}
      >
        <img
          src={companionImage}
          alt="Portfolio guide"
          loading="lazy"
          width={1024}
          height={1536}
          className="relative w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(139,92,246,0.35)] select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>

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
