"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { useAppState } from "@/app/lib/app-state";
import { LEVELS } from "@/app/lib/onboarding-data";
import { INITIALS, KM_PER_STEP, STEP_MIN, dayDateLabel, dayFullName, stepsOf, weekRangeLabel, type Day } from "@/app/lib/week";
import { nf } from "@/app/lib/format";
import { BackIcon, CheckIcon } from "@/app/components/icons";
import { useAnimatedPct } from "@/app/lib/useAnimatedPct";

function DayRingDot({ pct, reached }: { pct: number; reached: boolean }) {
  const animated = useAnimatedPct(Math.min(pct, 100));
  return (
    <div className="dc-ring" style={{ "--p": animated.toFixed(1) } as CSSProperties} aria-hidden="true">
      <span>{reached && <CheckIcon />}</span>
    </div>
  );
}

const PERIODS: { key: "1j" | "7j" | "4s" | "1a"; label: string }[] = [
  { key: "1j", label: "1j" },
  { key: "7j", label: "7j" },
  { key: "4s", label: "4s" },
  { key: "1a", label: "1a" },
];

function sortiesOf(d: Day): number {
  return d.min > 0 ? Math.ceil(d.min / 12) : 0;
}

export default function ActiviteScreen({ metric }: { metric: "pas" | "sorties" }) {
  const { hydrated, level, week } = useAppState();
  const [period, setPeriod] = useState<"1j" | "7j" | "4s" | "1a">("7j");

  const isS = metric === "sorties";
  const unit = isS ? "sorties" : "pas";
  const goal = isS ? 2 : LEVELS[level || "doux"].steps;

  const today = week[6];
  const todayValue = isS ? sortiesOf(today) : stepsOf(today);
  const pct1j = Math.round((todayValue / goal) * 100);
  const reached1j = todayValue >= goal;
  const animatedPct1j = useAnimatedPct(Math.min(pct1j, 100));

  const items7 = week.map((d) => ({ day: d, value: isS ? sortiesOf(d) : stepsOf(d) }));
  const totalSteps7 = week.reduce((acc, d) => acc + stepsOf(d), 0);
  const total7 = items7.reduce((acc, i) => acc + i.value, 0);
  const avg7 = Math.round(total7 / 7);
  const km7 = totalSteps7 * KM_PER_STEP;
  const minTotal7 = Math.round(totalSteps7 / STEP_MIN);
  const max7 = Math.max(goal, ...items7.map((i) => i.value)) * 1.1;

  const showTotals = period === "1j" || period === "7j";
  const totalValue = period === "1j" ? todayValue : total7;
  const avgValue = period === "1j" ? todayValue : avg7;
  const thirdValue = period === "1j" ? (isS ? today.min : stepsOf(today) * KM_PER_STEP) : isS ? minTotal7 : km7;

  if (!hydrated) return null;

  return (
    <section className="screen">
      <div className="topbar pas-top">
        <Link className="back pas-back" href="/">
          <BackIcon />
          <span>Retour</span>
        </Link>
        <h1 tabIndex={-1}>{isS ? "Sorties" : "Pas"}</h1>
        <span className="help-btn balance" aria-hidden="true">Aide</span>
      </div>

      <div className="seg-bar" role="group" aria-label="Période affichée">
        {PERIODS.map((p) => (
          <button
            key={p.key}
            type="button"
            className="seg-opt"
            aria-pressed={period === p.key}
            onClick={() => setPeriod(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="card">
        {period === "1j" && (
          <>
            <div
              className="big-ring"
              style={{ "--p": animatedPct1j.toFixed(1) } as CSSProperties}
              role="img"
              aria-label={`${nf(todayValue)} ${unit}, ${pct1j} % de l'objectif`}
            >
              <div className="big-ring-in" aria-hidden="true">
                <strong>{nf(todayValue)}</strong>
                <small>{unit}</small>
                {reached1j && (
                  <span className="goal-ok">
                    <CheckIcon />
                    Atteint
                  </span>
                )}
              </div>
            </div>
            <p className="pct-line">{pct1j} % de l&apos;objectif</p>
          </>
        )}

        {period === "7j" && (
          <>
            <p className="day-label" style={{ textAlign: "center" }}>{weekRangeLabel(week)}</p>
            <div
              className="pchart"
              role="img"
              aria-label={`${isS ? "Sorties" : "Pas"} sur 7 jours, objectif ${nf(goal)} ${unit} par jour`}
            >
              <div className="pc-area">
                {items7.map((i, idx) => (
                  <div key={idx} className="pc-col" aria-hidden="true">
                    <div className="pc-track" style={{ height: `${((goal / max7) * 100).toFixed(1)}%` }} />
                    <div className="pc-bar" style={{ height: `${((i.value / max7) * 100).toFixed(1)}%` }} />
                  </div>
                ))}
              </div>
              <div className="pc-vals" aria-hidden="true">
                {items7.map((i, idx) => <span key={idx}>{nf(i.value)}</span>)}
              </div>
              <div className="pc-labs" aria-hidden="true">
                {items7.map((i, idx) => <span key={idx}>{INITIALS[i.day.dow]}</span>)}
              </div>
            </div>
          </>
        )}

        {(period === "4s" || period === "1a") && (
          <div className="empty-card">
            <p className="kv-label">Historique pas encore disponible</p>
            <p className="small">Le suivi sur plusieurs semaines arrivera dans un prochain chantier.</p>
          </div>
        )}
      </div>

      {showTotals && (
        <div className="trio pas-totals">
          <article className="card kpi">
            <p className="kv-label">{isS ? "Total sorties" : "Total pas"}</p>
            <p className="big">{nf(totalValue)}</p>
            <p className="small">{unit}</p>
          </article>
          <article className="card kpi">
            <p className="kv-label">Moyenne quotidienne</p>
            <p className="big">{nf(avgValue)}</p>
            <p className="small">{unit} par jour</p>
          </article>
          {isS ? (
            <article className="card kpi">
              <p className="kv-label">Minutes</p>
              <p className="big">{nf(thirdValue)}</p>
              <p className="small">min</p>
            </article>
          ) : (
            <article className="card kpi">
              <p className="kv-label">Distance</p>
              <p className="big">{nf(thirdValue, 1)}</p>
              <p className="small">km</p>
            </article>
          )}
        </div>
      )}

      {period === "7j" && (
        <div className="day-list" aria-label="Détail par jour">
          {[...week].reverse().map((d, idx) => {
            const value = isS ? sortiesOf(d) : stepsOf(d);
            const pct = Math.round((value / goal) * 100);
            const reached = value >= goal;
            return (
              <article className="card day-card" key={idx}>
                <div>
                  <p className="dc-name">{dayFullName(d)}</p>
                  <p className="small dc-date">
                    {dayDateLabel(d)} • <strong className="dc-pct">{pct} %</strong>
                  </p>
                </div>
                <div className="dc-mid">
                  <p className="dc-steps">{nf(value)} {unit}</p>
                </div>
                <DayRingDot pct={pct} reached={reached} />
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
