'use client';

type CardVariant = 'default' | 'info' | 'success' | 'warning' | 'danger' | 'primary';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  elevated?: boolean;
  noPadding?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white text-neutral-900',
  info: 'bg-info-light border-l-4 border-info text-neutral-900',
  success: 'bg-success-light border-l-4 border-success text-neutral-900',
  warning: 'bg-warning/10 border-l-4 border-warning text-neutral-900',
  danger: 'bg-danger/10 border-l-4 border-danger text-neutral-900',
  primary: 'bg-primary-light border-l-4 border-primary text-neutral-900',
};

export function Card({
  children,
  className = '',
  variant = 'default',
  elevated = false,
  noPadding = false,
}: CardProps) {
  return (
    <div
      className={`
        rounded-md
        ${variantStyles[variant]}
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

/**
 * Usage examples:
 *
 * <Card>Default white card</Card>
 * <Card variant="info">Info message</Card>
 * <Card variant="success">Success message</Card>
 * <Card variant="warning">Warning message</Card>
 * <Card variant="danger">Error message</Card>
 * <Card variant="primary">Primary card</Card>
 * <Card elevated>Elevated shadow</Card>
 * <Card noPadding>Custom padding via className</Card>
 */
