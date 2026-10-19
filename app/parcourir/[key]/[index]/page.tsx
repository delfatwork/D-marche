"use client";

import { use } from "react";
import Link from "next/link";
import { BackIcon } from "@/app/components/icons";
import { PARC_ROWS } from "@/app/lib/parcourir-data";

export default function TipDetailPage({ params }: { params: Promise<{ key: string; index: string }> }) {
  const { key, index } = use(params);
  const rowKey = key as "tips" | "how" | "concept";
  const items = PARC_ROWS[rowKey];
  const tip = items?.[parseInt(index, 10)];

  if (!tip) {
    return (
      <section className="screen">
        <div className="topbar">
          <Link className="back" href="/parcourir">
            <BackIcon />
            <span>Retour</span>
          </Link>
        </div>
        <p className="muted">Ce conseil n&apos;existe plus.</p>
        <Link className="btn primary" href="/parcourir">Voir les conseils</Link>
      </section>
    );
  }

  return (
    <section className="screen">
      <div className="topbar">
        <Link className="back" href="/parcourir">
          <BackIcon />
          <span>Retour</span>
        </Link>
      </div>
      <h1 tabIndex={-1}>{tip.t}</h1>
      <p>{tip.body}</p>
    </section>
  );
}
