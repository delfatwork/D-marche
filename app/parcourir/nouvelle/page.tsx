"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppState } from "@/app/lib/app-state";
import { BackIcon, SettingsIcon } from "@/app/components/icons";
import { DC_THEMES } from "@/app/lib/parcourir-data";

export default function NouvelleDCartePage() {
  const router = useRouter();
  const { submitDCarte } = useAppState();
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit() {
    const t = title.trim();
    const body = text.trim();
    if (!t || !theme || !body) {
      setError(true);
      return;
    }
    submitDCarte(t, theme, body);
    router.push("/parcourir");
  }

  return (
    <section className="screen">
      <div className="topbar">
        <Link className="back" href="/parcourir">
          <BackIcon />
          <span>Annuler</span>
        </Link>
        <p className="steps">Nouvelle D-carte</p>
        <Link className="icon-btn" href="/settings" aria-label="Réglages"><SettingsIcon /></Link>
      </div>
      <h1 tabIndex={-1}>Créer une D-carte</h1>
      <label className="field">
        Titre
        <input
          type="text"
          maxLength={40}
          placeholder="Par exemple : Respirer en marchant"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <fieldset className="choices" aria-labelledby="dc-theme-t">
        <legend id="dc-theme-t" className="kv-label">Thème</legend>
        {DC_THEMES.map((t) => (
          <label className="choice row" key={t.key}>
            <input type="radio" name="dc-theme" value={t.key} checked={theme === t.key} onChange={() => setTheme(t.key)} />
            <span><strong>{t.label}</strong></span>
          </label>
        ))}
      </fieldset>
      <label className="field">
        Votre conseil
        <textarea
          maxLength={200}
          rows={4}
          placeholder="Un conseil simple, en quelques phrases."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <p className="small">Évitez les conseils médicaux. En cas de douleur, consultez un professionnel de santé.</p>
      {error && <p className="error" role="alert">Ajoutez un titre, un thème et un conseil pour soumettre.</p>}
      <div className="actions">
        <button className="btn primary" type="button" onClick={handleSubmit}>Soumettre pour relecture</button>
      </div>
    </section>
  );
}
