"use client";

import { use, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import { useAppState } from "@/app/lib/app-state";
import {
  BackIcon,
  BenchIcon,
  CalendarIcon,
  CrossingIcon,
  DropIcon,
  FlagIcon,
  PhoneIcon,
  PinIcon,
  PrintIcon,
  RouteIcon,
  ShoeIcon,
  UsersIcon,
} from "@/app/components/icons";
import { BAL_CRENEAUX, BAL_NAMES, balDiff, balParcours, type PointIcon } from "@/app/lib/balades-data";

const DTABS: { key: string; label: string }[] = [
  { key: "carte", label: "Carte" },
  { key: "participants", label: "Participants" },
  { key: "conseils", label: "Conseils et infos" },
  { key: "points", label: "Points de passage" },
];

const POINT_ICONS: Record<PointIcon, ComponentType<{ className?: string }>> = {
  flag: FlagIcon,
  route: RouteIcon,
  bench: BenchIcon,
  cross: CrossingIcon,
};

export default function BaladePage({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = use(params);
  const { balJoined, joinCreneau, leaveCreneau } = useAppState();
  const [slide, setSlide] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);

  const solo = type === "solo";
  const creneau = solo ? null : BAL_CRENEAUX.find((c) => c.id === id);
  const p = solo ? balParcours(id) : creneau ? balParcours(creneau.parcoursId) : undefined;

  if (!p) {
    return (
      <section className="screen">
        <div className="topbar pas-top">
          <Link className="icon-btn pas-back" href="/balades" aria-label="Retour aux balades">
            <BackIcon />
          </Link>
          <h1 tabIndex={-1}>Balade</h1>
          <span className="help-btn balance" aria-hidden="true">Aide</span>
        </div>
        <p className="muted">Cette balade n&apos;existe plus.</p>
        <Link className="btn primary" href="/balades">Voir les balades</Link>
      </section>
    );
  }

  const title = solo ? p.name : creneau!.title;
  const joined = creneau ? balJoined.includes(creneau.id) : false;
  const displayCount = creneau ? creneau.count + (joined ? 1 : 0) : 0;
  const full = creneau ? displayCount >= creneau.max : false;

  function handleScroll() {
    const el = slidesRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setSlide(i);
  }

  return (
    <section className="screen">
      <div className="topbar pas-top bal-topbar">
        <Link className="icon-btn pas-back" href="/balades" aria-label="Retour aux balades">
          <BackIcon />
        </Link>
        <span className="bal-top-spacer" aria-hidden="true" />
        <span className="help-btn balance" aria-hidden="true">Aide</span>
        <div className="bal-tgroup" role="group" aria-label="Actions de la balade">
          <button type="button" className="bal-tbtn" aria-label="Imprimer la fiche" onClick={() => window.print()}>
            <PrintIcon />
          </button>
        </div>
      </div>

      <div className="bal-slider" role="region" aria-label="Aperçu de la balade">
        <div className="bal-slides" ref={slidesRef} onScroll={handleScroll}>
          <div className="bal-slide bal-slide-map">
            <svg className="bal-svg" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" aria-hidden="true" focusable="false">
              <path d={p.path} />
            </svg>
          </div>
          <div className="bal-slide">
            <div className="bal-slide-row">
              {p.pts.map((x, i) => {
                const Icon = POINT_ICONS[x.i];
                return (
                  <span className="bal-slide-ico" title={x.t} key={i}>
                    <Icon />
                  </span>
                );
              })}
            </div>
          </div>
          <div className="bal-slide">
            <div className="bal-slide-txt">
              <strong>Surface</strong>
              <span>{p.surface.join(" · ")}</span>
            </div>
          </div>
        </div>
        <div className="bal-dots" role="img" aria-label={`Diapositive ${slide + 1} sur 3`}>
          {[0, 1, 2].map((i) => <span key={i} className={i === slide ? "on" : ""} />)}
        </div>
      </div>

      <div className="bal-brand-wrap">
        <span className="bal-brand-av" aria-hidden="true">D</span>
        <div className="bal-brand-text">
          <p className="bal-brand">D-carte</p>
          <p className="bal-brand-date">{solo ? "25 août 2025" : creneau!.date}</p>
        </div>
      </div>
      <h1 className="bal-title" tabIndex={-1}>{title}</h1>
      <p className="bal-badges">
        <span className="badge">{p.km}</span>
        <span className="badge">{solo ? "Solo" : "Groupe"}</span>
        <span className={`chip chip-${balDiff(p).cls}`}>{balDiff(p).label}</span>
      </p>

      {solo ? (
        <ul className="bal-info">
          <li><PinIcon /><span>{p.ville}</span></li>
        </ul>
      ) : (
        <ul className="bal-info">
          <li><UsersIcon /><span>{displayCount} / {creneau!.max} participants</span></li>
          <li><CalendarIcon /><span>{creneau!.date}, {creneau!.time}</span></li>
          <li><PinIcon /><span>{creneau!.meet}</span></li>
        </ul>
      )}

      <nav className="seg-bar bal-dtabs" aria-label="Sections de la balade">
        {DTABS.filter((t) => !(solo && t.key === "participants"))
          .map((t) => (
            <a className="seg-opt" href={`#bal-sec-${t.key}`} key={t.key}>{t.label}</a>
          ))}
      </nav>

      <section className="bal-sec" id="bal-sec-carte">
        <h2 className="bal-panel-title">Carte</h2>
        <div className="bal-tabpanel">
          <div className={`bal-map ${solo ? "v1" : "v2"}`}>
            <svg className="bal-svg" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" aria-hidden="true" focusable="false">
              <path d={p.path} />
            </svg>
          </div>
        </div>
      </section>

      <div className="bal-actions bal-detail-actions">
        {solo ? (
          <Link className="btn primary" href="/walk">Commencer cette balade</Link>
        ) : joined ? (
          <button className="btn secondary" type="button" onClick={() => leaveCreneau(creneau!.id)}>Me désinscrire</button>
        ) : full ? (
          <button className="btn secondary" type="button" disabled>Complet</button>
        ) : (
          <button className="btn primary" type="button" onClick={() => joinCreneau(creneau!.id)}>Comment y aller</button>
        )}
      </div>

      {!solo && (
        <section className="bal-sec" id="bal-sec-participants">
          <h2 className="bal-panel-title">Participants</h2>
          <div className="rail pax-rail">
            {BAL_NAMES.slice(0, displayCount).map((name) => (
              <div className="pax-card" key={name}>
                <span className="pax-av" aria-hidden="true">{name.charAt(0)}</span>
                <span className="pax-name">{name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bal-sec" id="bal-sec-conseils">
        <h2 className="bal-panel-title">Conseils et infos</h2>
        <div className="bal-tabpanel">
          <div className="tip-grid">
            <div className="tip-tile"><ShoeIcon /><span>Chaussures confortables</span></div>
            <div className="tip-tile"><DropIcon /><span>Pensez à boire</span></div>
            <div className="tip-tile"><BenchIcon /><span>Pauses sur les bancs</span></div>
            <div className="tip-tile"><PhoneIcon /><span>Téléphone chargé</span></div>
          </div>
        </div>
      </section>

      <section className="bal-sec" id="bal-sec-points">
        <h2 className="bal-panel-title">Points de passage</h2>
        <div className="rail pt-rail">
          {p.pts.map((x, i) => {
            const Icon = POINT_ICONS[x.i];
            return (
              <article className="pt-card" key={i}>
                <span className="pt-vis" aria-hidden="true"><Icon /></span>
                <span className="pt-cap"><strong>{x.t}</strong><span className="small">à {x.d}</span></span>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}
