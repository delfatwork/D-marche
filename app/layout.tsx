import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Pas à pas - Marchez à votre rythme',
  description: 'Application accessible pour seniors pour encourager la marche régulière',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['marche', 'santé', 'seniors', 'bien-être', 'accessible'],
  authors: [{ name: 'Pas à pas' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#FAFAF8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="light" />
        <meta name="apple-mobile-web-app-title" content="Pas à pas" />
        <meta name="description" content="Marchez à votre rythme, sans pression" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
