"use client";

import Link from "next/link";
import { useAppState } from "@/app/lib/app-state";
import { BackIcon, PlusIcon } from "@/app/components/icons";
import { TIP_ICONS } from "@/app/components/TipIconMap";
import { PARC_ROWS, dcThemeName, type Tip } from "@/app/lib/parcourir-data";

const VIS_CYCLES: Record<"tips" | "how" | "concept", string[]> = {
  tips: ["v1", "v2", "v3"],
  how: ["v2", "v3", "v1"],
  concept: ["v3", "v1", "v2"],
};

function Row({ title, rowKey, items }: { title: string; rowKey: "tips" | "how" | "concept"; items: Tip[] }) {
  const vis = VIS_CYCLES[rowKey];
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
      <div className="rail">
        {items.map((it, i) => {
          const Icon = TIP_ICONS[it.icon];
          return (
            <Link className="rcard" href={`/parcourir/${rowKey}/${i}`} key={i}>
              <span className={`vis ${vis[i % vis.length]}`} aria-hidden="true"><Icon /></span>
              <span className="rbody"><strong>{it.t}</strong></span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function ParcourirPage() {
  const { dcMine } = useAppState();

  return (
    <section className="screen parc">
      <div className="topbar pas-top">
        <Link className="icon-btn pas-back" href="/" aria-label="Retour à l'accueil">
          <BackIcon />
        </Link>
        <h1 tabIndex={-1}>Parcourir</h1>
        <span className="help-btn balance" aria-hidden="true">Aide</span>
      </div>

      <Row title="" rowKey="tips" items={PARC_ROWS.tips} />
      <Row title="Comment utiliser D-marche ?" rowKey="how" items={PARC_ROWS.how} />
      <Row title="Découvrir les balades D-carte" rowKey="concept" items={PARC_ROWS.concept} />

      <article className="card dc-cta">
        <span className="vis v1 dc-cta-vis" aria-hidden="true"><PlusIcon /></span>
        <div className="dc-cta-text">
          <h2>Créer une D-carte</h2>
          <p className="small">Partagez un conseil court sur la marche. Il sera relu avant publication.</p>
          <Link className="btn primary" href="/parcourir/nouvelle">Créer une D-carte</Link>
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
