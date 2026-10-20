"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppState } from "@/app/lib/app-state";
import { LEVELS } from "@/app/lib/onboarding-data";
import { DAY, INITIALS, STEP_MIN, stepsOf } from "@/app/lib/week";
import { fmtHoursMin, nf, plural } from "@/app/lib/format";
import {
  CheckIcon,
  PedometerIcon,
  RouteIcon,
  SettingsIcon,
  StepsIcon,
  SyncIcon,
  TargetIcon,
  UserIcon,
} from "@/app/components/icons";
import WeekTotalCard from "@/app/components/WeekTotalCard";
import MetricCard from "@/app/components/MetricCard";
import RingCard from "@/app/components/RingCard";
import GoalCard from "@/app/components/GoalCard";
import TipCard from "@/app/components/TipCard";
import { GroupeBaladeCard, SoloBaladeCard } from "@/app/components/BaladeCards";
import { BAL_CRENEAUX, BAL_PARCOURS, balParcours } from "@/app/lib/balades-data";
import { PARC_ROWS } from "@/app/lib/parcourir-data";

export default function Home() {
  const router = useRouter();
  const { hydrated, onboarded, name, level, goalMetric, isNew, week, pedo, recordSync } = useAppState();
  const [dateLabel, setDateLabel] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);

  useEffect(() => {
    if (hydrated && !onboarded) router.replace("/onboarding");
  }, [hydrated, onboarded, router]);

  function handleQuickSync() {
    if (!pedo || syncing) return;
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncDone(true);
      recordSync();
      setTimeout(() => setSyncDone(false), 1500);
    }, 2000);
  }

  useEffect(() => {
    const d = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    setDateLabel(d.charAt(0).toUpperCase() + d.slice(1));
  }, []);

  if (!hydrated || !onboarded) return null;

  const lvl = LEVELS[level || "doux"];
  const goalSteps = lvl.steps;
  const goalMin = Math.round(goalSteps / STEP_MIN);
  const today = week[6];
  const doneMin = today.min;
  const doneSorties = doneMin > 0 ? Math.ceil(doneMin / 12) : 0;
  const goalSorties = Math.max(1, Math.round(goalMin / 12));

  let capValue: React.ReactNode;
  let capDone: number;
  let capGoal: number;
  let capHint = "";
  if (goalMetric === "sorties") {
    capDone = doneSorties;
    capGoal = goalSorties;
    capValue = <>{nf(capDone)} <small>/ sorties</small></>;
    capHint = `Encore ${plural(Math.max(capGoal - capDone, 0), "sortie")} pour atteindre votre cap.`;
  } else if (goalMetric === "pas") {
    capDone = stepsOf(today);
    capGoal = goalSteps;
    capValue = <>{nf(capDone)} <small>/ {nf(capGoal)} pas</small></>;
    capHint = `Encore ${nf(Math.max(capGoal - capDone, 0))} pas pour atteindre votre cap.`;
  } else {
    capDone = doneMin;
    capGoal = goalMin;
    capValue = <>{fmtHoursMin(capDone)} <small>/ {fmtHoursMin(capGoal)}</small></>;
  }
  const capMsg =
    capDone === 0
      ? "Un tout petit tour de 10 minutes pour bien démarrer."
      : capDone >= capGoal
        ? "Cap atteint. Chaque minute en plus compte."
        : capHint;
  const capBadge =
    goalMetric === "sorties"
      ? stepsOf(today) > 0
        ? `${nf(stepsOf(today))} pas`
        : null
      : doneSorties > 0
        ? plural(doneSorties, "sortie")
        : null;

  const yesterday = week[5];
  const yMin = yesterday.min;
  const ySteps = stepsOf(yesterday);
  const ySorties = yMin > 0 ? Math.ceil(yMin / 12) : 0;

  const dureeMode = goalMetric === "duree";
  const pasMode = goalMetric === "pas";

  const cardSorties = dureeMode ? (
    <RingCard
      icon={<TargetIcon className="ring-card-ico" />}
      headline="Durée"
      value={isNew ? "–" : fmtHoursMin(yMin)}
      pct={(yMin / goalMin) * 100}
      footer={`Cap ${fmtHoursMin(goalMin)}`}
      ariaLabel={`Durée hier : ${yMin} min`}
    />
  ) : (
    <RingCard
      icon={<RouteIcon className="ring-card-ico" />}
      headline="Sorties"
      value={isNew ? "–" : nf(ySorties)}
      pct={(ySorties / 3) * 100}
      footer="Cap 3"
      href="/activite/sorties"
      ariaLabel={`Sorties hier : ${ySorties}. Ouvrir le détail des sorties`}
    />
  );
  const cardPas = (
    <RingCard
      icon={<StepsIcon className="ring-card-ico" />}
      headline="Pas"
      value={isNew ? "–" : nf(ySteps)}
      pct={(ySteps / goalSteps) * 100}
      footer={`Cap ${nf(goalSteps)}`}
      href="/activite/pas"
      ariaLabel={`Pas hier : ${nf(ySteps)} sur un objectif de ${nf(goalSteps)}. Ouvrir le détail des pas`}
    />
  );

  const totalSteps = week.reduce((acc, d) => acc + stepsOf(d), 0);
  const totalMin = week.reduce((acc, d) => acc + d.min, 0);
  const avgMin = Math.round(totalMin / week.length);
  const sortiesWeek = week.reduce((acc, d) => acc + (stepsOf(d) > 0 ? Math.ceil(stepsOf(d) / 1200) : 0), 0);
  const sortiesAvg = (sortiesWeek / week.length).toFixed(1).replace(".", ",");

  const days = week.map((d, i) => (
    <li key={i} className={`${d.min ? "walked" : ""}${d.today ? " today" : ""}`}>
      <span className="ini" aria-hidden="true">{INITIALS[d.dow]}</span>
      <span className="tick" aria-hidden="true">{d.min ? <CheckIcon /> : null}</span>
      <span className="sr-only">{DAY[d.dow]}{d.today ? ", aujourd'hui" : ""} : {d.min ? "marche faite" : "pas de marche"}</span>
    </li>
  ));

  const trio = pasMode ? (
    <div className="week-trio">
      <WeekTotalCard
        icon={<StepsIcon className="kpi-total-ico" />}
        label="Total pas"
        value={isNew ? "–" : nf(totalSteps)}
        days={days}
        href="/activite/pas"
        ariaLabel="Voir le détail des pas sur 7 jours"
      />
      <div className="pair">
        <MetricCard
          icon={<StepsIcon className="metric-card-ico" />}
          label="Moyenne pas"
          value={isNew ? "–" : nf(Math.round(totalSteps / week.length))}
          unit="par jour"
        />
        <MetricCard
          icon={<TargetIcon className="metric-card-ico" />}
          label="Durée totale"
          value={isNew ? "–" : nf(Math.round(totalSteps / STEP_MIN))}
          unit="min"
        />
      </div>
    </div>
  ) : goalMetric === "sorties" ? (
    <div className="week-trio">
      <WeekTotalCard
        icon={<RouteIcon className="kpi-total-ico" />}
        label="Total sorties"
        value={isNew ? "–" : nf(sortiesWeek)}
        days={days}
      />
      <div className="pair">
        <MetricCard
          icon={<RouteIcon className="metric-card-ico" />}
          label="Moyenne sorties"
          value={isNew ? "–" : sortiesAvg}
          unit="sorties par jour"
        />
        <MetricCard
          icon={<TargetIcon className="metric-card-ico" />}
          label="Durée totale"
          value={isNew ? "–" : nf(Math.round(totalSteps / STEP_MIN))}
          unit="min"
        />
      </div>
    </div>
  ) : (
    <div className="week-trio">
      <WeekTotalCard
        icon={<TargetIcon className="kpi-total-ico" />}
        label="Temps total"
        value={isNew ? "–" : <>{nf(totalMin)} <small>min</small></>}
        days={days}
        href="/activite/pas"
        ariaLabel="Voir le détail des pas sur 7 jours"
      />
      <div className="pair">
        <MetricCard
          icon={<TargetIcon className="metric-card-ico" />}
          label="Temps moyen"
          value={isNew ? "–" : nf(avgMin)}
          unit="min par jour"
        />
        <MetricCard
          icon={<RouteIcon className="metric-card-ico" />}
          label="Nb de sorties"
          value={isNew ? "–" : nf(sortiesWeek)}
          unit="au total"
        />
      </div>
    </div>
  );

  return (
    <section className="screen">
      <header className="app-header">
        <Link className="icon-btn" href="/profile" aria-label="Mon profil">
          <UserIcon />
        </Link>
        <div className="header-icons">
          <button
            className={`icon-btn${syncing ? " is-syncing" : ""}`}
            type="button"
            disabled={!pedo || syncing}
            aria-label={syncing ? "Relevé des pas en cours" : syncDone ? "Relevé terminé" : "Relever les pas du podomètre"}
            onClick={handleQuickSync}
          >
            {syncDone ? <CheckIcon /> : <SyncIcon />}
          </button>
          <Link className="icon-btn" href="/podometre" aria-label={`Podomètre : ${pedo ? "connecté" : "non connecté"}`}>
            <PedometerIcon />
            {pedo && <span className="badge-dot" aria-hidden="true" />}
          </Link>
          <Link className="icon-btn" href="/settings" aria-label="Réglages">
            <SettingsIcon />
          </Link>
        </div>
      </header>
      <div className="hello-row">
        <div className="hello">
          <p className="date">{dateLabel}</p>
          <h1 tabIndex={-1}>{name ? `Bonjour ${name}` : "Bonjour"}</h1>
        </div>
      </div>

      <GoalCard
        value={capValue}
        message={capMsg}
        badge={capBadge}
        emptyText={goalMetric === "sorties" ? "Aucun pas aujourd'hui" : "Aucune sortie aujourd'hui"}
      />

      {isNew && (
        <div className="card empty-card">
          <p className="kv-label">Pas encore de marche</p>
          <p className="small">Vos pas, distances et ressentis apparaîtront ici après votre première balade.</p>
        </div>
      )}

      <h2 className="sec-title">Hier</h2>
      <div className="stats3">
        {pasMode ? <>{cardPas}{cardSorties}</> : <>{cardSorties}{cardPas}</>}
      </div>

      <h2 className="sec-title">Les 7 derniers jours</h2>
      {trio}

      <section className="row">
        <h2 className="sec-title">Idées de balades</h2>
        <div className="ch-list">
          {BAL_PARCOURS.slice(0, 2).map((p) => <SoloBaladeCard p={p} key={p.id} />)}
          {BAL_CRENEAUX.slice(0, 1).map((c) => {
            const p = balParcours(c.parcoursId);
            return p ? <GroupeBaladeCard c={c} p={p} key={c.id} /> : null;
          })}
        </div>
        <Link className="btn quiet home-more-link" href="/balades">Voir plus de balades</Link>
      </section>

      <section className="row">
        <h2 className="sec-title row-title">
          Conseils pour la marche
          <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </h2>
        <div className="tip-list">
          {PARC_ROWS.tips.map((tip, i) => (
            tip.t === "Marcher par temps chaud" || tip.t === "Respirer en marchant" ? null : (
              <TipCard
                key={i}
                photo={tip.photo}
                title={tip.t}
                href={`/parcourir/tips/${i}`}
                horizontal
              />
            )
          ))}
        </div>
        <Link className="btn quiet home-more-link" href="/parcourir">
          Voir plus de conseils
        </Link>
      </section>
    </section>
  );
}
