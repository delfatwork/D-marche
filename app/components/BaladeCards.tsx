import Image from "next/image";
import Link from "next/link";
import { UserIcon, UsersIcon } from "@/app/components/icons";
import { balDiff, creneauWhen, type Creneau, type Parcours } from "@/app/lib/balades-data";

function SchemaSvg({ path }: { path: string }) {
  return (
    <svg className="bal-svg" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d={path} />
    </svg>
  );
}

function BaladeVis({ p, tone, photo }: { p: Parcours; tone: "v1" | "v2"; photo?: string }) {
  const src = photo ?? p.photo;
  return (
    <span className={`vis ${tone} bal-vis`} aria-hidden="true">
      {src ? <Image className="bal-photo" src={src} alt="" fill sizes="88px" /> : <SchemaSvg path={p.path} />}
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

export function NextWalkCard({
  c,
  p,
  joined,
  full,
  onJoin,
  onLeave,
}: {
  c: Creneau;
  p: Parcours;
  joined: boolean;
  full: boolean;
  onJoin: () => void;
  onLeave: () => void;
}) {
  const diff = balDiff(p);
  return (
    <article className="card next-walk">
      <Link className="next-walk-link bal-link" href={`/balade/groupe/${c.id}`}>
        <div className="bal-body">
          <p className="small bal-when next-walk-meta">
            <span><UsersIcon /><span>Groupe</span> · {p.km}</span>
            <span className={`chip chip-${diff.cls}`}>{diff.label}</span>
          </p>
          <p className="text-md bal-when"><span>{creneauWhen(c)}</span></p>
          <p className="bal-title next-walk-title">{c.title}</p>
        </div>
      </Link>
      <div className="next-walk-actions">
        {joined ? (
          <button className="btn secondary" type="button" onClick={onLeave}>Me désinscrire</button>
        ) : full ? (
          <button className="btn secondary" type="button" disabled>Complet</button>
        ) : (
          <button className="btn primary" type="button" onClick={onJoin}>Je participe</button>
        )}
      </div>
    </article>
  );
}

export function GroupeBaladeCard({ c, p }: { c: Creneau; p: Parcours }) {
  const diff = balDiff(p);
  return (
    <Link className="card bal-card bal-compact bal-link" href={`/balade/groupe/${c.id}`}>
      <BaladeVis p={p} tone="v2" photo={c.photo} />
      <div className="bal-body">
        <p className="small bal-when"><UsersIcon /><span>Groupe</span></p>
        <p className="bal-title">{c.title}</p>
        <p className="small bal-when"><span>{creneauWhen(c)}</span></p>
        <p className="small bal-when">{p.km} · <span className={`chip chip-${diff.cls}`}>{diff.label}</span></p>
      </div>
    </Link>
  );
}
