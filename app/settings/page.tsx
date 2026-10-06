'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';
import { BottomNavigation } from '@/app/components/BottomNavigation';
import { useAppState } from '@/app/lib/useAppState';

export default function SettingsPage() {
  const router = useRouter();
  const { user, reset } = useAppState();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    reset();
    router.push('/onboarding');
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

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <Header title="Paramètres" showBack backHref="/" />

      <main className="flex-1 pb-24 px-6 py-8 max-w-2xl mx-auto w-full">
        {/* Accessibility Settings */}
        <h2 className="text-2xl font-bold text-[#1A1915] mb-4">
          Accessibilité
        </h2>

        <Card className="mb-8">
          <div className="space-y-6">
            {/* Info: Zoom */}
            <div>
              <h3 className="font-semibold text-[#1A1915] mb-2">
                Taille du texte
              </h3>
              <p className="text-[#57564F] text-[1rem]">
                Utilisez le zoom de votre navigateur pour ajuster la taille du texte:
              </p>
              <ul className="text-[#57564F] text-[1rem] mt-2 list-disc list-inside">
                <li>
                  <strong>Augmenter:</strong> Ctrl++ ou Cmd++
                </li>
                <li>
                  <strong>Diminuer:</strong> Ctrl+- ou Cmd+-
                </li>
                <li>
                  <strong>Réinitialiser:</strong> Ctrl+0 ou Cmd+0
                </li>
              </ul>
            </div>

            {/* Info: Contraste */}
            <div className="border-t-2 border-[#E8E8E5] pt-6">
              <h3 className="font-semibold text-[#1A1915] mb-2">
                Contraste élevé
              </h3>
              <p className="text-[#57564F] text-[1rem]">
                Si votre système d'exploitation propose un mode "Contraste élevé", cette
                application le respectera automatiquement.
              </p>
            </div>

            {/* Info: Couleurs */}
            <div className="border-t-2 border-[#E8E8E5] pt-6">
              <h3 className="font-semibold text-[#1A1915] mb-2">
                Schémas de couleur
              </h3>
              <p className="text-[#57564F] text-[1rem]">
                Cette application utilise une palette de couleurs chaleureuses et accessibles
                pour les seniors.
              </p>
            </div>
          </div>
        </Card>

        {/* User Info */}
        <h2 className="text-2xl font-bold text-[#1A1915] mb-4 mt-8">
          Mes informations
        </h2>

        <Card className="mb-8">
          <div className="space-y-4">
            <div>
              <p className="text-[#57564F] text-[1rem] mb-1">Nom</p>
              <p className="text-xl font-semibold text-[#1A1915]">
                {user.name}
              </p>
            </div>

            <div className="border-t-2 border-[#E8E8E5] pt-4">
              <p className="text-[#57564F] text-[1rem] mb-1">Niveau</p>
              <p className="text-xl font-semibold text-[#1A1915] capitalize">
                {user.level === 'debutant' && 'Je débute'}
                {user.level === 'intermediaire' && 'Je marche régulièrement'}
                {user.level === 'regulier' && 'Je suis actif'}
              </p>
            </div>

            <div className="border-t-2 border-[#E8E8E5] pt-4">
              <p className="text-[#57564F] text-[1rem] mb-1">
                Objectif quotidien
              </p>
              <p className="text-xl font-semibold text-[#1A1915]">
                {user.dailyGoalMinutes} minutes
              </p>
            </div>
          </div>
        </Card>

        {/* Data & Privacy */}
        <h2 className="text-2xl font-bold text-[#1A1915] mb-4 mt-8">
          Données et confidentialité
        </h2>

        <Card className="mb-8 bg-[#DBEAFE] border-l-4 border-[#3B82F6]">
          <p className="text-[1rem] text-[#1E3A8A]">
            💾 <strong>Vos données:</strong> Toutes vos données sont stockées localement
            sur votre téléphone. Elles ne quittent jamais votre appareil.
          </p>
        </Card>

        {/* Reset */}
        <h2 className="text-2xl font-bold text-[#1A1915] mb-4 mt-8">
          Gestion du compte
        </h2>

        {!showConfirm ? (
          <Button
            variant="danger"
            size="lg"
            fullWidth
            onClick={() => setShowConfirm(true)}
          >
            🔄 Réinitialiser l'application
          </Button>
        ) : (
          <Card className="bg-[#FEE2E2] border-l-4 border-[#EF4444] mb-4">
            <p className="text-[#7F1D1D] mb-4">
              <strong>Êtes-vous sûr?</strong> Cela supprimera toutes vos données. Cette
              action ne peut pas être annulée.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="danger"
                onClick={handleReset}
              >
                Supprimer tout
              </Button>
              <Button
                variant="tertiary"
                onClick={() => setShowConfirm(false)}
              >
                Annuler
              </Button>
            </div>
          </Card>
        )}

        {/* Legal */}
        <Card className="bg-[#F5F5F3] mt-8">
          <h3 className="font-semibold text-[#1A1915] mb-3">
            Informations légales
          </h3>
          <div className="text-sm text-[#57564F] space-y-3">
            <p>
              <strong>⚠️ Avertissement médical:</strong> Cette application n'est pas un
              dispositif médical. Elle ne donne pas de conseils médicaux et ne peut pas
              diagnostiquer des conditions de santé.
            </p>
            <p>
              <strong>🛡️ Sécurité:</strong> Marchez toujours dans un environnement sûr.
              Si vous ressentez de la douleur ou des symptômes inquiétants, arrêtez-vous
              et consultez un professionnel de santé.
            </p>
            <p>
              <strong>📱 Version:</strong> 1.0.0 (MVP)
            </p>
          </div>
        </Card>
      </main>

      <BottomNavigation items={navigationItems} />
    </div>
  );
}
