"use client";

import { useEffect, useRef, useState } from "react";

const SMS_CODE = "123456";

export default function AuthCodeStep({
  title,
  message,
  confirmLabel,
  confirmDanger,
  onVerified,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  confirmDanger?: boolean;
  onVerified: () => void;
  onCancel: () => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function sendSimulated() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCode(SMS_CODE), 1200);
  }

  useEffect(() => {
    sendSimulated();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleVerify() {
    if (code.trim() !== SMS_CODE) {
      setError(true);
      return;
    }
    setError(false);
    onVerified();
  }

  return (
    <>
      <h1 tabIndex={-1}>{title}</h1>
      <p className="muted">{message}</p>
      <label className="field">
        Code reçu par SMS
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </label>
      <p className="small">Le code est détecté automatiquement depuis le SMS.</p>
      {error && <p className="error" role="alert">Code incorrect. Vérifiez le SMS reçu.</p>}
      <div className="actions">
        <button className={`btn ${confirmDanger ? "danger" : "primary"}`} type="button" onClick={handleVerify}>
          {confirmLabel}
        </button>
        <button
          className="btn quiet"
          type="button"
          onClick={() => {
            setCode("");
            setError(false);
            sendSimulated();
          }}
        >
          Renvoyer le code
        </button>
        <button className="btn quiet" type="button" onClick={onCancel}>Annuler</button>
      </div>
    </>
  );
}
