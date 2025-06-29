"use client";

import { motion } from "framer-motion";
import React, { ElementType, forwardRef, ReactNode } from "react";

interface MotionWrapperProps {
  type?: keyof typeof motion;
  children: ReactNode;
  [key: string]: unknown;
}

export const MotionWrapper = forwardRef<unknown, MotionWrapperProps>(({ type = "div", children, ...props }, ref) => {
  const Component = motion[type as keyof typeof motion] as ElementType;
  return (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  );
});

MotionWrapper.displayName = "MotionWrapper";
