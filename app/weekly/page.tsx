'use client';

import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';
import { StatsCard } from '@/app/components/StatsCard';
import { BottomNavigation } from '@/app/components/BottomNavigation';
import { useAppState } from '@/app/lib/useAppState';

export default function WeeklyPage() {
  const { walks } = useAppState();

  // Marches de cette semaine (7 derniers jours)
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weeklyWalks = walks.filter(w => {
    const walkDate = new Date(w.date + 'T00:00:00');
    return walkDate >= sevenDaysAgo && walkDate <= today;
  });

  const daysActive = weeklyWalks.length;
  const totalMinutes = weeklyWalks.reduce((sum, w) => sum + w.durationMinutes, 0);
  const averageMinutes = daysActive > 0 ? Math.round(totalMinutes / daysActive) : 0;

  // Calcul de la tendance (cette semaine vs semaine précédente)
  const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
  const previousWeekWalks = walks.filter(w => {
    const walkDate = new Date(w.date + 'T00:00:00');
    return walkDate >= twoWeeksAgo && walkDate < sevenDaysAgo;
  });

  const previousWeekDays = previousWeekWalks.length;
  const trend: 'up' | 'down' | 'stable' =
    daysActive > previousWeekDays ? 'up' :
    daysActive < previousWeekDays ? 'down' :
    'stable';

  // Messages positifs basés sur la performance
  const getPositiveMessage = () => {
    if (daysActive === 0) {
      return {
        emoji: '🌱',
        title: 'Prêt à commencer?',
        message:
          'Chaque marche compte! Commencez par une courte marche dès aujourd\'hui.',
      };
    }
    if (daysActive === 1) {
      return {
        emoji: '👣',
        title: 'Premiers pas!',
        message:
          'Vous avez fait vos premiers pas. Continuez pour voir les progrès!',
      };
    }
    if (daysActive >= 2 && daysActive <= 4) {
      return {
        emoji: '💪',
        title: 'Bien commencé!',
        message:
          'Vous prenez de bonnes habitudes. Quelques jours de plus et ce sera une routine!',
      };
    }
    if (daysActive >= 5 && daysActive <= 6) {
      return {
        emoji: '🔥',
        title: 'Excellent!',
        message:
          'Vous êtes presque régulier! Juste un jour de plus pour cette semaine.',
      };
    }
    return {
      emoji: '🏆',
      title: 'Extraordinaire!',
      message:
        'Vous avez été actif tous les jours! Vous êtes un champion de la marche.',
    };
  };

  const message = getPositiveMessage();

  // Détail par jour de la semaine
  const getWeekDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-CA');
      const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
      const walk = weeklyWalks.find(w => w.date === dateStr);

      days.push({
        dayName,
        date: dateStr,
        walk,
        isToday: i === 0,
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

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
      <Header title="Cette semaine" showBack backHref="/" />

      <main className="flex-1 pb-24 px-6 py-8 max-w-2xl mx-auto w-full">
        {/* Message Positif */}
        <Card elevated className="mb-8 bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] border-none">
          <div className="text-center">
            <p className="text-6xl mb-3">{message.emoji}</p>
            <h2 className="text-2xl font-bold text-[#92400E] mb-2">
              {message.title}
            </h2>
            <p className="text-lg text-[#57564F]">{message.message}</p>
          </div>
        </Card>

        {/* Stats Principales */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <StatsCard
            label="Jours actifs"
            value={daysActive}
            unit="/ 7"
            emoji="🚶"
            trend={trend}
            description={
              daysActive === 1
                ? 'Premier pas'
                : daysActive === 7
                  ? '100% régulier!'
                  : `${7 - daysActive} jour${7 - daysActive > 1 ? 's' : ''} de plus`
            }
          />

          <StatsCard
            label="Total"
            value={totalMinutes}
            unit="min"
            emoji="⏱️"
            description={
              totalMinutes < 60
                ? 'Petit début'
                : totalMinutes < 120
                  ? 'Belle régularité'
                  : 'Très actif!'
            }
          />

          <StatsCard
            label="Moyenne"
            value={averageMinutes}
            unit="min/jour"
            emoji="📊"
            description={
              daysActive === 0
                ? 'Aucune donnée'
                : averageMinutes < 15
                  ? 'Courtes marches'
                  : averageMinutes < 30
                    ? 'Marches régulières'
                    : 'Marches énergiques'
            }
          />
        </div>

        {/* Détail par jour */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1A1915] mb-4">
            Détail par jour
          </h2>

          <Card className="p-0 overflow-hidden">
            <div className="space-y-0">
              {weekDays.map((day, index) => (
                <div
                  key={day.date}
                  className={`
                    p-4 flex items-center justify-between
                    ${index !== weekDays.length - 1 ? 'border-b-2 border-[#E8E8E5]' : ''}
                    ${day.isToday ? 'bg-[#FEF3C7]' : ''}
                  `}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-[#1A1915] capitalize mb-1">
                      {day.dayName}
                      {day.isToday && (
                        <span className="ml-2 text-xs font-normal text-[#D97706]">
                          Aujourd'hui
                        </span>
                      )}
                    </p>
                    {day.walk ? (
                      <p className="text-sm text-[#57564F]">
                        {day.walk.durationMinutes} minutes
                        {day.walk.feeling && ` • ${day.walk.feeling}`}
                      </p>
                    ) : (
                      <p className="text-sm text-[#A3A39D]">Pas de marche</p>
                    )}
                  </div>

                  <div className="text-right">
                    {day.walk ? (
                      <div>
                        <p className="text-2xl font-bold text-[#D97706]">
                          {day.walk.durationMinutes}
                        </p>
                        <p className="text-xs text-[#57564F]">minutes</p>
                      </div>
                    ) : (
                      <p className="text-2xl text-[#E8E8E5]">−</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Informations Complémentaires */}
        <Card className="mb-8 bg-[#DBEAFE] border-l-4 border-[#3B82F6]">
          <p className="text-sm text-[#1E3A8A]">
            <strong>💡 À savoir:</strong> Ces statistiques vous aident à suivre
            votre progression et votre régularité. Chaque marche compte,
            indépendamment de la distance parcourue.
          </p>
        </Card>

        {/* CTA */}
        <Link href="/walk" className="w-full block mb-4">
          <Button size="lg" variant="primary" fullWidth>
            🚶 Marcher maintenant
          </Button>
        </Link>

        <Link href="/" className="w-full">
          <Button size="lg" variant="tertiary" fullWidth>
            ← Retour au tableau de bord
          </Button>
        </Link>
      </main>

      <BottomNavigation items={navigationItems} />
    </div>
  );
}
