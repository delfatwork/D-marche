"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/app/lib/app-state";
import { BackIcon } from "@/app/components/icons";
import DeviceScanner from "@/app/components/DeviceScanner";
import { DEVICE_INFO } from "@/app/lib/onboarding-data";

export default function PodometrePage() {
  const { pedo, lastSync, setPedo, recordSync } = useAppState();
  const [syncing, setSyncing] = useState(false);
  const info = pedo ? DEVICE_INFO[pedo] : null;

  function handleSync() {
    if (!pedo || syncing) return;
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      recordSync();
    }, 2000);
  }

  return (
    <section className="screen">
      <div className="topbar pas-top">
        <Link className="icon-btn pas-back" href="/" aria-label="Retour à l'accueil">
          <BackIcon />
        </Link>
        <h1 tabIndex={-1}>Podomètre</h1>
        <span className="help-btn balance" aria-hidden="true">Aide</span>
      </div>

      <div className="card pedo-status">
        <p><span className={`badge${pedo ? " ok" : ""}`}>{pedo ? "Connecté" : "Non connecté"}</span></p>
        <p className="dc-name">{pedo ?? "Aucun appareil"}</p>
        {pedo && info ? (
          <ul className="bal-facts">
            <li>Modèle : {info.model}</li>
            <li>Version du logiciel : {info.fw}</li>
            <li>Batterie : {info.battery} %</li>
            <li>Signal Bluetooth : {info.signal}</li>
          </ul>
        ) : (
          <p className="small">Connectez un podomètre pour compter vos pas automatiquement.</p>
        )}
      </div>

      <div className="card">
        <p className="kv-label">Relevé des pas</p>
        <p>Dernier relevé : <strong>{lastSync ?? "jamais"}</strong></p>
        {pedo ? (
          <div className="bal-actions">
            <button className="btn primary walk-btn" type="button" onClick={handleSync} disabled={syncing}>
              {syncing ? "Relevé en cours…" : "Relever les pas maintenant"}
            </button>
            <button className="btn secondary walk-btn" type="button" onClick={() => setPedo(null)}>
              Déconnecter l&apos;appareil
            </button>
          </div>
        ) : (
          <DeviceScanner onConnected={setPedo} />
        )}
      </div>
    </section>
  );
}
