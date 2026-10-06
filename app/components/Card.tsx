'use client';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  noPadding?: boolean;
}

export function Card({
  children,
  className = '',
  elevated = false,
  noPadding = false,
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl
        ${elevated ? 'shadow-lg' : 'shadow-base'}
        ${!noPadding ? 'p-6' : ''}
        transition-shadow duration-250
        ${className}
      `}
    >
      {children}
    </div>
  );
}
