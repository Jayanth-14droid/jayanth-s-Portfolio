import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { ReactNode } from 'react';

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  magneticStrength?: number;
  magneticRadius?: number;
}

const MagneticLink = ({
  href,
  children,
  className = '',
  target,
  rel,
  magneticStrength = 0.2,
  magneticRadius = 60,
}: MagneticLinkProps) => {
  const { ref, style } = useMagneticEffect<HTMLAnchorElement>({
    strength: magneticStrength,
    radius: magneticRadius,
  });

  return (
    <a
      ref={ref}
      href={href}
      className={`inline-block ${className}`}
      style={style}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
};

export default MagneticLink;
