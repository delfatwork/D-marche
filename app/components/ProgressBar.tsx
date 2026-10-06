'use client';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  ariaLabel?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  showLabel = false,
  label,
  ariaLabel,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeStyles = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-6',
  };

  return (
    <div className={className}>
      {showLabel && label && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-base text-neutral-900">
            {label}
          </span>
          <span className="font-bold text-base text-primary">
            {value}/{max}
          </span>
        </div>
      )}

      <div
        className={`
          w-full bg-neutral-200 rounded-full overflow-hidden
          ${sizeStyles[size]}
        `}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={`${value} sur ${max}`}
        aria-label={ariaLabel}
      >
        <div
          className={`
            h-full bg-gradient-to-r from-primary to-secondary
            transition-all duration-300 ease-out
            rounded-full
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
