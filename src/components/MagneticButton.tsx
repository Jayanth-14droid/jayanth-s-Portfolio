import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { Button, ButtonProps } from '@/components/ui/button';
import { forwardRef } from 'react';

interface MagneticButtonProps extends ButtonProps {
  magneticStrength?: number;
  magneticRadius?: number;
}

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ magneticStrength = 0.25, magneticRadius = 80, children, className, ...props }, _ref) => {
    const { ref, style } = useMagneticEffect<HTMLButtonElement>({
      strength: magneticStrength,
      radius: magneticRadius,
    });

    return (
      <Button
        ref={ref}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
