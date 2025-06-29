'use client';

import { type ReactNode } from 'react';
import { type Variants, type TargetAndTransition, type VariantLabels } from 'framer-motion';
import { MotionWrapper } from './motion-wrapper';
import { cn } from '@/lib/utils';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  initial?: boolean | TargetAndTransition | VariantLabels;
  animate?: boolean | TargetAndTransition | VariantLabels;
  exit?: TargetAndTransition | VariantLabels;
  transition?: object;
  delay?: number;
}

const defaultVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * A general-purpose animated container with sensible defaults.
 * SSR-compatible and customizable via variants prop.
 */
export function AnimatedContainer({
  children,
  className,
  variants = defaultVariants,
  initial = 'hidden',
  animate = 'visible',
  exit = 'hidden',
  transition,
  delay = 0,
}: AnimatedContainerProps) {
  return (
    <MotionWrapper
      className={cn('', className)}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{
        delay,
        ...transition,
      }}
    >
      {children}
    </MotionWrapper>
  );
}
