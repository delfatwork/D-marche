'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';
import { ProgressBar } from '@/app/components/ProgressBar';
import { Modal } from '@/app/components/Modal';
import { BottomNavigation } from '@/app/components/BottomNavigation';
import { useAppState } from '@/app/lib/useAppState';

type WalkState = 'idle' | 'running' | 'paused' | 'completed';

export default function WalkPage() {
  const router = useRouter();
  const { user, getTodayWalk, addWalk, updateWalk } = useAppState();

  // État du minuteur
  const [walkState, setWalkState] = useState<WalkState>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [walkId, setWalkId] = useState<string | null>(null);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [showResultScreen, setShowResultScreen] = useState(false);

  // Charger la marche d'aujourd'hui si elle existe
  useEffect(() => {
    const todayWalk = getTodayWalk();
    if (todayWalk && todayWalk.durationMinutes > 0) {
      setWalkId(todayWalk.id);
      setElapsedSeconds(todayWalk.durationMinutes * 60);
    }
  }, [getTodayWalk]);

  // Timer effect
  useEffect(() => {
    if (walkState !== 'running') return;

    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [walkState]);

  // Formatage du temps
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const goalReached = user && elapsedMinutes >= user.dailyGoalMinutes;

  const handleStart = () => {
    if (!walkId && user) {
      // Créer une nouvelle marche (date locale)
      const today = new Date().toLocaleDateString('en-CA');
      const newWalk = {
        id: `walk-${Date.now()}`,
        userId: user.id,
        date: today,
        durationMinutes: 0,
        feeling: null as any,
        notes: '',
        createdAt: new Date().toISOString(),
      };
      addWalk(newWalk);
      setWalkId(newWalk.id);
    }
    setWalkState('running');
  };

  const handlePause = () => {
    setWalkState('paused');
    if (walkId) {
      updateWalk(walkId, { durationMinutes: elapsedMinutes });
    }
  };

  const handleResume = () => {
    setWalkState('running');
  };

  const handleFinish = () => {
    setWalkState('completed');
    if (walkId) {
      updateWalk(walkId, { durationMinutes: elapsedMinutes });
    }
    setShowResultScreen(true);
  };

  const handleQuitClick = () => {
    if (walkState === 'idle' || elapsedMinutes === 0) {
      router.push('/');
    } else {
      setShowQuitModal(true);
    }
  };

  const handleConfirmQuit = () => {
    setShowQuitModal(false);
    // Ne pas sauvegarder les données si l'utilisateur quitte
    // La durée a déjà été mise à jour via handlePause si nécessaire
    router.push('/');
  };

  const handleRestart = () => {
    setElapsedSeconds(0);
    setWalkState('idle');
    setShowResultScreen(false);
    if (walkId) {
      updateWalk(walkId, { durationMinutes: 0 });
    }
  };

  const handleEvalueFeeling = () => {
    router.push('/feeling');
  };

  if (!user) {
    return null;
  }

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

  // Écran de résultat
  if (showResultScreen) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
        <Header title="Session terminée" />

        <main className="flex-1 pb-24 px-6 py-8 max-w-2xl mx-auto w-full flex flex-col justify-center">
          {/* Résumé */}
          <Card elevated className="mb-8 text-center bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA]">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-[#92400E] mb-2">
              Bravo!
            </h1>
            <p className="text-xl text-[#57564F] mb-6">
              Vous avez marché
            </p>
            <p className="text-5xl font-bold text-[#B45300] mb-4">
              {elapsedMinutes}
            </p>
            <p className="text-lg text-[#57564F]">
              minutes
            </p>

            {goalReached && (
              <div className="mt-6 p-4 bg-[#D1FAE5] rounded-lg border-l-4 border-[#10B981]">
                <p className="text-lg font-bold text-[#065F46]">
                  🎉 Objectif atteint!
                </p>
                <p className="text-[#065F46]">
                  Vous avez dépassé votre objectif de{' '}
                  {elapsedMinutes - user.dailyGoalMinutes} minutes
                </p>
              </div>
            )}
          </Card>

          {/* Safety Reminder */}
          <Card className="mb-8 bg-[#DBEAFE] border-l-4 border-[#3B82F6]">
            <p className="text-sm text-[#1E3A8A]">
              💡 <strong>Conseil:</strong> Pensez à vous hydrater et à vous reposer.
              Écoutez votre corps!
            </p>
          </Card>

          {/* Actions */}
          <div className="space-y-3 mb-8">
            <Button
              size="lg"
              variant="primary"
              fullWidth
              onClick={handleEvalueFeeling}
            >
              📝 Évaluer mon ressenti
            </Button>
            <Button
              size="lg"
              variant="secondary"
              fullWidth
              onClick={handleRestart}
            >
              🔄 Refaire une marche
            </Button>
          </div>

          <Link href="/" className="w-full">
            <Button size="lg" variant="tertiary" fullWidth>
              ← Retour à l'accueil
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <Header title="Ma marche" />

      <main className="flex-1 pb-24 px-6 py-8 max-w-2xl mx-auto w-full flex flex-col justify-center">
        {/* Timer Display - Grand */}
        <Card elevated className="mb-8 bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA]">
          <div className="text-center">
            {/* Statut */}
            <p className="text-[1rem] text-[#57564F] mb-2 uppercase tracking-wider">
              {walkState === 'idle' && '⏸️ Prêt'}
              {walkState === 'running' && '🟢 En cours'}
              {walkState === 'paused' && '⏸️ En pause'}
              {walkState === 'completed' && '✓ Terminé'}
            </p>

            {/* Minuteur */}
            <p className="text-8xl font-bold text-[#92400E] font-mono mb-2 tracking-tight">
              {formatTime(elapsedSeconds)}
            </p>

            {/* Minutes lisibles */}
            <p className="text-xl text-[#57564F] mb-6">
              {elapsedMinutes} minute{elapsedMinutes !== 1 ? 's' : ''}
            </p>

            {/* Alerte objectif atteint */}
            {goalReached && (
              <div className="mt-6 p-4 bg-[#D1FAE5] rounded-lg border-l-4 border-[#10B981]">
                <p className="text-lg font-bold text-[#065F46]">
                  🎉 Objectif atteint!
                </p>
                <p className="text-sm text-[#065F46]">
                  Continuez si vous en avez l'énergie
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Progress Bar */}
        <Card className="mb-8">
          <ProgressBar
            value={elapsedMinutes}
            max={user.dailyGoalMinutes}
            showLabel={true}
            label="Progression vers objectif"
            ariaLabel={`${elapsedMinutes} minutes sur ${user.dailyGoalMinutes}`}
          />
        </Card>

        {/* Conseils de Sécurité */}
        <Card className="mb-8 bg-[#DBEAFE] border-l-4 border-[#3B82F6]">
          <p className="text-[1rem] text-[#1E3A8A]">
            💡 <strong>Conseil:</strong> Marchez dans un endroit sûr. Écoutez
            votre corps et arrêtez-vous si vous ressentez une gêne.
          </p>
        </Card>

        {/* Contrôles Principaux */}
        <div className="space-y-3 mb-6">
          {walkState === 'idle' && (
            <Button size="lg" variant="primary" fullWidth onClick={handleStart}>
              ▶️ Démarrer la marche
            </Button>
          )}

          {walkState === 'running' && (
            <>
              <Button
                size="lg"
                variant="secondary"
                fullWidth
                onClick={handlePause}
              >
                ⏸️ Mettre en pause
              </Button>
              <Button
                size="lg"
                variant="tertiary"
                fullWidth
                onClick={handleFinish}
              >
                ✓ Terminer la marche
              </Button>
            </>
          )}

          {walkState === 'paused' && (
            <>
              <Button
                size="lg"
                variant="primary"
                fullWidth
                onClick={handleResume}
              >
                ▶️ Reprendre
              </Button>
              <Button
                size="lg"
                variant="tertiary"
                fullWidth
                onClick={handleFinish}
              >
                ✓ Terminer la marche
              </Button>
            </>
          )}
        </div>

        {/* Quitter */}
        <Button
          size="lg"
          variant="tertiary"
          fullWidth
          onClick={handleQuitClick}
        >
          ← Quitter sans enregistrer
        </Button>
      </main>

      {/* Modal de confirmation */}
      <Modal
        isOpen={showQuitModal}
        title="Quitter sans enregistrer?"
        description={`Vous avez marché ${elapsedMinutes} minutes. Cette données ne sera pas sauvegardée si vous quittez.`}
        confirmLabel="Quitter"
        cancelLabel="Continuer"
        onConfirm={handleConfirmQuit}
        onCancel={() => setShowQuitModal(false)}
        isDangerous
      />

      <BottomNavigation items={navigationItems} />
    </div>
  );
}
