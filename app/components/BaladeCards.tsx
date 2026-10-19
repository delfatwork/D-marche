import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, UserIcon, UsersIcon } from "@/app/components/icons";
import { balDiff, creneauWhen, type Creneau, type Parcours } from "@/app/lib/balades-data";

function SchemaSvg({ path }: { path: string }) {
  return (
    <svg className="bal-svg" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d={path} />
    </svg>
  );
}

function BaladeVis({ p, tone }: { p: Parcours; tone: "v1" | "v2" }) {
  return (
    <span className={`vis ${tone} bal-vis`} aria-hidden="true">
      {p.photo ? <Image className="bal-photo" src={p.photo} alt="" fill sizes="88px" /> : <SchemaSvg path={p.path} />}
    </span>
  );
}

export function SoloBaladeCard({ p }: { p: Parcours }) {
  const diff = balDiff(p);
  return (
    <Link className="card bal-card bal-compact bal-link" href={`/balade/solo/${p.id}`}>
      <BaladeVis p={p} tone="v1" />
      <div className="bal-body">
        <p className="small bal-when"><UserIcon /><span>Solo</span></p>
        <p className="bal-title">{p.name}</p>
        <p className="small bal-when">{p.km} · <span className={`chip chip-${diff.cls}`}>{diff.label}</span></p>
      </div>
    </Link>
  );
}

export function GroupeBaladeCard({ c, p }: { c: Creneau; p: Parcours }) {
  const diff = balDiff(p);
  return (
    <Link className="card bal-card bal-compact bal-link" href={`/balade/groupe/${c.id}`}>
      <BaladeVis p={p} tone="v2" />
      <div className="bal-body">
        <p className="small bal-when"><UsersIcon /><span>Groupe</span></p>
        <p className="bal-title">{c.title}</p>
        <p className="small bal-when"><CalendarIcon /><span>{creneauWhen(c)}</span></p>
        <p className="small bal-when">{p.km} · <span className={`chip chip-${diff.cls}`}>{diff.label}</span></p>
      </div>
    </Link>
  );
}
