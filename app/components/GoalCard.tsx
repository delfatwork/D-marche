import type { ReactNode } from "react";
import Ring from "@/app/components/Ring";
import { CheckIcon } from "@/app/components/icons";

type GoalCardProps = {
  pct: number;
  value: ReactNode;
  message?: string;
  badge?: string | null;
  emptyText: string;
};

export default function GoalCard({ pct, value, message, badge, emptyText }: GoalCardProps) {
  return (
    <div className="card cap-card" aria-labelledby="cap-t">
      <h2 id="cap-t" className="cap-title">Votre cap du jour</h2>
      <div className="cap-value">
        {value}
        <Ring pct={pct} className="cap-ring">
          {pct >= 100 ? (
            <span className="cap-ring-check" aria-hidden="true"><CheckIcon /></span>
          ) : (
            <strong className="cap-ring-pct">{Math.round(Math.max(0, Math.min(100, pct)))}%</strong>
          )}
        </Ring>
      </div>
      <div className="cap-row">
        {message && <p className="cap-msg">{message}</p>}
        {badge ? <span className="cap-tag">{badge}</span> : <span className="small">{emptyText}</span>}
      </div>
    </div>
  );
}
