"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type WeekTotalCardProps = {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  days: ReactNode;
  href?: string;
  ariaLabel?: string;
};

export default function WeekTotalCard({ icon, label, value, days, href, ariaLabel }: WeekTotalCardProps) {
  const content = (
    <>
      <div className="kpi-total-head">
        {icon}
        <p className="kpi-total-label">{label}</p>
      </div>
      <div className="kpi-total-body">
        <p className="kpi-total-value">{value}</p>
        <ul className="days mini" aria-label="Jours où vous avez marché">
          {days}
        </ul>
      </div>
    </>
  );

  if (href) {
    return (
      <Link className="card kpi-total pas-link" href={href} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return <article className="card kpi-total">{content}</article>;
}
