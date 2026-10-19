"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppState } from "@/app/lib/app-state";
import { BackIcon } from "@/app/components/icons";
import AuthCodeStep from "@/app/components/AuthCodeStep";
import { GOAL_METRICS, LEVELS, type LevelKey } from "@/app/lib/onboarding-data";
import { nf } from "@/app/lib/format";

function phoneValid(phone: string) {
  return phone.replace(/\D/g, "").length >= 10;
}

export default function ProfilePage() {
  const router = useRouter();
  const {
    hydrated,
    onboarded,
    name,
    phone,
    userId,
    level,
    goalMetric,
    setLevel,
    setGoalMetric,
    setPhone,
    logout,
    deleteAccount,
    clearData,
  } = useAppState();

  const [editingPhone, setEditingPhone] = useState(false);
  const [phoneDraft, setPhoneDraft] = useState(phone);
  const [phoneError, setPhoneError] = useState(false);

  const [editingGoal, setEditingGoal] = useState(false);
  const [goalDraft, setGoalDraft] = useState<LevelKey>(level || "doux");

  const [confirmClear, setConfirmClear] = useState(false);

  const [deleteStep, setDeleteStep] = useState<"start" | "ack" | "code">("start");
  const [ackChecked, setAckChecked] = useState(false);
  const [ackError, setAckError] = useState(false);

  useEffect(() => {
    if (hydrated && !onboarded) router.replace("/onboarding");
  }, [hydrated, onboarded, router]);

  if (!hydrated || !onboarded) return null;

  const initial = (name || "?").charAt(0).toUpperCase();
  const digits = phone.replace(/\D/g, "");
  const maskedPhone = digits ? "•• •• •• " + digits.slice(-4) : "Numéro non renseigné";
  const lvl = LEVELS[level || "doux"];

  if (deleteStep === "code") {
    return (
      <section className="screen">
        <AuthCodeStep
          title="Confirmez par SMS"
          message={`Pour votre sécurité, saisissez le code envoyé au •• •• •• ${digits.slice(-4)} avant de supprimer votre compte.`}
          confirmLabel="Supprimer définitivement"
          confirmDanger
          onCancel={() => setDeleteStep("start")}
          onVerified={() => {
            deleteAccount();
            router.push("/onboarding");
          }}
        />
      </section>
    );
  }

  return (
    <section className="screen">
      <div className="topbar pas-top">
        <Link className="icon-btn pas-back" href="/" aria-label="Retour à l'accueil">
          <BackIcon />
        </Link>
        <h1 tabIndex={-1}>Profil</h1>
        <span className="help-btn balance" aria-hidden="true">Aide</span>
      </div>

      <div className="card profile-id">
        <div className="avatar" aria-hidden="true">{initial}</div>
        <div>
          <p className="profile-name">{name || "Sans nom"}</p>
          <p className="small">{maskedPhone}</p>
          {userId && <p className="small">ID utilisateur : <strong>{userId}</strong></p>}
          {editingPhone ? (
            <>
              <label className="field">
                Nouveau numéro de téléphone
                <input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="06 12 34 56 78"
                  value={phoneDraft}
                  onChange={(e) => setPhoneDraft(e.target.value)}
                />
              </label>
              {phoneError && <p className="error" role="alert">Indiquez un numéro de téléphone valide.</p>}
              <button
                className="btn primary walk-btn"
                type="button"
                onClick={() => {
                  if (!phoneValid(phoneDraft)) {
                    setPhoneError(true);
                    return;
                  }
                  setPhone(phoneDraft.trim());
                  setPhoneError(false);
                  setEditingPhone(false);
                }}
              >
                Enregistrer
              </button>
              <button className="btn quiet" type="button" onClick={() => setEditingPhone(false)}>Annuler</button>
            </>
          ) : (
            <button className="btn secondary walk-btn" type="button" onClick={() => { setPhoneDraft(phone); setEditingPhone(true); }}>
              Changer de numéro
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <p className="kv-label">Mon parcours</p>
        <p><strong>{lvl.title}</strong></p>
        <p className="small">Objectif : {nf(lvl.steps)} pas par jour</p>
        {editingGoal ? (
          <>
            <fieldset className="choices" aria-label="Changer de parcours">
              {Object.entries(LEVELS).map(([k, v]) => (
                <label className="choice" key={k}>
                  <input
                    type="radio"
                    name="goal-level"
                    value={k}
                    checked={goalDraft === k}
                    onChange={() => setGoalDraft(k as LevelKey)}
                  />
                  <span><strong>{v.title}</strong><span className="desc">{v.desc}</span></span>
                </label>
              ))}
            </fieldset>
            <button
              className="btn primary walk-btn"
              type="button"
              onClick={() => {
                setLevel(goalDraft);
                setEditingGoal(false);
              }}
            >
              Enregistrer
            </button>
            <button className="btn quiet" type="button" onClick={() => setEditingGoal(false)}>Annuler</button>
          </>
        ) : (
          <button className="btn secondary walk-btn" type="button" onClick={() => { setGoalDraft(level || "doux"); setEditingGoal(true); }}>
            Changer mes objectifs
          </button>
        )}
      </div>

      <fieldset className="card profile-goal-metric" aria-labelledby="pgm-t">
        <legend id="pgm-t" className="kv-label">Mesure de mon objectif</legend>
        <div className="choices">
          {GOAL_METRICS.map((m) => (
            <label className="choice" key={m.key}>
              <input
                type="radio"
                name="goal-metric"
                value={m.key}
                checked={goalMetric === m.key}
                onChange={() => setGoalMetric(m.key)}
              />
              <span><strong>{m.label}</strong><span className="desc">{m.desc}</span></span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="card">
        <p className="kv-label">Mes données</p>
        <p className="small">Vos marches (durée, ressenti, nombre de pas) sont conservées uniquement sur ce téléphone. Elles ne sont ni envoyées ni partagées.</p>
        {confirmClear ? (
          <div className="inline-confirm" role="group" aria-label="Confirmer l'effacement">
            <p style={{ fontWeight: 700 }}>Effacer toutes vos marches enregistrées sur ce téléphone&nbsp;? Cette action est définitive.</p>
            <button className="btn primary" type="button" onClick={() => { clearData(); setConfirmClear(false); }}>Oui, effacer</button>
            <button className="btn secondary" type="button" onClick={() => setConfirmClear(false)}>Annuler</button>
          </div>
        ) : (
          <button className="btn secondary" type="button" onClick={() => setConfirmClear(true)}>Effacer mes données</button>
        )}
      </div>

      <button
        className="btn secondary"
        type="button"
        onClick={() => {
          logout();
          router.push("/onboarding");
        }}
      >
        Se déconnecter
      </button>

      {deleteStep === "ack" ? (
        <div className="card">
          <p>Cette action est définitive. Vos marches, vos défis et vos D-cartes seront effacés de cet appareil.</p>
          <label className="choice row">
            <input type="checkbox" checked={ackChecked} onChange={(e) => setAckChecked(e.target.checked)} />
            <span><strong>Je comprends que c&apos;est définitif</strong></span>
          </label>
          {ackError && <p className="error" role="alert">Cochez la case pour continuer.</p>}
          <button
            className="btn danger"
            type="button"
            onClick={() => {
              if (!ackChecked) {
                setAckError(true);
                return;
              }
              setAckError(false);
              setDeleteStep("code");
            }}
          >
            Recevoir un code par SMS
          </button>
          <button className="btn quiet" type="button" onClick={() => setDeleteStep("start")}>Annuler</button>
        </div>
      ) : (
        <button className="btn danger" type="button" onClick={() => { setAckChecked(false); setAckError(false); setDeleteStep("ack"); }}>
          Supprimer mon compte
        </button>
      )}
    </section>
  );
}
