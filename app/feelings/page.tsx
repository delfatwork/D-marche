'use client';

import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';
import { ProgressBar } from '@/app/components/ProgressBar';
import { BottomNavigation } from '@/app/components/BottomNavigation';
import { useAppState } from '@/app/lib/useAppState';
import type { Feeling } from '@/app/lib/types';

const feelingEmojis: Record<Feeling, string> = {
  excellent: '😄',
  bien: '😊',
  normal: '😐',
  fatigue: '😴',
};

const feelingLabels: Record<Feeling, string> = {
  excellent: 'Excellent',
  bien: 'Bien',
  normal: 'Normal',
  fatigue: 'Fatigué',
};

const feelingColors: Record<Feeling, string> = {
  excellent: 'bg-[#D1FAE5] border-l-4 border-[#10B981]',
  bien: 'bg-[#BFDBFE] border-l-4 border-[#3B82F6]',
  normal: 'bg-[#FEF08A] border-l-4 border-[#EAB308]',
  fatigue: 'bg-[#FBCFE8] border-l-4 border-[#EC4899]',
};

export default function FeelingsPage() {
  const { walks, getFeelingStats } = useAppState();

  const walksWithFeelings = walks
    .filter(w => w.feeling !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const stats = getFeelingStats();
  const totalWithFeelings = walksWithFeelings.length;

  const navigationItems = [
    {
      label: 'Accueil',
      href: '/',
      icon: '🏠',
      ariaLabel: 'Accueil',
    },
    {
      label: 'Marche',
      href: '/walk',
      icon: '🚶',
      ariaLabel: 'Démarrer une marche',
    },
    {
      label: 'Journal',
      href: '/feelings',
      icon: '📝',
      ariaLabel: 'Mon journal des ressentis',
    },
    {
      label: 'Paramètres',
      href: '/settings',
      icon: '⚙️',
      ariaLabel: 'Paramètres et accessibilité',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <Header title="Mes ressentis" showBack backHref="/" />

      <main className="flex-1 pb-24 px-6 py-8 max-w-2xl mx-auto w-full">
        {/* Stats Overview */}
        <Card elevated className="mb-8">
          <h2 className="text-2xl font-bold text-[#1A1915] mb-6">
            Votre ressenti général
          </h2>

          {totalWithFeelings > 0 ? (
            <div className="space-y-6">
              {(Object.keys(stats) as Feeling[]).map(feeling => {
                const count = stats[feeling];
                const percentage = (count / totalWithFeelings) * 100;
                const emoji = feelingEmojis[feeling];
                const label = feelingLabels[feeling];

                return (
                  <div key={feeling}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{emoji}</span>
                        <span className="font-semibold text-[#1A1915]">
                          {label}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-[#B45300]">
                        {count}
                      </span>
                    </div>
                    <ProgressBar
                      value={count}
                      max={totalWithFeelings}
                      ariaLabel={`${label}: ${count} fois`}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-[#57564F] py-8">
              Aucune marche enregistrée avec un ressenti pour le moment
            </p>
          )}
        </Card>

        {/* Recent Walks */}
        {walksWithFeelings.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-[#1A1915] mb-4">
              Historique récent
            </h2>
            <div className="space-y-3">
              {walksWithFeelings.slice(0, 10).map(walk => {
                const emoji = walk.feeling ? feelingEmojis[walk.feeling] : '?';
                const color = walk.feeling ? feelingColors[walk.feeling] : '';

                return (
                  <Card key={walk.id} className={`${color} p-4`}>
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{emoji}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-[#1A1915]">
                          {new Date(walk.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-[#57564F] text-[1rem]">
                          <strong>{walk.durationMinutes} minutes</strong> de marche
                        </p>
                        {walk.notes && (
                          <p className="text-sm text-[#57564F] mt-2 italic">
                            {walk.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* CTA */}
        {walksWithFeelings.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-[1.125rem] text-[#57564F] mb-4">
              Pas encore de ressentis enregistrés
            </p>
            <Link href="/walk">
              <Button variant="primary">
                🚶 Commencer une marche
              </Button>
            </Link>
          </Card>
        )}
      </main>

      <BottomNavigation items={navigationItems} />
    </div>
  );
}
