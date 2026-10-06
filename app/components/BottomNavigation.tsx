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
        bg-white border-t-2 border-[#E8E8E5]
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
                    ? 'text-[#B45300] border-t-4 border-[#B45300]'
                    : 'text-[#57564F] hover:text-[#1A1915] hover:bg-[#F5F5F3]'
                }

                focus-visible:outline-2 focus-visible:outline-[#B45300]
                focus-visible:outline-offset-2

                min-h-[56px]
              `}
              aria-label={item.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-2xl mb-1" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-xs font-semibold text-center leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
