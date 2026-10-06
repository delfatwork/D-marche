'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from './components/Header';
import { Card } from './components/Card';
import { Button } from './components/Button';
import { ProgressBar } from './components/ProgressBar';
import { BottomNavigation } from './components/BottomNavigation';
import { useAppState } from './lib/useAppState';

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading, getTodayWalk, getWeeklyWalks } = useAppState();

  // Rediriger vers l'onboarding si non complété
  useEffect(() => {
    if (!isLoading && (!user || !user.onboardingComplete)) {
      router.push('/onboarding');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAF8]">
        <p className="text-[1.125rem] text-[#57564F]">Chargement...</p>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const todayWalk = getTodayWalk();
  const weeklyWalks = getWeeklyWalks();
  const totalWeeklyMinutes = weeklyWalks.reduce((sum, w) => sum + w.durationMinutes, 0);

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

  const completedToday = !!todayWalk;
  const goalReached = todayWalk ? todayWalk.durationMinutes >= user.dailyGoalMinutes : false;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <Header title="Pas à pas" subtitle={today} />

      <main className="flex-1 pb-24 px-6 py-8 max-w-2xl mx-auto w-full">
        {/* Section: Salutation & Objectif */}
        <section className="mb-8" aria-labelledby="daily-goal-heading">
          <h2 id="daily-goal-heading" className="sr-only">
            Objectif du jour
          </h2>
          <Card elevated className="bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA]">
            <div className="text-center">
              <p className="text-[1.125rem] text-[#57564F] mb-2">
                Bonjour {user.name}! 👋
              </p>
              <p className="text-[1rem] text-[#57564F] mb-4">
                Votre objectif d'aujourd'hui
              </p>
              <p className="text-5xl font-bold text-[#92400E] mb-1">
                {user.dailyGoalMinutes}
              </p>
              <p className="text-[1.125rem] text-[#57564F]">
                minutes de marche
              </p>
            </div>
          </Card>
        </section>

        {/* Section: Progression aujourd'hui */}
        <section className="mb-8" aria-labelledby="today-progress-heading">
          <h2 id="today-progress-heading" className="sr-only">
            Progression d'aujourd'hui
          </h2>
          {completedToday && todayWalk ? (
            <Card elevated className="bg-[#D1FAE5] border-l-4 border-[#10B981]">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#065F46] mb-2">
                  ✓ Bien joué!
                </p>
                <p className="text-[1.125rem] text-[#065F46]">
                  Vous avez marché{' '}
                  <strong>{todayWalk.durationMinutes} minutes</strong>{' '}
                  aujourd'hui
                </p>
                {goalReached && (
                  <p className="text-sm text-[#047857] mt-2">
                    Vous avez dépassé votre objectif de{' '}
                    {todayWalk.durationMinutes - user.dailyGoalMinutes} minutes 🎉
                  </p>
                )}
              </div>
            </Card>
          ) : (
            <Card elevated>
              <div className="text-center">
                <p className="text-[1.125rem] text-[#1A1915] font-semibold mb-4">
                  Êtes-vous prêt à marcher?
                </p>
                <Link href="/walk">
                  <Button size="lg" variant="primary" fullWidth>
                    🚶 Démarrer une marche
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </section>

        {/* Section: Barre de progression */}
        <section className="mb-8" aria-labelledby="weekly-progress-heading">
          <div className="flex items-center justify-between mb-4">
            <h2
              id="weekly-progress-heading"
              className="text-[1.75rem] font-bold text-[#1A1915]"
            >
              Cette semaine
            </h2>
            <Link href="/weekly">
              <button className="text-[1rem] font-semibold text-[#B45300] hover:text-[#92400E] transition-colors">
                Voir détails →
              </button>
            </Link>
          </div>

          <Card className="space-y-6">
            {/* Jours actifs */}
            <div>
              <ProgressBar
                value={weeklyWalks.length}
                max={7}
                showLabel={true}
                label="Jours de marche"
                ariaLabel={`${weeklyWalks.length} jours de marche sur 7`}
              />
            </div>

            {/* Total minutes */}
            <div className="border-t-2 border-[#E8E8E5] pt-4">
              <p className="text-[1.125rem] font-semibold text-[#1A1915] mb-2">
                Total
              </p>
              <p className="text-4xl font-bold text-[#B45300]">
                {totalWeeklyMinutes}
              </p>
              <p className="text-[1rem] text-[#57564F]">
                minutes cette semaine
              </p>
            </div>

            {/* Détail par jour */}
            <div className="border-t-2 border-[#E8E8E5] pt-4">
              <p className="text-[1.125rem] font-semibold text-[#1A1915] mb-4">
                Détail par jour
              </p>
              <div className="grid grid-cols-7 gap-2">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((dayLabel, i) => {
                  const dayDate = new Date();
                  dayDate.setDate(dayDate.getDate() - (6 - i));
                  const dayStr = dayDate.toISOString().split('T')[0];
                  const walk = weeklyWalks.find(w => w.date === dayStr);

                  return (
                    <div key={dayLabel} className="text-center">
                      <p className="text-xs font-semibold text-[#57564F] mb-2">
                        {dayLabel}
                      </p>
                      <div
                        className={`
                          rounded-lg p-3 min-h-[48px]
                          flex items-center justify-center
                          font-bold text-[1.125rem]
                          ${
                            walk
                              ? 'bg-[#FEF3C7] text-[#92400E]'
                              : 'bg-[#E8E8E5] text-[#A3A39D]'
                          }
                        `}
                        aria-label={`${dayLabel}: ${walk ? `${walk.durationMinutes} minutes` : 'Pas de marche'}`}
                      >
                        {walk ? '✓' : '−'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </section>

        {/* Section: Conseils */}
        <section className="mb-8" aria-labelledby="tips-heading">
          <h2 id="tips-heading" className="sr-only">
            Conseils et sécurité
          </h2>
          <Card className="bg-[#DBEAFE] border-l-4 border-[#3B82F6]">
            <p className="text-[1.125rem] text-[#1E3A8A]">
              💡 <strong>Conseil:</strong> Marchez à votre rythme dans un endroit
              sûr. Écoutez votre corps!
            </p>
          </Card>
        </section>

        {/* Section: Actions secondaires */}
        <section className="grid grid-cols-2 gap-4" aria-label="Actions rapides">
          <Link href="/feelings" className="w-full">
            <Button variant="secondary" fullWidth>
              📝 Journal
            </Button>
          </Link>
          <Link href="/settings" className="w-full">
            <Button variant="tertiary" fullWidth>
              ⚙️ Réglages
            </Button>
          </Link>
        </section>
      </main>

      <BottomNavigation items={navigationItems} />
    </div>
  );
}
