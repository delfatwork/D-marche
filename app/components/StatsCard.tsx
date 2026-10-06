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
    <div className="bg-white rounded-xl border-2 border-[#E8E8E5] p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {emoji && <span className="text-3xl">{emoji}</span>}
          <p className="text-sm font-semibold text-[#57564F]">{label}</p>
        </div>
        {trend && (
          <span
            className={`text-xl ${
              trend === 'up'
                ? 'text-[#10B981]'
                : trend === 'down'
                  ? 'text-[#EF4444]'
                  : 'text-[#78776F]'
            }`}
          >
            {trend === 'up' && '↗️'}
            {trend === 'down' && '↘️'}
            {trend === 'stable' && '→'}
          </span>
        )}
      </div>

      <p className="text-4xl font-bold text-[#B45300] mb-1">
        {value}
        {unit && <span className="text-lg text-[#57564F] ml-1">{unit}</span>}
      </p>

      {description && (
        <p className="text-sm text-[#57564F]">{description}</p>
      )}
    </div>
  );
}
