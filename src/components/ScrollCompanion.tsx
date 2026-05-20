import { useEffect, useState, useRef } from 'react';

type IdleState = 'waiting' | 'checking-time' | 'looking-around' | 'waving';

const ScrollCompanion = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [idleState, setIdleState] = useState<IdleState>('waiting');
  const [facingRight, setFacingRight] = useState(true);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleInterval = useRef<ReturnType<typeof setInterval> | null>(null);
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
  const verticalPosition = 100 + scrollProgress * (window.innerHeight - 200);

  return (
    <div
      className="fixed right-4 z-50 pointer-events-none transition-all duration-300 ease-out md:right-8"
      style={{
        top: `${verticalPosition}px`,
        transform: `scaleX(${facingRight ? 1 : -1})`,
      }}
    >
      <div className={`relative ${isScrolling ? 'animate-bounce' : ''}`}>
        {/* Character Body */}
        <svg
          width="60"
          height="80"
          viewBox="0 0 60 80"
          className="drop-shadow-lg"
        >
          {/* Body */}
          <ellipse
            cx="30"
            cy="50"
            rx="20"
            ry="25"
            className="fill-primary"
          />
          
          {/* Head */}
          <circle
            cx="30"
            cy="22"
            r="18"
            className="fill-primary"
          />
          
          {/* Eyes */}
          <g className={idleState === 'looking-around' ? 'animate-pulse' : ''}>
            <circle cx="24" cy="20" r="5" className="fill-background" />
            <circle cx="36" cy="20" r="5" className="fill-background" />
            <circle 
              cx={idleState === 'looking-around' ? 25 : 24} 
              cy={idleState === 'checking-time' ? 22 : 20} 
              r="2.5" 
              className="fill-foreground transition-all duration-300" 
            />
            <circle 
              cx={idleState === 'looking-around' ? 37 : 36} 
              cy={idleState === 'checking-time' ? 22 : 20} 
              r="2.5" 
              className="fill-foreground transition-all duration-300" 
            />
          </g>
          
          {/* Mouth */}
          <path
            d={isScrolling || idleState === 'waving' 
              ? "M 24 28 Q 30 34 36 28" 
              : "M 26 28 Q 30 30 34 28"}
            fill="none"
            className="stroke-foreground"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Blush */}
          <circle cx="18" cy="24" r="3" className="fill-primary/30" />
          <circle cx="42" cy="24" r="3" className="fill-primary/30" />
          
          {/* Left Arm */}
          <path
            d={idleState === 'waving' 
              ? "M 12 45 Q 5 35 8 25" 
              : idleState === 'checking-time' 
                ? "M 12 45 Q 8 40 15 35"
                : "M 12 45 Q 5 50 8 58"}
            fill="none"
            className="stroke-primary transition-all duration-500"
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Right Arm */}
          <path
            d={isScrolling 
              ? "M 48 45 Q 55 35 52 25"
              : "M 48 45 Q 55 50 52 58"}
            fill="none"
            className="stroke-primary transition-all duration-300"
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Legs */}
          <path
            d={isScrolling 
              ? "M 22 72 Q 20 78 18 82" 
              : "M 22 72 Q 22 78 22 82"}
            fill="none"
            className="stroke-primary transition-all duration-200"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d={isScrolling 
              ? "M 38 72 Q 40 78 42 82" 
              : "M 38 72 Q 38 78 38 82"}
            fill="none"
            className="stroke-primary transition-all duration-200"
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Watch (visible when checking time) */}
          {idleState === 'checking-time' && (
            <g className="animate-fade-in">
              <rect x="10" y="32" width="8" height="6" rx="1" className="fill-muted stroke-muted-foreground" strokeWidth="0.5" />
              <line x1="14" y1="33" x2="14" y2="36" className="stroke-muted-foreground" strokeWidth="0.5" />
              <line x1="14" y1="35" x2="16" y2="35" className="stroke-muted-foreground" strokeWidth="0.5" />
            </g>
          )}
        </svg>
        
        {/* Speech bubble for idle states */}
        {!isScrolling && (
          <div 
            className={`absolute -top-8 -left-12 bg-card border border-border rounded-lg px-2 py-1 text-xs whitespace-nowrap shadow-md transition-opacity duration-300 ${
              idleState !== 'waiting' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: `scaleX(${facingRight ? 1 : -1})` }}
          >
            {idleState === 'checking-time' && '🕐 Hmm...'}
            {idleState === 'looking-around' && '👀 ...'}
            {idleState === 'waving' && '👋 Hi!'}
          </div>
        )}
        
        {/* Scroll indicator when moving */}
        {isScrolling && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <div className="w-1 h-3 bg-primary/50 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollCompanion;
