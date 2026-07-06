import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface MagneticConfig {
  strength?: number;
  radius?: number;
}

export const useMagneticEffect = <T extends HTMLElement>(config: MagneticConfig = {}) => {
  const { strength = 0.3, radius = 100 } = config;
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        const pull = (1 - distance / radius) * strength;
        setTransform({
          x: distanceX * pull,
          y: distanceY * pull,
        });
      } else {
        setTransform({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, radius, reduced]);

  const style = reduced
    ? {}
    : {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: transform.x === 0 && transform.y === 0 ? 'transform 0.3s ease-out' : 'transform 0.1s ease-out',
      };

  return { ref, style };
};
