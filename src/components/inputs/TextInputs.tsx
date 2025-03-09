import { SkeletonLoader } from './Loader';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  isLoading?: boolean;
}

export const Heading = ({
  children,
  className,
  type,
  isLoading,
}: HeadingProps) => {
  if (isLoading) {
    return <SkeletonLoader height="1.8rem" />;
  }

  switch (type) {
    case 'h1':
      return (
        <h1
          className={`text-xl uppercase font-semibold text-primary ${className}`}
        >
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2
          className={`text-lg uppercase font-semibold text-primary ${className}`}
        >
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3
          className={`text-base uppercase font-semibold text-primary ${className}`}
        >
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4
          className={`text-sm uppercase font-semibold text-primary ${className}`}
        >
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5
          className={`text-xs uppercase font-semibold text-primary ${className}`}
        >
          {children}
        </h5>
      );
    case 'h6':
      return (
        <h6
          className={`text-xs uppercase font-semibold text-primary ${className}`}
        >
          {children}
        </h6>
      );
    default:
      return (
        <h1
          className={`text-xl uppercase font-semibold text-primary ${className}`}
        >
          {children}
        </h1>
      );
  }
};
