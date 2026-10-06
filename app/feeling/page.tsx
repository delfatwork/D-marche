'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';
import { BottomNavigation } from '@/app/components/BottomNavigation';
import { useAppState } from '@/app/lib/useAppState';
import type { Feeling } from '@/app/lib/types';

const feelings: Array<{
  id: Feeling;
  label: string;
  emoji: string;
  color: string;
}> = [
  {
    id: 'excellent',
    label: 'Excellent',
    emoji: '😄',
    color: 'bg-[#D1FAE5] border-[#10B981]',
  },
  {
    id: 'bien',
    label: 'Bien',
    emoji: '😊',
    color: 'bg-[#BFDBFE] border-[#3B82F6]',
  },
  {
    id: 'normal',
    label: 'Normal',
    emoji: '😐',
    color: 'bg-[#FEF08A] border-[#EAB308]',
  },
  {
    id: 'fatigue',
    label: 'Fatigué',
    emoji: '😴',
    color: 'bg-[#FBCFE8] border-[#EC4899]',
  },
];

export default function FeelingPage() {
  const router = useRouter();
  const { getTodayWalk, updateWalk } = useAppState();

  const todayWalk = getTodayWalk();
  const [selectedFeeling, setSelectedFeeling] = useState<Feeling | null>(
    todayWalk?.feeling || null
  );
  const [notes, setNotes] = useState(todayWalk?.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!todayWalk || !selectedFeeling) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    updateWalk(todayWalk.id, {
      feeling: selectedFeeling,
      notes,
    });

    router.push('/');
  };

  if (!todayWalk) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
        <Header title="Erreur" />
        <main className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
          <Card>
            <p className="text-center text-[1.125rem] text-[#57564F]">
              Veuillez d'abord enregistrer une marche
            </p>
          </Card>
        </main>
      </div>
    );
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

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <Header
        title="Comment vous sentez-vous ?"
        showBack
        backHref="/walk"
      />

      <main className="flex-1 pb-24 px-6 py-8 max-w-2xl mx-auto w-full">
        <Card className="mb-8">
          <p className="text-center text-[1.125rem] text-[#57564F] mb-2">
            Vous avez marché
          </p>
          <p className="text-center text-3xl font-bold text-[#B45300]">
            {todayWalk.durationMinutes} minutes
          </p>
          <p className="text-center text-[1rem] text-[#57564F] mt-2">
            C'est super! 👏
          </p>
        </Card>

        {/* Feelings Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {feelings.map(feeling => (
            <button
              key={feeling.id}
              onClick={() => setSelectedFeeling(feeling.id)}
              className={`
                p-6 rounded-2xl border-2 transition-all
                ${
                  selectedFeeling === feeling.id
                    ? `${feeling.color} border-2`
                    : 'bg-white border-[#E8E8E5] hover:border-[#B45300]'
                }
                focus-visible:outline-2 focus-visible:outline-[#B45300]
                focus-visible:outline-offset-2
              `}
            >
              <div className="text-5xl mb-3 text-center">{feeling.emoji}</div>
              <p className="font-semibold text-[#1A1915] text-center">
                {feeling.label}
              </p>
            </button>
          ))}
        </div>

        {/* Notes Section */}
        <div className="mb-8">
          <label
            htmlFor="notes"
            className="block text-lg font-semibold text-[#1A1915] mb-4"
          >
            Quelques notes (optionnel)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Avez-vous remarqué quelque chose? Une bonne journée?"
            className="
              w-full p-4 border-2 border-[#E8E8E5] rounded-lg
              text-[1rem] font-sans
              focus:outline-none focus:border-[#B45300] focus:ring-2 focus:ring-[#FEF3C7]
              resize-vertical min-h-[120px]
            "
          />
        </div>

        {/* Safety Note */}
        <Card className="mb-8 bg-[#DBEAFE] border-l-4 border-[#3B82F6]">
          <p className="text-[1rem] text-[#1E3A8A]">
            <strong>⚠️ Remarque:</strong> Si vous ressentez une douleur, n'hésitez
            pas à en parler à un professionnel de santé.
          </p>
        </Card>

        {/* Submit Button */}
        <Button
          size="lg"
          fullWidth
          onClick={handleSubmit}
          disabled={!selectedFeeling || isSubmitting}
          isLoading={isSubmitting}
        >
          ✓ Enregistrer mon ressenti
        </Button>
      </main>

      <BottomNavigation items={navigationItems} />
    </div>
  );
}
