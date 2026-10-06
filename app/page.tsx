'use client';

import { useEffect, useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<'today' | 'month'>('today');
  const { user, isLoading, getTodayWalk, getWeeklyWalks } = useAppState();

  // Rediriger vers l'onboarding si non complété
  useEffect(() => {
    if (!isLoading && (!user || !user.onboardingComplete)) {
      router.push('/onboarding');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <p className="text-lg text-neutral-600">Chargement...</p>
      </div>
    );
  }

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
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 pb-24 px-6 py-8 max-w-2xl mx-auto w-full">
        {/* Section: Salutation & Objectif */}
        <section className="mb-8" aria-labelledby="daily-goal-heading">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Bonjour {user.name}! <span aria-hidden="true">👋</span>
          </h1>
          <h2 id="daily-goal-heading" className="sr-only">
            Objectif du jour
          </h2>
          <Card elevated className="bg-gradient-to-r from-primary-light to-secondary-light">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <p className="text-lg font-semibold text-neutral-900">
                  Votre objectif du jour
                </p>
              </div>

              {/* Droite : Emoji + Nombre + Unité */}
              <div className="flex items-center gap-3">
                {/* Emoji marche (gros) */}
                <span className="text-7xl" aria-hidden="true">
                  🚶
                </span>

                {/* Nombre + Unité */}
                <div className="text-right">
                  <p className="text-5xl font-bold text-primary-dark leading-none">
                    {user.dailyGoalMinutes}
                  </p>
                  <p className="text-sm text-neutral-600 mt-1">
                    minutes
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Section: Progression aujourd'hui - CTA toujours visible */}
        <section className="mb-8" aria-labelledby="today-progress-heading">
          <h2 id="today-progress-heading" className="sr-only">
            Progression d'aujourd'hui
          </h2>

          {/* Badge "Bien joué!" si complété (pas remplacement du CTA) */}
          {completedToday && todayWalk && (
            <div className="mb-4 p-4 bg-emerald-50 border-l-4 border-success rounded-lg">
              <p className="text-lg font-bold text-emerald-900 mb-1">
                <span aria-hidden="true">✓</span> Bien joué!
              </p>
              <p className="text-base text-emerald-800">
                Vous avez marché <strong>{todayWalk.durationMinutes} minutes</strong> aujourd'hui
              </p>
              {goalReached && (
                <p className="text-sm text-emerald-900 mt-2">
                  Vous avez dépassé votre objectif de {todayWalk.durationMinutes - user.dailyGoalMinutes} minutes! <span aria-hidden="true">🎉</span>
                </p>
              )}
            </div>
          )}

          {/* CTA principal — toujours visible */}
          <Card elevated>
            <div className="text-center">
              <p className="text-lg text-neutral-900 font-semibold mb-4">
                Prêt à marcher?
              </p>
              <Link href="/walk">
                <Button size="lg" variant="primary" fullWidth>
                  <span aria-hidden="true">🚶</span> Démarrer une marche
                </Button>
              </Link>
              {!completedToday && (
                <p className="text-sm text-neutral-600 mt-3">
                  Vous pouvez marcher plusieurs fois par jour.
                </p>
              )}
            </div>
          </Card>
        </section>

        {/* Section: Récapitulatif hebdo — Simplifié avec lien vers détails */}
        <section className="mb-8" aria-labelledby="weekly-summary-heading">
          <h2 id="weekly-summary-heading" className="text-xl font-bold text-neutral-900 mb-3">
            Cette semaine
          </h2>

          <Card className="space-y-4">
            {/* Résumé rapide */}
            <div className="text-center">
              <div className="mb-3">
                <p className="text-3xl font-bold text-primary">
                  {weeklyWalks.length}
                </p>
                <p className="text-base text-neutral-600">
                  jours de marche
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {totalWeeklyMinutes}
                </p>
                <p className="text-base text-neutral-600">
                  minutes cumulées
                </p>
              </div>
            </div>

            {/* Lien vers détails complets */}
            <div className="pt-4 border-t-2 border-neutral-200 text-center">
              <Link href="/weekly" className="inline-block text-base font-semibold text-primary hover:text-primary-dark transition-colors">
                Voir la semaine détaillée →
              </Link>
            </div>
          </Card>
        </section>

        {/* Section: Conseils */}
        <section className="mb-8" aria-labelledby="tips-heading">
          <h2 id="tips-heading" className="sr-only">
            Conseils et sécurité
          </h2>
          <Card className="bg-blue-50 border-l-4 border-info">
            <p className="text-lg text-blue-900">
              <span aria-hidden="true">💡</span> <strong>Conseil:</strong> Marchez à votre rythme dans un endroit sûr. Écoutez votre corps!
            </p>
          </Card>
        </section>

      </main>

      <BottomNavigation items={navigationItems} />
    </div>
  );
}
