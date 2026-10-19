import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon, DcCardIcon } from "@/app/components/icons";

type TipCardProps = {
  icon: ReactNode;
  tone: "v1" | "v2" | "v3";
  title: string;
  href: string;
};

export default function TipCard({ icon, tone, title, href }: TipCardProps) {
  return (
    <Link href={href} className="card tip-card">
      <span className={`vis ${tone}`} aria-hidden="true">{icon}</span>
      <div className="tip-card-body">
        <div className="tip-card-head">
          <DcCardIcon className="tip-card-head-ico" />
          <span className="tip-card-head-label text-xs">Conseil</span>
        </div>
        <p className="tip-card-title text-md">{title}</p>
        <div className="tip-card-foot">
          <span className="tip-card-arrow" aria-hidden="true">
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}
