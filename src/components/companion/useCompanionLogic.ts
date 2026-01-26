import { useState, useEffect, useRef, useCallback } from 'react';
import { IdleState, InteractionState, SECTIONS } from './types';

interface UseCompanionLogicReturn {
  scrollY: number;
  isScrolling: boolean;
  idleState: IdleState;
  facingRight: boolean;
  cursorPosition: { x: number; y: number } | null;
  interactionState: InteractionState;
  setInteractionState: (state: InteractionState) => void;
  currentSection: string;
  isPointing: boolean;
  verticalPosition: number;
  scrollToSection: (sectionId: string) => void;
  getSpeechBubbleMessage: () => string;
}

export const useCompanionLogic = (): UseCompanionLogicReturn => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [idleState, setIdleState] = useState<IdleState>('waiting');
  const [facingRight, setFacingRight] = useState(true);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [interactionState, setInteractionState] = useState<InteractionState>('idle');
  const [currentSection, setCurrentSection] = useState('home');
  const [isPointing, setIsPointing] = useState(false);

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const idleInterval = useRef<NodeJS.Timeout | null>(null);
  const scrollStopTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  // Detect current section
  useEffect(() => {
    const detectSection = () => {
      const sections = ['home', 'about', 'projects', 'education', 'skills', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    detectSection();
    window.addEventListener('scroll', detectSection, { passive: true });
    return () => window.removeEventListener('scroll', detectSection);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setFacingRight(currentScrollY > lastScrollY.current);
      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
      setIsScrolling(true);
      
      // Reset to idle when scrolling
      if (interactionState !== 'menu-open' && interactionState !== 'navigating') {
        setInteractionState('idle');
        setIdleState('waiting');
      }

      // Clear existing timeouts
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (scrollStopTimeout.current) clearTimeout(scrollStopTimeout.current);

      // Stop scrolling indicator
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Scroll stop detection (2-3 seconds)
      scrollStopTimeout.current = setTimeout(() => {
        if (interactionState === 'idle') {
          setInteractionState('scroll-stopped');
          setIdleState('checking-time');
        }
      }, 2500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (scrollStopTimeout.current) clearTimeout(scrollStopTimeout.current);
    };
  }, [interactionState]);

  // Handle cursor position for hover detection
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const characterArea = {
        right: window.innerWidth,
        left: window.innerWidth - 200,
        top: 100,
        bottom: window.innerHeight - 100,
      };

      const isNearCharacter = 
        e.clientX > characterArea.left - 100 &&
        e.clientX < characterArea.right &&
        e.clientY > characterArea.top - 50 &&
        e.clientY < characterArea.bottom + 50;

      if (isNearCharacter && interactionState === 'idle') {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        setInteractionState('hover');
      } else if (!isNearCharacter && interactionState === 'hover') {
        setCursorPosition(null);
        setInteractionState('idle');
      } else if (isNearCharacter) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactionState]);

  // Idle animations cycle
  useEffect(() => {
    if (!isScrolling && interactionState === 'idle') {
      const cycleIdleState = () => {
        const states: IdleState[] = ['waiting', 'checking-time', 'looking-around', 'waving'];
        const randomState = states[Math.floor(Math.random() * states.length)];
        setIdleState(randomState);
      };

      idleInterval.current = setInterval(cycleIdleState, 3500);
      return () => {
        if (idleInterval.current) clearInterval(idleInterval.current);
      };
    }
  }, [isScrolling, interactionState]);

  // Scroll to section with navigation animation
  const scrollToSection = useCallback((sectionId: string) => {
    setInteractionState('navigating');
    setIdleState('pointing');
    setIsPointing(true);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Reset after scroll completes
      setTimeout(() => {
        setIsPointing(false);
        setInteractionState('idle');
        setIdleState('waiting');
      }, 1500);
    }
  }, []);

  // Get speech bubble message based on state and section
  const getSpeechBubbleMessage = useCallback((): string => {
    switch (interactionState) {
      case 'hover':
        return "Hey 👋 What are you looking for?";
      case 'scroll-stopped':
        if (currentSection === 'home' || currentSection === 'about') {
          return "Want to explore my work? Scroll down 👇";
        } else if (currentSection === 'contact') {
          return "Looks like a good time to connect 😊";
        } else {
          return "Need help finding something?";
        }
      case 'navigating':
        return "Here you go ✨";
      default:
        if (idleState === 'checking-time') return '🕐 Hmm...';
        if (idleState === 'looking-around') return '👀 ...';
        if (idleState === 'waving') return '👋 Hi!';
        return '';
    }
  }, [interactionState, currentSection, idleState]);

  // Calculate vertical position based on scroll
  const maxScroll = typeof document !== 'undefined' 
    ? document.documentElement.scrollHeight - window.innerHeight 
    : 1;
  const scrollProgress = Math.min(scrollY / (maxScroll || 1), 1);
  const verticalPosition = 120 + scrollProgress * (window.innerHeight - 280);

  return {
    scrollY,
    isScrolling,
    idleState,
    facingRight,
    cursorPosition,
    interactionState,
    setInteractionState,
    currentSection,
    isPointing,
    verticalPosition,
    scrollToSection,
    getSpeechBubbleMessage,
  };
};
