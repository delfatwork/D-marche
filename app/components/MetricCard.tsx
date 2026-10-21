import type { ReactNode } from "react";

type MetricCardProps = {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  unit: string;
  className?: string;
};

export default function MetricCard({ icon, label, value, unit, className }: MetricCardProps) {
  return (
    <article className={`card metric-card${className ? ` ${className}` : ""}`}>
      <div className="metric-card-head">
        {icon}
        <p className="metric-card-label">{label}</p>
      </div>
      <div className="metric-card-body">
        <p className="metric-card-value">{value}</p>
        <p className="metric-card-unit">{unit}</p>
      </div>
    </article>
  );
}
