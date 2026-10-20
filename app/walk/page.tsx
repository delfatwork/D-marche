"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppState } from "@/app/lib/app-state";
import { BackIcon } from "@/app/components/icons";
import Trail from "@/app/components/Trail";
import { fmtTimer, spokenDuration } from "@/app/lib/format";

const GOAL_MIN = 10;

export default function WalkPage() {
  const router = useRouter();
  const { addWalkMinutes, recordWalkStart } = useAppState();
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    recordWalkStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  function handleEnd() {
    setRunning(false);
    const minutes = elapsed ? Math.max(1, Math.round(elapsed / 60)) : 0;
    if (minutes > 0) addWalkMinutes(minutes);
    router.push("/");
  }

  const goalS = GOAL_MIN * 60;
  const reachedGoal = elapsed >= goalS;

  return (
    <section className="screen">
      <div className="topbar pas-top">
        <Link className="back pas-back" href="/">
          <BackIcon />
          <span>Retour</span>
        </Link>
        <h1 tabIndex={-1}>Bonne marche</h1>
        <span className="help-btn balance" aria-hidden="true">Aide</span>
      </div>
      <p className={`walk-status${running ? "" : " paused"}`} aria-live="polite">
        {running ? "Marche en cours" : "En pause"}
      </p>
      <div>
        <p className="timer" role="timer" aria-live="off" aria-label={`Temps de marche : ${spokenDuration(elapsed)}`}>
          {fmtTimer(elapsed)}
        </p>
        <p className="timer-sub">
          {reachedGoal ? `Durée prévue de ${GOAL_MIN} minutes atteinte` : `Sur ${GOAL_MIN} minutes prévues`}
        </p>
      </div>
      <Trail progress={elapsed / goalS} />
      <p className="muted" style={{ textAlign: "center" }}>
        {reachedGoal
          ? "Vous avez marché le temps prévu. Vous pouvez continuer ou terminer, comme vous le sentez."
          : "Marchez à votre rythme. Vous pouvez faire une pause à tout moment."}
      </p>
      <div className="actions">
        <button className="btn primary" type="button" onClick={() => setRunning((r) => !r)}>
          {running ? "Faire une pause" : "Reprendre la marche"}
        </button>
        <button className="btn secondary" type="button" onClick={handleEnd}>
          Terminer la marche
        </button>
        <p className="small" style={{ textAlign: "center" }}>
          Une douleur, un vertige&nbsp;? Arrêtez-vous et asseyez-vous.
        </p>
      </div>
    </section>
  );
}
