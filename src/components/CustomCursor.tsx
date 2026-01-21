import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Smooth trailing effect
  useEffect(() => {
    const animateTrail = () => {
      setTrailPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
    };

    const intervalId = setInterval(animateTrail, 16);
    return () => clearInterval(intervalId);
  }, [position]);

  // Detect hoverable elements
  useEffect(() => {
    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea, select, [data-hoverable]')) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full bg-primary transition-all duration-150 ease-out ${
            isHovering ? 'w-2 h-2 opacity-50' : 'w-3 h-3 opacity-100'
          }`}
        />
      </div>

      {/* Trailing cursor ring */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: trailPosition.x,
          top: trailPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border-2 border-primary/60 transition-all duration-300 ease-out ${
            isHovering
              ? 'w-12 h-12 bg-primary/10 border-primary'
              : 'w-8 h-8 bg-transparent'
          }`}
        />
      </div>

      {/* Second trailing element for extra depth */}
      <div
        className="fixed pointer-events-none z-[9997] opacity-30"
        style={{
          left: trailPosition.x + (position.x - trailPosition.x) * -0.3,
          top: trailPosition.y + (position.y - trailPosition.y) * -0.3,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border border-primary/40 transition-all duration-500 ${
            isHovering ? 'w-16 h-16' : 'w-6 h-6'
          }`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
