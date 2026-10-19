import type { ReactNode } from "react";

type GoalCardProps = {
  value: ReactNode;
  message?: string;
  badge?: string | null;
  emptyText: string;
};

export default function GoalCard({ value, message, badge, emptyText }: GoalCardProps) {
  return (
    <div className="card cap-card" aria-labelledby="cap-t">
      <h2 id="cap-t" className="goal-label">Votre cap du jour</h2>
      <p className="cap-value">{value}</p>
      <div className="cap-row">
        {message && <p className="cap-msg">{message}</p>}
        {badge ? <span className="badge">{badge}</span> : <span className="small">{emptyText}</span>}
      </div>
    </div>
  );
}
