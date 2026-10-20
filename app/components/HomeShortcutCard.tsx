"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type HomeShortcutCardProps = {
  icon: ReactNode;
  title: string;
  text: string;
  href: string;
  variant: "discover" | "balades";
};

export default function HomeShortcutCard({ icon, title, text, href, variant }: HomeShortcutCardProps) {
  return (
    <Link className={`card home-shortcut home-shortcut-${variant}`} href={href}>
      <span className="home-shortcut-ico" aria-hidden="true">{icon}</span>
      <span className="home-shortcut-text">
        <span className="home-shortcut-title">{title}</span>
        <span className="small">{text}</span>
      </span>
    </Link>
  );
}
