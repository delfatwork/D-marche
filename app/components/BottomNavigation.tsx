'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

interface BottomNavigationProps {
  items: NavItem[];
}

export function BottomNavigation({ items }: BottomNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0
        bg-white border-t-2 border-neutral-200
        shadow-lg
        pb-[env(safe-area-inset-bottom)]
      "
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="flex">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex-1
                flex flex-col items-center justify-center
                py-4 px-2

                transition-colors duration-250

                ${
                  isActive
                    ? 'text-primary border-t-4 border-primary'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }

                focus-visible:outline-2 focus-visible:outline-primary
                focus-visible:outline-offset-2

                min-h-[56px]
              `}
              aria-label={item.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-2xl mb-1" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-sm font-semibold text-center leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
