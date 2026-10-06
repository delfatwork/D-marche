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
          <label className="font-semibold text-[1.125rem] text-[#1A1915]">
            {label}
          </label>
          <span className="font-bold text-[1.125rem] text-[#B45300]">
            {value}/{max}
          </span>
        </div>
      )}

      <div
        className={`
          w-full bg-[#E8E8E5] rounded-full overflow-hidden
          ${sizeStyles[size]}
        `}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div
          className={`
            h-full bg-gradient-to-r from-[#B45300] to-[#F97316]
            transition-all duration-300 ease-out
            rounded-full
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
