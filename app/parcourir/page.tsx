"use client";

import Link from "next/link";
import { useAppState } from "@/app/lib/app-state";
import { PlusIcon, SettingsIcon } from "@/app/components/icons";
import TipCard from "@/app/components/TipCard";
import { PARC_ROWS, dcThemeName, type Tip } from "@/app/lib/parcourir-data";

function Row({ title, rowKey, items }: { title: string; rowKey: "tips" | "how" | "concept"; items: Tip[] }) {
  return (
    <section className="row">
      {title && (
        <h2 className="sec-title row-title">
          {title}
          <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </h2>
      )}
      <div className="tip-list">
        {items.map((it, i) => (
          <TipCard key={i} photo={it.photo} title={it.t} href={`/parcourir/${rowKey}/${i}`} horizontal />
        ))}
      </div>
    </section>
  );
}

export default function ParcourirPage() {
  const { dcMine } = useAppState();

  return (
    <section className="screen parc">
      <div className="topbar pas-top tab-top">
        <h1 tabIndex={-1}>Parcourir</h1>
        <Link className="icon-btn" href="/settings" aria-label="Réglages"><SettingsIcon /></Link>
      </div>

      <Row title="" rowKey="tips" items={PARC_ROWS.tips} />
      <Row title="Comment utiliser D-marche ?" rowKey="how" items={PARC_ROWS.how} />
      <Row title="Découvrir les balades D-carte" rowKey="concept" items={PARC_ROWS.concept} />

      <article className="card dc-cta">
        <span className="vis v1 dc-cta-vis" aria-hidden="true"><PlusIcon /></span>
        <div className="dc-cta-text">
          <h2>Créer une D-carte</h2>
          <p className="small">Partagez un conseil court sur la marche. Il sera relu avant publication.</p>
          <Link className="btn quiet" href="/parcourir/nouvelle">Créer une D-carte</Link>
        </div>
      </article>

      {dcMine.length > 0 && (
        <section className="row">
          <h2 className="sec-title">Mes D-cartes</h2>
          <div className="ch-list">
            {dcMine.map((c) => (
              <article className="card ch-item" key={c.id}>
                <div className="ch-head">
                  <div>
                    <p className="dc-name">{c.title}</p>
                    <p className="small">{dcThemeName(c.theme)}</p>
                  </div>
                  <span className="badge">{c.status}</span>
                </div>
                <p className="small">{c.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
