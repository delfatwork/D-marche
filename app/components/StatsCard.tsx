'use client';

interface StatsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  emoji?: string;
  trend?: 'up' | 'down' | 'stable';
  description?: string;
}

export function StatsCard({
  label,
  value,
  unit,
  emoji,
  trend,
  description,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-md border-2 border-neutral-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {emoji && <span className="text-3xl" aria-hidden="true">{emoji}</span>}
          <p className="text-sm font-semibold text-neutral-600">{label}</p>
        </div>
        {trend && (
          <span
            className={`text-xl ${
              trend === 'up'
                ? 'text-success'
                : trend === 'down'
                  ? 'text-danger'
                  : 'text-neutral-600'
            }`}
            aria-label={trend === 'up' ? 'Tendance à la hausse' : trend === 'down' ? 'Tendance à la baisse' : 'Tendance stable'}
          >
            {trend === 'up' && '↗'}
            {trend === 'down' && '↘'}
            {trend === 'stable' && '→'}
          </span>
        )}
      </div>

      <p className="text-4xl font-bold text-primary mb-1">
        {value}
        {unit && <span className="text-lg text-neutral-600 ml-1">{unit}</span>}
      </p>

      {description && (
        <p className="text-sm text-neutral-600">{description}</p>
      )}
    </div>
  );
}
