"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { useAppState } from "@/app/lib/app-state";
import { BackIcon, CalendarIcon, CheckIcon, FootprintIcon, RouteIcon, SparkleIcon, SunIcon, TrophyIcon } from "@/app/components/icons";
import {
  DEFI_DU_MOMENT,
  DEFI_ETAPES,
  DEFI_HABITUDES,
  HABITS,
  trophyDefs,
  type TrophyDef,
} from "@/app/lib/defis-data";

const TROPHY_ICONS: Record<TrophyDef["icon"], ComponentType<{ className?: string }>> = {
  footprint: FootprintIcon,
  route: RouteIcon,
  calendar: CalendarIcon,
  sun: SunIcon,
  trophy: TrophyIcon,
};

export default function PasAPasPage() {
  const { defisValides, syncCount, balDone, toggleDefi } = useAppState();

  const petitesVictoires = [
    ...DEFI_ETAPES.map((d) => ({ id: d.id, t: d.t })),
    ...HABITS.map((h) => ({ id: h.id, t: h.t })),
  ];

  const trophies = trophyDefs(defisValides, syncCount, balDone);
  const moDone = !!defisValides[DEFI_DU_MOMENT.id];

  return (
    <section className="screen">
      <div className="topbar pas-top">
        <Link className="icon-btn pas-back" href="/" aria-label="Retour à l'accueil">
          <BackIcon />
        </Link>
        <h1 tabIndex={-1}>Pas à pas</h1>
        <span className="help-btn balance" aria-hidden="true">Aide</span>
      </div>

      <p className="kv-label">Défi du moment</p>
      <article className={`card defi-card defi-now${moDone ? " is-done" : ""}`}>
        <p><span className="badge">Petite victoire</span></p>
        <p className="dc-name">{DEFI_DU_MOMENT.t}</p>
        <p className="small">{DEFI_DU_MOMENT.b}</p>
        <button
          className="btn quiet walk-btn"
          type="button"
          aria-pressed={moDone}
          onClick={() => toggleDefi(DEFI_DU_MOMENT.id)}
        >
          {moDone ? "Rejoint" : "Rejoindre"}
        </button>
      </article>

      <h2 className="sec-title">Rejoindre un défi</h2>

      <h3 className="sec-title sub-title">Petites victoires</h3>
      <p className="small row-hint">Faire un détour pour réaliser une de ces actions.</p>
      <section className="row">
        <div className="rail sq-rail">
          {petitesVictoires.map((d) => {
            const ok = !!defisValides[d.id];
            return (
              <article className={`sq-card${ok ? " is-done" : ""}`} key={d.id}>
                <span className="sq-text">{d.t}</span>
                <button
                  className="sq-btn"
                  type="button"
                  aria-pressed={ok}
                  onClick={() => toggleDefi(d.id)}
                >
                  {ok ? "Fait" : "À faire"}
                </button>
                {ok && <span className="sq-check" aria-hidden="true"><CheckIcon /></span>}
              </article>
            );
          })}
        </div>
      </section>

      <h3 className="sec-title sub-title">Bonnes habitudes</h3>
      <p className="small row-hint">Une action répétée.</p>
      <section className="row">
        <div className="rail">
          {DEFI_HABITUDES.map((d) => {
            const ok = !!defisValides[d.id];
            return (
              <article className="rcard defi-rcard defi-rcard-desc" key={d.id}>
                <span className="vis v1" aria-hidden="true"><SparkleIcon /></span>
                <span className="rbody">
                  <strong>{d.t}</strong>
                  <span className="small defi-desc">{d.b}</span>
                </span>
                <span className="defi-rfoot">
                  <button
                    className="defi-rlink"
                    type="button"
                    aria-pressed={ok}
                    onClick={() => toggleDefi(d.id)}
                  >
                    {ok ? "Rejoint" : "Rejoindre"}
                  </button>
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <h2 className="sec-title">Mes Trophées</h2>
      <div className="ch-list">
        <div className="trophy-grid">
          {trophies.map((t) => {
            const Icon = TROPHY_ICONS[t.icon];
            return (
              <div className={`trophy-badge${t.ok ? " is-on" : ""}`} key={t.name}>
                <span className="trophy-ico" aria-hidden="true"><Icon /></span>
                {t.ok && <span className="trophy-check" aria-hidden="true"><CheckIcon /></span>}
                <span className="trophy-name">{t.name}</span>
                <span className="small">{t.cur}/{t.goal}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
