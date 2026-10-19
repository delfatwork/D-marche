"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Ring from "@/app/components/Ring";

type RingCardProps = {
  icon: ReactNode;
  headline: string;
  value: ReactNode;
  pct: number;
  footer: string;
  href?: string;
  ariaLabel?: string;
};

export default function RingCard({ icon, headline, value, pct, footer, href, ariaLabel }: RingCardProps) {
  const content = (
    <>
      <div className="ring-card-head">
        {icon}
        <p className="ring-card-headline">{headline}</p>
      </div>
      <Ring pct={pct} className="ring-card-ring">
        <strong>{value}</strong>
      </Ring>
      <p className="ring-card-footer">{footer}</p>
    </>
  );

  if (href) {
    return (
      <Link className="card ring-card stat-btn" href={href} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <article className="card ring-card" aria-label={ariaLabel}>
      {content}
    </article>
  );
}
