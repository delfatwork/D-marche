"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BackIcon, CheckIcon } from "@/app/components/icons";
import Switch from "@/app/components/Switch";
import DeviceScanner from "@/app/components/DeviceScanner";
import AuthCodeStep from "@/app/components/AuthCodeStep";
import { GOAL_METRICS, LEVELS, type LevelKey } from "@/app/lib/onboarding-data";
import { useAppState } from "@/app/lib/app-state";

type AuthFlow = "none" | "signup-form" | "signup-otp" | "login-form" | "login-otp";

function phoneValid(phone: string) {
  return phone.replace(/\D/g, "").length >= 10;
}

function last2(phone: string) {
  return phone.replace(/\D/g, "").slice(-2);
}

const OB_TOTAL = 5;

function ObHeader({ step, onBack }: { step: number; onBack?: () => void }) {
  return (
    <>
      <div className="topbar">
        {onBack && (
          <button className="back" type="button" onClick={onBack}>
            <BackIcon />
            <span>Retour</span>
          </button>
        )}
        <p className="steps">Étape {step} sur {OB_TOTAL}</p>
      </div>
      <div className="dots" aria-hidden="true">
        {Array.from({ length: OB_TOTAL }, (_, i) => (
          <span key={i} className={i < step ? "on" : ""} />
        ))}
      </div>
    </>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const {
    level,
    goalMetric,
    notif1,
    locAuth,
    pedo,
    setLevel,
    setGoalMetric,
    setNotif1,
    setLocAuth,
    setPedo,
    finishOnboarding,
    completeSignup,
    completeLogin,
  } = useAppState();
  const [obStep, setObStep] = useState(0);
  const [obError, setObError] = useState(false);

  const [authFlow, setAuthFlow] = useState<AuthFlow>("none");
  const [signupName, setSignupName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [loginName, setLoginName] = useState("");
  const [loginPhone, setLoginPhone] = useState("");
  const [signupPhoneError, setSignupPhoneError] = useState(false);
  const [signupAttempt, setSignupAttempt] = useState(0);
  const [loginPhoneError, setLoginPhoneError] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState(0);
  const signupPhoneRef = useRef<HTMLInputElement>(null);
  const loginPhoneRef = useRef<HTMLInputElement>(null);

  function handleBack() {
    setObError(false);
    setObStep((s) => Math.max(0, s - 1));
  }

  function handleNext() {
    if (obStep === 1 && !level) {
      setObError(true);
      return;
    }
    setObError(false);
    setObStep((s) => s + 1);
  }

  function handleFinish() {
    finishOnboarding();
    router.push("/");
  }

  if (obStep === 0) {
    if (authFlow === "signup-form") {
      return (
        <section className="screen ob ob-arc">
          <div className="topbar">
            <button className="back" type="button" onClick={() => setAuthFlow("none")}>
              <BackIcon />
              <span>Annuler</span>
            </button>
          </div>
          <h1 tabIndex={-1}>Créer un compte</h1>
          <p className="muted">Quelques informations suffisent pour commencer.</p>
          <label className="field">
            <span>Prénom<span className="req" aria-hidden="true"> *</span></span>
            <span className="field-input">
              <input
                type="text"
                autoComplete="given-name"
                placeholder="Ex. Jeanne"
                required
                aria-required="true"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
              {signupName.trim() && <span className="field-ok" aria-hidden="true"><CheckIcon /></span>}
            </span>
          </label>
          <label className="field">
            <span>Numéro de téléphone<span className="req" aria-hidden="true"> *</span></span>
            <span className="field-input">
              <input
                ref={signupPhoneRef}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="Ex. 06 12 34 56 78"
                required
                aria-required="true"
                aria-invalid={signupPhoneError ? "true" : "false"}
                aria-describedby={signupPhoneError ? "signup-phone-error" : undefined}
                value={signupPhone}
                onChange={(e) => {
                  setSignupPhone(e.target.value);
                  if (signupPhoneError) setSignupPhoneError(false);
                }}
              />
              {phoneValid(signupPhone) && <span className="field-ok" aria-hidden="true"><CheckIcon /></span>}
            </span>
          </label>
          {signupPhoneError && (
            <p className="error" id="signup-phone-error" role="alert" key={signupAttempt}>
              Entrez un numéro de téléphone valide (10 chiffres minimum).
            </p>
          )}
          <div className="actions">
            <button
              className="btn primary"
              type="button"
              disabled={!signupName.trim() || !signupPhone.trim()}
              onClick={() => {
                if (!phoneValid(signupPhone)) {
                  setSignupPhoneError(true);
                  setSignupAttempt((n) => n + 1);
                  signupPhoneRef.current?.focus();
                  return;
                }
                setSignupPhoneError(false);
                setAuthFlow("signup-otp");
              }}
            >
              Continuer
            </button>
          </div>
        </section>
      );
    }

    if (authFlow === "signup-otp") {
      return (
        <section className="screen ob ob-arc">
          <AuthCodeStep
            title="Entrez le code"
            message={`Un code à 6 chiffres vient d'être envoyé par SMS au •• •• •• ${last2(signupPhone)}.`}
            confirmLabel="Valider"
            onCancel={() => setAuthFlow("signup-form")}
            onVerified={() => {
              completeSignup(signupName.trim(), signupPhone.trim());
              setAuthFlow("none");
              setObStep(1);
            }}
          />
        </section>
      );
    }

    if (authFlow === "login-form") {
      return (
        <section className="screen ob ob-arc">
          <div className="topbar">
            <button className="back" type="button" onClick={() => setAuthFlow("none")}>
              <BackIcon />
              <span>Annuler</span>
            </button>
          </div>
          <h1 tabIndex={-1}>Connexion</h1>
          <p className="muted">Entrez votre numéro. Nous vous enverrons un code à usage unique par SMS.</p>
          <label className="field">
            <span>Prénom<span className="req" aria-hidden="true"> *</span></span>
            <span className="field-input">
              <input
                type="text"
                autoComplete="given-name"
                placeholder="Ex. Jeanne"
                required
                aria-required="true"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
              />
              {loginName.trim() && <span className="field-ok" aria-hidden="true"><CheckIcon /></span>}
            </span>
          </label>
          <label className="field">
            <span>Numéro de téléphone<span className="req" aria-hidden="true"> *</span></span>
            <span className="field-input">
              <input
                ref={loginPhoneRef}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="Ex. 06 12 34 56 78"
                required
                aria-required="true"
                aria-invalid={loginPhoneError ? "true" : "false"}
                aria-describedby={loginPhoneError ? "login-phone-error" : undefined}
                value={loginPhone}
                onChange={(e) => {
                  setLoginPhone(e.target.value);
                  if (loginPhoneError) setLoginPhoneError(false);
                }}
              />
              {phoneValid(loginPhone) && <span className="field-ok" aria-hidden="true"><CheckIcon /></span>}
            </span>
          </label>
          {loginPhoneError && (
            <p className="error" id="login-phone-error" role="alert" key={loginAttempt}>
              Entrez un numéro de téléphone valide (10 chiffres minimum).
            </p>
          )}
          <div className="actions">
            <button
              className="btn primary"
              type="button"
              disabled={!loginName.trim() || !loginPhone.trim()}
              onClick={() => {
                if (!phoneValid(loginPhone)) {
                  setLoginPhoneError(true);
                  setLoginAttempt((n) => n + 1);
                  loginPhoneRef.current?.focus();
                  return;
                }
                setLoginPhoneError(false);
                setAuthFlow("login-otp");
              }}
            >
              Recevoir le code par SMS
            </button>
          </div>
        </section>
      );
    }

    if (authFlow === "login-otp") {
      return (
        <section className="screen ob ob-arc">
          <AuthCodeStep
            title="Entrez le code"
            message={`Un code à 6 chiffres vient d'être envoyé par SMS au •• •• •• ${last2(loginPhone)}.`}
            confirmLabel="Valider"
            onCancel={() => setAuthFlow("login-form")}
            onVerified={() => {
              completeLogin(loginName.trim(), loginPhone.trim());
              router.push("/");
            }}
          />
        </section>
      );
    }

    return (
      <section className="screen ob welcome">
        <div className="ob-hero">
          <img className="ob-logo" src="/onboarding/logo-walk.svg" alt="" width={91} height={120} />
          <h1 className="ob-title" tabIndex={-1}>
            Un petit pas de plus au&nbsp;quotidien, <span className="ob-title-light">un&nbsp;grand pas<br />pour votre santé</span>
          </h1>
        </div>
        <div className="actions">
          <button
            className="btn primary"
            type="button"
            onClick={() => {
              setSignupPhoneError(false);
              setAuthFlow("signup-form");
            }}
          >
            Créer un compte
          </button>
          <button
            className="btn quiet"
            type="button"
            onClick={() => {
              setLoginPhoneError(false);
              setAuthFlow("login-form");
            }}
          >
            Connexion
          </button>
        </div>
      </section>
    );
  }

  if (obStep === 1) {
    return (
      <section className="screen ob ob-arc">
        <ObHeader step={1} />
        <h1 id="ob-t" tabIndex={-1}>Quel rythme vous convient le mieux&nbsp;?</h1>
        <fieldset className="choices" aria-labelledby="ob-t">
          {Object.entries(LEVELS).map(([k, v]) => (
            <label className="choice" key={k}>
              <input
                type="radio"
                name="level"
                value={k}
                checked={level === k}
                onChange={() => setLevel(k as LevelKey)}
              />
              <span>
                <strong>{v.title}</strong>
                <span className="desc">{v.desc}</span>
              </span>
            </label>
          ))}
        </fieldset>
        {obError && <p className="error" role="alert">Choisissez un objectif pour continuer.</p>}
        <div className="actions">
          <button className="btn primary" type="button" onClick={handleNext}>Continuer</button>
        </div>
      </section>
    );
  }

  if (obStep === 2) {
    return (
      <section className="screen ob ob-arc">
        <ObHeader step={2} onBack={handleBack} />
        <h1 id="gm-t" tabIndex={-1}>Comment observer votre évolution&nbsp;?</h1>
        <fieldset className="choices" aria-labelledby="gm-t">
          {GOAL_METRICS.map((m) => (
            <label className="choice" key={m.key}>
              <input
                type="radio"
                name="goal-metric"
                value={m.key}
                checked={goalMetric === m.key}
                onChange={() => setGoalMetric(m.key)}
              />
              <span>
                <strong>{m.label}</strong>
                <span className="desc">{m.desc}</span>
              </span>
            </label>
          ))}
        </fieldset>
        <div className="actions">
          <button className="btn primary" type="button" onClick={handleNext}>Continuer</button>
        </div>
      </section>
    );
  }

  if (obStep === 3) {
    return (
      <section className="screen ob ob-arc">
        <ObHeader step={3} onBack={handleBack} />
        <h1 tabIndex={-1}>Connectons votre podomètre</h1>
        {pedo ? (
          <>
            <div className="card device-ok" role="status">
              <span className="ok-ico" aria-hidden="true"><CheckIcon /></span>
              <p><strong>Podomètre connecté</strong></p>
              <p className="small">{pedo} · le relevé automatique de vos pas est activé.</p>
            </div>
            <div className="actions">
              <button className="btn primary" type="button" onClick={handleNext}>Continuer</button>
            </div>
          </>
        ) : (
          <DeviceScanner onConnected={setPedo} />
        )}
      </section>
    );
  }

  return (
    <section className="screen ob ob-arc">
      <ObHeader step={4} onBack={handleBack} />
      <h1 tabIndex={-1}>Pour entretenir votre motivation</h1>
      <Switch
        id="notif1"
        label="Rappels de motivation"
        desc="Conseils et astuces pour marcher, au plus une fois par jour."
        checked={notif1}
        onChange={setNotif1}
      />
      <Switch
        id="locAuth"
        label="Accord pour la géolocalisation"
        desc="Autour de vous : voir les balades près de chez vous. Modifiable à tout moment."
        checked={locAuth}
        onChange={setLocAuth}
      />
      <p className="small">Vous pouvez tout refuser. L'application reste utilisable.</p>
      <div className="actions">
        <button className="btn primary" type="button" onClick={handleFinish}>Valider mes choix</button>
      </div>
    </section>
  );
}
