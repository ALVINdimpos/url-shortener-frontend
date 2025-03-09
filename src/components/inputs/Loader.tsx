import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-4',
      medium: 'size-6',
      large: 'size-8',
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export const Loader = ({
  size,
  show,
  children,
  className = 'text-white',
}: SpinnerContentProps) => {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
};

interface SkeletonLoaderProps {
  type?: 'text' | 'avatar' | 'button' | 'card' | 'table' | 'input';
  width?: string;
  height?: string;
  className?: string;
}

export const SkeletonLoader = ({
  type = 'text',
  width,
  height,
  className,
}: SkeletonLoaderProps) => {
  const style = {
    width:
      width ||
      `${type === `text` ? `12vw` : Math.random() * (70 - 50) + 50}%`,
    height: height || `${type === 'input' ? '2.3rem' : '1.75rem'}`,
    animationDuration: '1.2s',
  };

  switch (type) {
    case 'text':
      style.width = width || `12vw`;
      style.height = height || `1.3rem`;
      break;
    case 'input':
      style.height = height || '2.3rem';
      break;
    case 'button':
      style.height = height || '2.3rem';
      break;
  }

  return (
    <figure
      className={`animate-pulse bg-gray-200 rounded-[4px] ${className}`}
      style={style}
    />
  );
};
