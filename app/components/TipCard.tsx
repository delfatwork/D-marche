import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, DcCardIcon } from "@/app/components/icons";

type TipCardProps = {
  photo: string;
  title: string;
  href: string;
  horizontal?: boolean;
};

export default function TipCard({ photo, title, href, horizontal = false }: TipCardProps) {
  return (
    <Link href={href} className={`card tip-card${horizontal ? " tip-card-h" : ""}`}>
      <span className="tip-card-vis" aria-hidden="true">
        <Image src={photo} alt="" fill sizes={horizontal ? "7rem" : "(min-width: 900px) 420px, 100vw"} />
      </span>
      <div className="tip-card-body">
        <div className="tip-card-head">
          <DcCardIcon className="tip-card-head-ico" />
          <span className="tip-card-head-label text-xs">Conseil</span>
        </div>
        <p className="tip-card-title text-base">{title}</p>
        <div className="tip-card-foot">
          <span className="tip-card-meta text-xs">Lire l&rsquo;article</span>
          <span className="card-arrow" aria-hidden="true">
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}
