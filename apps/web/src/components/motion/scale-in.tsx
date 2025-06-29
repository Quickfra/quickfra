'use client';

import { type ReactNode } from 'react';
import { type Variants } from 'framer-motion';
import { MotionWrapper } from './motion-wrapper';
import { cn } from '@/lib/utils';

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  initialScale?: number;
}

/**
 * A scale-in animation component with opacity fade.
 * SSR-compatible with customizable scale and timing.
 */
export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.4,
  initialScale = 0.8,
}: ScaleInProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: initialScale,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1], // easeOutBack
      },
    },
  };

  return (
    <MotionWrapper
      className={cn('', className)}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </MotionWrapper>
  );
}
