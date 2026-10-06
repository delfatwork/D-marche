'use client';

interface ChoiceCardProps {
  id: string;
  label: string;
  description?: string;
  emoji?: string;
  selected?: boolean;
  disabled?: boolean;
  onChange?: (id: string) => void;
  className?: string;
}

export function ChoiceCard({
  id,
  label,
  description,
  emoji,
  selected = false,
  disabled = false,
  onChange,
  className = '',
}: ChoiceCardProps) {
  return (
    <button
      id={id}
      onClick={() => !disabled && onChange?.(id)}
      disabled={disabled}
      className={`
        w-full p-6 rounded-md text-left
        border-2 transition-all duration-250

        ${
          selected
            ? 'border-primary bg-primary-light'
            : 'border-neutral-200 bg-white hover:border-primary'
        }

        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}

        focus-visible:outline-2 focus-visible:outline-primary
        focus-visible:outline-offset-2

        ${className}
      `}
      aria-pressed={selected}
      type="button"
    >
      <div className="flex items-start gap-3">
        {emoji && (
          <span className="text-3xl flex-shrink-0" aria-hidden="true">
            {emoji}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-neutral-900 text-lg mb-1">
            {label}
          </p>
          {description && (
            <p className="text-sm text-neutral-600">
              {description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

/**
 * Usage example:
 *
 * <ChoiceCard
 *   id="level-debutant"
 *   label="Je débute"
 *   description="Je marche peu ou pas régulièrement"
 *   emoji="🚶"
 *   selected={selectedLevel === 'debutant'}
 *   onChange={() => setSelectedLevel('debutant')}
 * />
 */
