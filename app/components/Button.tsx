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
    bg-[#B45300] text-white
    hover:bg-[#92400E]
    active:bg-[#7C2D12]
    disabled:bg-[#E8E8E5] disabled:text-[#A3A39D]
  `,
  secondary: `
    bg-[#F97316] text-white
    hover:bg-[#9A3412]
    active:bg-[#7C2D12]
    disabled:bg-[#E8E8E5] disabled:text-[#A3A39D]
  `,
  tertiary: `
    bg-[#F5F5F3] text-[#1A1915] border-2 border-[#B45300]
    hover:bg-[#FEF3C7]
    active:bg-[#FED7AA]
    disabled:bg-[#E8E8E5] disabled:text-[#A3A39D] disabled:border-[#A3A39D]
  `,
  danger: `
    bg-[#EF4444] text-white
    hover:bg-[#DC2626]
    active:bg-[#B91C1C]
    disabled:bg-[#E8E8E5] disabled:text-[#A3A39D]
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[1rem] min-h-[44px]',
  md: 'px-6 py-3 text-[1.125rem] min-h-[48px]',
  lg: 'px-8 py-4 text-[1.25rem] min-h-[56px]',
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
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}

        font-semibold rounded-[1rem]
        transition-colors duration-250

        focus-visible:outline-2 focus-visible:outline-[#B45300]
        focus-visible:outline-offset-2

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-60

        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          ⏳
        </span>
      )}
    </button>
  );
}
