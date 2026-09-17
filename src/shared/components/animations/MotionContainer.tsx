'use client';

import { LazyMotion, domAnimation, m, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionContainerProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export const MotionContainer = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: MotionContainerProps) => {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.65,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px', amount: 0.08 }}
        className={className}
        style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};
