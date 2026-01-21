import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { ReactNode } from 'react';

interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

const MagneticWrapper = ({
  children,
  className = '',
  strength = 0.25,
  radius = 80,
}: MagneticWrapperProps) => {
  const { ref, style } = useMagneticEffect<HTMLDivElement>({
    strength,
    radius,
  });

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default MagneticWrapper;
