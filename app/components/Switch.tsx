"use client";

type SwitchProps = {
  id: string;
  label: string;
  desc: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function Switch({ id, label, desc, checked, onChange }: SwitchProps) {
  return (
    <div className="setting">
      <div>
        <span className="setting-label" id={`l-${id}`}>{label}</span>
        <span className="desc" id={`d-${id}`}>{desc}</span>
      </div>
      <button
        type="button"
        className="switch"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`l-${id}`}
        aria-describedby={`d-${id}`}
        onClick={() => onChange(!checked)}
      >
        <span className="knob" aria-hidden="true" />
        <span className="sw-text" aria-hidden="true">{checked ? "Activé" : "Désactivé"}</span>
      </button>
    </div>
  );
}
