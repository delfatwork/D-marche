'use client';

import Link from 'next/link';

type TabType = 'today' | 'month';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  showBack?: boolean;
  backHref?: string;
}

export function Header({
  title,
  subtitle,
  activeTab = 'today',
  onTabChange,
  showBack = false,
  backHref = '/',
}: HeaderProps) {
  // Mode titre/sous-titre (pour les autres pages)
  const hasTitleMode = title || subtitle;

  return (
    <header
      className="
        bg-gradient-to-r from-primary-light to-secondary-light
        px-6 py-6
        pt-[calc(env(safe-area-inset-top)+1rem)]
        border-b-2 border-neutral-200
      "
    >
      <div className="max-w-2xl mx-auto">
        {/* Mode titre/sous-titre */}
        {hasTitleMode ? (
          <div className="flex items-center gap-4">
            {showBack && (
              <Link
                href={backHref}
                className="
                  flex-shrink-0
                  text-3xl
                  hover:opacity-70
                  transition-opacity duration-250
                  focus-visible:outline-2 focus-visible:outline-primary
                  focus-visible:outline-offset-2 rounded
                "
                aria-label="Retour"
              >
                ←
              </Link>
            )}
            <div className="flex-1">
              {title && (
                <h1 className="text-3xl font-bold text-neutral-900">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-lg text-neutral-600 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Bouton retour (optionnel) */}
            {showBack && (
              <div className="mb-4">
                <Link
                  href={backHref}
                  className="
                    inline-block
                    text-3xl
                    hover:opacity-70
                    transition-opacity duration-250
                    focus-visible:outline-2 focus-visible:outline-primary
                    focus-visible:outline-offset-2 rounded
                  "
                  aria-label="Retour"
                >
                  ←
                </Link>
              </div>
            )}

            {/* Mode tabs (pour l'accueil) */}
            <nav
              className="flex gap-4 border-b-2 border-neutral-200"
              role="tablist"
              aria-label="Période"
            >
              <button
                onClick={() => onTabChange?.('today')}
                role="tab"
                aria-selected={activeTab === 'today'}
                aria-controls="tab-today"
                className={`
                  px-4 py-3 font-semibold text-base border-b-4 transition-all
                  ${
                    activeTab === 'today'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }
                  focus-visible:outline-2 focus-visible:outline-primary
                  focus-visible:outline-offset-2
                `}
              >
                Aujourd'hui
              </button>
              <button
                onClick={() => onTabChange?.('month')}
                role="tab"
                aria-selected={activeTab === 'month'}
                aria-controls="tab-month"
                className={`
                  px-4 py-3 font-semibold text-base border-b-4 transition-all
                  ${
                    activeTab === 'month'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }
                  focus-visible:outline-2 focus-visible:outline-primary
                  focus-visible:outline-offset-2
                `}
              >
                Mois
              </button>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
