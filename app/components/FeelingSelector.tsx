'use client';

import type { Feeling } from '@/app/lib/types';

interface FeelingOption {
  id: Feeling;
  label: string;
  emoji: string;
  description?: string;
}

interface FeelingSelectorProps {
  feelings: FeelingOption[];
  selected?: Feeling | null;
  onChange?: (feeling: Feeling) => void;
  disabled?: boolean;
  className?: string;
}

export function FeelingSelector({
  feelings,
  selected,
  onChange,
  disabled = false,
  className = '',
}: FeelingSelectorProps) {
  return (
    <fieldset className={className}>
      <legend className="sr-only">Comment vous sentez-vous?</legend>
      <div className="grid grid-cols-2 gap-4">
        {feelings.map(feeling => (
          <button
            key={feeling.id}
            type="button"
            onClick={() => !disabled && onChange?.(feeling.id)}
            disabled={disabled}
            aria-pressed={selected === feeling.id}
            aria-label={feeling.description || feeling.label}
            className={`
              p-6 rounded-md border-2 transition-all duration-250
              flex flex-col items-center justify-center gap-3
              min-h-[140px]

              ${
                selected === feeling.id
                  ? 'border-primary bg-primary-light'
                  : 'border-neutral-200 bg-white hover:border-primary'
              }

              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}

              focus-visible:outline-2 focus-visible:outline-primary
              focus-visible:outline-offset-2
            `}
          >
            <span className="text-5xl" aria-hidden="true">
              {feeling.emoji}
            </span>
            <p className="font-semibold text-neutral-900 text-center">
              {feeling.label}
            </p>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Usage example:
 *
 * const feelings: FeelingOption[] = [
 *   { id: 'excellent', label: 'Excellent', emoji: '😍' },
 *   { id: 'bien', label: 'Bien', emoji: '😊' },
 *   { id: 'normal', label: 'Normal', emoji: '😐' },
 *   { id: 'fatigue', label: 'Fatigué', emoji: '😴' },
 * ];
 *
 * <FeelingSelector
 *   feelings={feelings}
 *   selected={selectedFeeling}
 *   onChange={setSelectedFeeling}
 * />
 */
