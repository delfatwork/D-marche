"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Ring from "@/app/components/Ring";

type RingCardProps = {
  icon: ReactNode;
  headline: string;
  value: ReactNode;
  pct: number;
  footer?: string;
  href?: string;
  ariaLabel?: string;
  horizontal?: boolean;
};

export default function RingCard({ icon, headline, value, pct, footer, href, ariaLabel, horizontal }: RingCardProps) {
  const ring = (
    <Ring pct={pct} className="ring-card-ring">
      <strong className="text-md">{value}</strong>
    </Ring>
  );

  const content = horizontal ? (
    <>
      <div className="ring-card-info">
        <div className="ring-card-head">
          {icon}
          <p className="ring-card-headline text-sm-bold">{headline}</p>
        </div>
        {footer && <p className="ring-card-footer text-xs">{footer}</p>}
      </div>
      <p className="ring-card-value text-sm-bold">{value}</p>
    </>
  ) : (
    <>
      <div className="ring-card-head">
        {icon}
        <p className="ring-card-headline text-sm-bold">{headline}</p>
      </div>
      {ring}
      {footer && <p className="ring-card-footer text-xs">{footer}</p>}
    </>
  );

  const className = `card ring-card${horizontal ? " ring-card-h" : ""}`;

  if (href) {
    return (
      <Link className={`${className} stat-btn`} href={href} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <article className={className} aria-label={ariaLabel}>
      {content}
    </article>
  );
}
