import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

// 1969 Ford Mustang SVG Component
const Mustang1969 = ({ progress }: { progress: number }) => (
  <motion.svg
    viewBox="0 0 200 60"
    className="w-32 md:w-48 h-auto"
    initial={{ x: 0 }}
    animate={{ 
      x: `${progress * 0.8}%`,
      rotate: [0, -1, 0, 1, 0],
    }}
    transition={{ 
      x: { duration: 0.3, ease: "easeOut" },
      rotate: { duration: 0.3, repeat: Infinity, ease: "linear" }
    }}
  >
    {/* Car Body */}
    <motion.g>
      {/* Main body */}
      <path
        d="M20 35 L25 25 L45 20 L75 18 L120 18 L155 20 L170 25 L180 35 L180 42 L20 42 Z"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="0.5"
      />
      {/* Hood scoop */}
      <path
        d="M85 18 L90 14 L110 14 L115 18"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--foreground))"
        strokeWidth="0.5"
      />
      {/* Windshield */}
      <path
        d="M70 20 L75 12 L105 12 L115 20"
        fill="hsl(var(--secondary))"
        opacity="0.6"
      />
      {/* Rear window */}
      <path
        d="M125 20 L130 14 L150 16 L155 22"
        fill="hsl(var(--secondary))"
        opacity="0.5"
      />
      {/* Front grille */}
      <rect x="22" y="32" width="8" height="6" fill="hsl(var(--muted))" rx="1" />
      {/* Headlights */}
      <motion.circle
        cx="26"
        cy="30"
        r="3"
        fill="#FFE066"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      {/* Racing stripes */}
      <rect x="45" y="19" width="6" height="23" fill="hsl(var(--foreground))" opacity="0.3" />
      <rect x="55" y="19" width="6" height="23" fill="hsl(var(--foreground))" opacity="0.3" />
      {/* Door line */}
      <line x1="100" y1="20" x2="100" y2="40" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.4" />
      {/* Tail lights */}
      <motion.rect
        x="172"
        y="30"
        width="6"
        height="8"
        fill="#FF4444"
        rx="1"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
      {/* Chrome trim */}
      <line x1="25" y1="35" x2="175" y2="35" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.5" />
      {/* Side mirror */}
      <ellipse cx="68" cy="22" rx="3" ry="2" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth="0.3" />
    </motion.g>
    
    {/* Front Wheel */}
    <g>
      <motion.circle
        cx="50"
        cy="45"
        r="12"
        fill="hsl(var(--foreground))"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 45px" }}
      />
      <circle cx="50" cy="45" r="8" fill="hsl(var(--muted))" />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 45px" }}
      >
        <line x1="50" y1="38" x2="50" y2="52" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="43" y1="45" x2="57" y2="45" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="44" y1="40" x2="56" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="56" y1="40" x2="44" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1" />
      </motion.g>
      <circle cx="50" cy="45" r="3" fill="hsl(var(--foreground))" />
    </g>
    
    {/* Rear Wheel */}
    <g>
      <motion.circle
        cx="150"
        cy="45"
        r="12"
        fill="hsl(var(--foreground))"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "150px 45px" }}
      />
      <circle cx="150" cy="45" r="8" fill="hsl(var(--muted))" />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "150px 45px" }}
      >
        <line x1="150" y1="38" x2="150" y2="52" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="143" y1="45" x2="157" y2="45" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="144" y1="40" x2="156" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="156" y1="40" x2="144" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1" />
      </motion.g>
      <circle cx="150" cy="45" r="3" fill="hsl(var(--foreground))" />
    </g>
    
    {/* Exhaust smoke */}
    <motion.g
      animate={{ opacity: [0.3, 0.6, 0.3], x: [0, -10, -20] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    >
      <circle cx="185" cy="42" r="3" fill="hsl(var(--muted-foreground))" opacity="0.4" />
      <circle cx="192" cy="40" r="4" fill="hsl(var(--muted-foreground))" opacity="0.3" />
      <circle cx="200" cy="38" r="5" fill="hsl(var(--muted-foreground))" opacity="0.2" />
    </motion.g>
  </motion.svg>
);

// Road/Track component
const RaceTrack = () => (
  <div className="absolute bottom-0 left-0 right-0 h-4 bg-muted/30 overflow-hidden">
    <motion.div
      className="absolute inset-0 flex items-center"
      animate={{ x: [0, -100] }}
      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="w-12 h-1 bg-foreground/30 mx-4 rounded-full" />
      ))}
    </motion.div>
  </div>
);

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2500;
    const interval = 25;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment + Math.random() * 0.5;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    if (!isVisible) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-5xl md:text-7xl font-bold text-primary"
            >
              JK
            </motion.div>

            {/* Percentage counter */}
            <motion.div
              className="text-5xl md:text-7xl font-bold tabular-nums"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {Math.floor(progress)}%
            </motion.div>

            {/* Race car track section */}
            <div className="relative w-72 md:w-96 h-20 mt-4">
              {/* Mustang car */}
              <div className="absolute bottom-4 left-0 w-full">
                <Mustang1969 progress={progress} />
              </div>
              {/* Road */}
              <RaceTrack />
            </div>

            {/* Progress bar */}
            <div className="w-64 md:w-80 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-xs tracking-widest uppercase"
            >
              Revving Up Portfolio
            </motion.p>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/30"
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/30"
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
