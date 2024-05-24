import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { Button, ButtonProps } from '@/components/ui/button';

const btnVariants = {
  default:
    'bg-gradient-to-r from-[#e052a0] to-[#f15c41] hover:from-[#3ec7e0] hover:to-[#526bf4]',
  outline:
    'bg-background bg-gradient-to-r shadow-[0_0_0_3px_rgb(38,66,95)] hover:from-[#3ec7e0] hover:to-[#526bf4] hover:shadow-none',
};

interface BtnVariant {
  variant?: 'default' | 'outline';
}

type BtnProps = Omit<ButtonProps, keyof BtnVariant> & BtnVariant;

export const Btn = forwardRef<HTMLButtonElement, BtnProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <Button
        size={size}
        className={cn(btnVariants[variant ?? 'default'], className)}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

Btn.displayName = 'Btn';
