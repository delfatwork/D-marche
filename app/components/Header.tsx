'use client';

import Link from 'next/link';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
}

export function Header({
  title,
  subtitle,
  showBack = false,
  backHref = '/',
}: HeaderProps) {
  return (
    <header
      className="
        bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA]
        px-6 py-8
        pt-[calc(env(safe-area-inset-top)+2rem)]
        border-b-2 border-[#E8E8E5]
      "
    >
      <div className="flex items-center gap-4 max-w-2xl mx-auto">
        {showBack && (
          <Link
            href={backHref}
            className="
              flex-shrink-0
              text-3xl
              hover:opacity-70
              transition-opacity duration-250
              focus-visible:outline-2 focus-visible:outline-[#B45300]
              focus-visible:outline-offset-2 rounded
            "
            aria-label="Retour"
          >
            ←
          </Link>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[#1A1915]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[1.125rem] text-[#57564F] mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
