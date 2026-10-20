import './globals.css';
import type { Metadata, Viewport } from 'next';
import { AppStateProvider } from '@/app/lib/app-state';
import Tabbar from '@/app/components/Tabbar';

export const metadata: Metadata = {
  title: 'D-marche',
  description: 'Application accessible pour encourager la marche régulière, à votre rythme.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'D-marche',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2B6A4E',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-text="normal" data-contrast="normal" data-motion="normal">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppStateProvider>
          <div className="shell">
            <main className="phone" aria-label="Application D-marche">
              <div className="scroller">
              {children}
              <Tabbar />
            </div>
            </main>
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
