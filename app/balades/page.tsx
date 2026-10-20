"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/app/lib/app-state";
import { FilterIcon, SearchIcon, SettingsIcon, TargetIcon } from "@/app/components/icons";
import { GroupeBaladeCard, SoloBaladeCard } from "@/app/components/BaladeCards";
import Sheet from "@/app/components/Sheet";
import {
  BAL_CRENEAUX,
  BAL_LIEUX,
  BAL_PARCOURS,
  balCountCity,
  balParcours,
  type Creneau,
  type Parcours,
} from "@/app/lib/balades-data";

type Mode = "all" | "solo" | "groupe";
type Diff = "all" | "pour-tous" | "moderee" | "soutenue";

function diffOk(p: Parcours, diff: Diff) {
  if (diff === "all") return true;
  if (diff === "pour-tous") return p.hard === 0;
  if (diff === "moderee") return p.hard === 1;
  return p.hard >= 2;
}

function filterResults(mode: Mode, diff: Diff, cityQuery: string) {
  const known = cityQuery ? BAL_LIEUX.filter((v) => v.toLowerCase().includes(cityQuery.toLowerCase())) : [];
  const byCity = cityQuery.length > 0 && known.length > 0;
  const noMatch = cityQuery.length > 0 && known.length === 0;
  const cityOk = (ville: string) => noMatch || !byCity || known.includes(ville);
  const solos = mode !== "groupe" ? BAL_PARCOURS.filter((p) => cityOk(p.ville) && diffOk(p, diff)) : [];
  const groupes =
    mode !== "solo"
      ? BAL_CRENEAUX.filter((c) => {
          const p = balParcours(c.parcoursId);
          return !!p && cityOk(p.ville) && diffOk(p, diff);
        })
      : [];
  return { solos, groupes, known, byCity, noMatch };
}

export default function BaladesPage() {
  const { locAuth, setLocAuth } = useAppState();
  const [mode, setMode] = useState<Mode>("all");
  const [diff, setDiff] = useState<Diff>("all");
  const [cityQuery, setCityQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const geoOn = locAuth && !cityQuery;
  const { solos, groupes, known, byCity, noMatch } = filterResults(mode, diff, cityQuery);
  const n = solos.length + groupes.length;
  const where = byCity ? `à ${known[0]}` : geoOn ? "dans un rayon de 10 km" : "";
  const active = (mode !== "all" ? 1 : 0) + (diff !== "all" ? 1 : 0);
  const diffLabel = diff === "pour-tous" ? "Pour tous" : diff === "moderee" ? "Modérée" : diff === "soutenue" ? "Soutenue" : "";

  function countFor(m: Mode, d: Diff) {
    const r = filterResults(m, d, cityQuery);
    return r.solos.length + r.groupes.length;
  }

  function commit(city: string) {
    setCityQuery(city);
    setDraft("");
    setShowSuggest(false);
    if (!city) setLocAuth(true);
  }

  const rows: (
    | { kind: "solo"; p: Parcours }
    | { kind: "groupe"; c: Creneau; p: Parcours }
  )[] = [];
  const maxLen = Math.max(solos.length, groupes.length);
  for (let i = 0; i < maxLen; i++) {
    if (solos[i]) rows.push({ kind: "solo", p: solos[i] });
    const c = groupes[i];
    if (c) {
      const p = balParcours(c.parcoursId);
      if (p) rows.push({ kind: "groupe", c, p });
    }
  }

  return (
    <section className="screen">
      <div className="topbar pas-top tab-top">
        <h1 tabIndex={-1}>Balades</h1>
        <Link className="icon-btn" href="/settings" aria-label="Réglages"><SettingsIcon /></Link>
      </div>

      <div className="bal-search" role="search">
        <div className={`bal-field${geoOn || byCity ? " has-token" : ""}`}>
          <span className="bal-loupe" aria-hidden="true"><SearchIcon /></span>
          {byCity ? (
            <span className="bal-token">
              <TargetIcon />
              <span>{known[0]}</span>
              <button type="button" className="bal-token-x" aria-label="Retirer la ville" onClick={() => commit("")}>×</button>
            </span>
          ) : geoOn ? (
            <span className="bal-token">
              <TargetIcon />
              <span>Autour de moi</span>
              <button type="button" className="bal-token-x" aria-label="Désactiver Autour de moi" onClick={() => setLocAuth(false)}>×</button>
            </span>
          ) : null}
          <input
            type="search"
            name="bal-q"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setShowSuggest(true);
            }}
            onFocus={() => setShowSuggest(true)}
            onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit(draft.trim());
              }
            }}
            placeholder={geoOn || byCity ? "" : "Rechercher une ville"}
            aria-label="Rechercher une ville"
            autoComplete="off"
          />
          <button
            type="button"
            className="bal-field-filter"
            aria-haspopup="dialog"
            aria-label={`Filtrer les balades${active ? ` (${active} actif${active > 1 ? "s" : ""})` : ""}`}
            onClick={() => setFilterOpen(true)}
          >
            <FilterIcon />
            {active > 0 && <span className="bal-fcount">{active}</span>}
          </button>
        </div>
        {showSuggest && (
          <div className="bal-suggest" role="listbox">
            <button type="button" className="bal-sug" role="option" onClick={() => commit("")}>
              <TargetIcon />
              <span>Autour de ma position actuelle</span>
            </button>
            {BAL_LIEUX.filter((v) => !draft || v.toLowerCase().includes(draft.toLowerCase())).map((v) => (
              <button type="button" className="bal-sug" role="option" key={v} onClick={() => commit(v)}>
                <span>{v}</span>
                <span className="bal-sug-n">{balCountCity(v)} balades</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {noMatch && <p className="bal-note" role="status">Aucune balade à {cityQuery}. Voici celles à moins de 5 km.</p>}

      {active > 0 && (
        <div className="bal-filterrow">
          <div className="bal-tags">
            <span className="bal-tag-label">{active > 1 ? "Filtres :" : "Filtre :"}</span>
            {mode !== "all" && (
              <span className="bal-tag">
                <span>{mode === "solo" ? "Solo" : "Groupe"}</span>
                <button type="button" className="bal-tag-x" aria-label="Retirer le filtre type" onClick={() => setMode("all")}>×</button>
              </span>
            )}
            {diffLabel && (
              <span className="bal-tag">
                <span>{diffLabel}</span>
                <button type="button" className="bal-tag-x" aria-label="Retirer le filtre difficulté" onClick={() => setDiff("all")}>×</button>
              </span>
            )}
          </div>
        </div>
      )}

      <p className="small"><strong className="bal-count-n">{n}</strong> balade{n > 1 ? "s" : ""} {where}</p>

      <Sheet open={filterOpen} onClose={() => setFilterOpen(false)} titleId="filter-sheet-t">
        <h2 id="filter-sheet-t">Filtrer les balades</h2>
        <p className="kv-label">Type</p>
        <div className="bal-chips">
          <button type="button" className="bal-chip" aria-pressed={mode === "all"} onClick={() => setMode("all")}>Tous types</button>
          <button
            type="button"
            className="bal-chip"
            aria-pressed={mode === "solo"}
            disabled={mode !== "solo" && countFor("solo", diff) === 0}
            onClick={() => setMode("solo")}
          >
            Solo
          </button>
          <button
            type="button"
            className="bal-chip"
            aria-pressed={mode === "groupe"}
            disabled={mode !== "groupe" && countFor("groupe", diff) === 0}
            onClick={() => setMode("groupe")}
          >
            Groupe
          </button>
        </div>
        <p className="kv-label">Difficulté</p>
        <div className="bal-chips">
          <button type="button" className="bal-chip" aria-pressed={diff === "all"} onClick={() => setDiff("all")}>Toutes</button>
          <button
            type="button"
            className="bal-chip"
            aria-pressed={diff === "pour-tous"}
            disabled={diff !== "pour-tous" && countFor(mode, "pour-tous") === 0}
            onClick={() => setDiff("pour-tous")}
          >
            Pour tous
          </button>
          <button
            type="button"
            className="bal-chip"
            aria-pressed={diff === "moderee"}
            disabled={diff !== "moderee" && countFor(mode, "moderee") === 0}
            onClick={() => setDiff("moderee")}
          >
            Modérée
          </button>
          <button
            type="button"
            className="bal-chip"
            aria-pressed={diff === "soutenue"}
            disabled={diff !== "soutenue" && countFor(mode, "soutenue") === 0}
            onClick={() => setDiff("soutenue")}
          >
            Soutenue
          </button>
        </div>
        <div className="bal-foot">
          <button className="btn primary" type="button" onClick={() => setFilterOpen(false)}>Voir les balades</button>
        </div>
      </Sheet>

      <div className="ch-list">
        {rows.map((row) =>
          row.kind === "solo" ? (
            <SoloBaladeCard p={row.p} key={`solo-${row.p.id}`} />
          ) : (
            <GroupeBaladeCard c={row.c} p={row.p} key={`groupe-${row.c.id}`} />
          )
        )}
      </div>
      {n === 0 && <p className="muted">Aucune balade pour le moment.</p>}
    </section>
  );
}
