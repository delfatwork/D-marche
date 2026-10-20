"use client";

import Link from "next/link";
import { useAppState, type TextSize } from "@/app/lib/app-state";
import { BackIcon } from "@/app/components/icons";
import Switch from "@/app/components/Switch";

const TEXT_SIZES: { key: TextSize; label: string; sample: string }[] = [
  { key: "normal", label: "Normale", sample: "1rem" },
  { key: "large", label: "Grande", sample: "1.2rem" },
  { key: "xlarge", label: "Très grande", sample: "1.4rem" },
];

export default function SettingsPage() {
  const { textSize, contrast, motion, setTextSize, setContrast, setMotion } = useAppState();

  return (
    <section className="screen">
      <div className="topbar pas-top">
        <Link className="back pas-back" href="/">
          <BackIcon />
          <span>Retour</span>
        </Link>
        <h1 tabIndex={-1}>Réglages</h1>
        <span className="help-btn balance" aria-hidden="true">Aide</span>
      </div>
      <div className="group">
        <h2>Lecture</h2>
        <fieldset className="group" aria-labelledby="ts-t">
          <p id="ts-t" style={{ fontWeight: 700 }}>Taille du texte</p>
          <div className="segments">
            {TEXT_SIZES.map((t) => (
              <label className="seg" key={t.key}>
                <input
                  type="radio"
                  name="textsize"
                  value={t.key}
                  checked={textSize === t.key}
                  onChange={() => setTextSize(t.key)}
                />
                <span>
                  <span aria-hidden="true" style={{ fontSize: t.sample }}>Aa</span>
                  {t.label}
                </span>
              </label>
            ))}
          </div>
          <p className="preview">Aperçu : marcher à votre rythme, pas à pas.</p>
        </fieldset>
        <Switch
          id="contrast"
          label="Contraste élevé"
          desc="Texte noir sur fond blanc, contours renforcés."
          checked={contrast}
          onChange={setContrast}
        />
        <Switch
          id="motion"
          label="Réduire les animations"
          desc="Les éléments bougent le moins possible."
          checked={motion}
          onChange={setMotion}
        />
      </div>
    </section>
  );
}
