"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CompassIcon, HomeIcon, PinIcon, TrophyIcon } from "@/app/components/icons";

const HIDDEN_PREFIXES = ["/onboarding", "/walk", "/activite", "/parcourir/nouvelle"];

const TABS = [
  { href: "/", label: "Accueil", Icon: HomeIcon, match: (p: string) => p === "/" },
  { href: "/pas-a-pas", label: "Pas à pas", Icon: TrophyIcon, match: (p: string) => p.startsWith("/pas-a-pas") },
  { href: "/balades", label: "Balades", Icon: PinIcon, match: (p: string) => p.startsWith("/balade") },
  { href: "/parcourir", label: "Parcourir", Icon: CompassIcon, match: (p: string) => p.startsWith("/parcourir") && p !== "/parcourir/nouvelle" },
];

export default function Tabbar() {
  const pathname = usePathname();
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  return (
    <nav className="tabbar" aria-label="Navigation principale">
      {TABS.map((t) => {
        const current = t.match(pathname);
        return (
          <Link key={t.href} className="tab" href={t.href} aria-current={current ? "page" : undefined}>
            <t.Icon />
            <span>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
