'use client';

import { type ReactNode } from 'react';
import { type Variants } from 'framer-motion';
import { MotionWrapper } from './motion-wrapper';
import { cn } from '@/lib/utils';

interface SlideInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

/**
 * A slide-in animation component with directional movement.
 * SSR-compatible with customizable direction and distance.
 */
export function SlideIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 50,
}: SlideInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
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
