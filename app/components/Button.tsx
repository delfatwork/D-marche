'use client';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary text-white
    hover:bg-primary-hover
    active:bg-primary-active
    disabled:bg-neutral-200 disabled:text-neutral-400
  `,
  secondary: `
    bg-secondary text-white
    hover:bg-secondary-dark
    active:bg-primary-active
    disabled:bg-neutral-200 disabled:text-neutral-400
  `,
  tertiary: `
    bg-neutral-100 text-neutral-900 border-2 border-primary
    hover:bg-primary-light
    active:bg-secondary-light
    disabled:bg-neutral-200 disabled:text-neutral-400 disabled:border-neutral-400
  `,
  danger: `
    bg-danger text-white
    hover:bg-danger-hover
    active:bg-danger-active
    disabled:bg-neutral-200 disabled:text-neutral-400
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[44px]',
  md: 'px-6 py-3 text-base min-h-[48px]',
  lg: 'px-8 py-4 text-lg min-h-[56px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        relative
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}

        font-semibold rounded-md
        transition-colors duration-250

        focus-visible:outline-2 focus-visible:outline-primary
        focus-visible:outline-offset-2

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-60

        ${className}
      `}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
      {isLoading && (
        <>
          <span className="sr-only">Chargement en cours…</span>
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            ⏳
          </span>
        </>
      )}
    </button>
  );
}
