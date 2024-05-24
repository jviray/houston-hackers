import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { Button, ButtonProps } from '@/components/ui/button';

export const Btn = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn(
          'bg-gradient-to-r from-[#e052a0] to-[#f15c41] hover:from-[#3ec7e0] hover:to-[#526bf4]',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

Btn.displayName = 'Btn';
