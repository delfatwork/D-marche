'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Button } from '@/app/components/Button';
import { Card } from '@/app/components/Card';
import { useAppState } from '@/app/lib/useAppState';
import {
  levelConfigs,
  durationOptions,
  companyOptions,
} from '@/app/lib/mock-data';
import type { UserLevel, CompanyPreference } from '@/app/lib/types';

type OnboardingStep = 'welcome' | 'level' | 'duration' | 'company' | 'consent' | 'complete';

export default function OnboardingPage() {
  const router = useRouter();
  const { setUser, user } = useAppState();

  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [selectedLevel, setSelectedLevel] = useState<UserLevel | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<CompanyPreference | null>(
    null
  );
  const [dataConsent, setDataConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    const steps: OnboardingStep[] = [
      'welcome',
      'level',
      'duration',
      'company',
      'consent',
      'complete',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: OnboardingStep[] = [
      'welcome',
      'level',
      'duration',
      'company',
      'consent',
      'complete',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleComplete = async () => {
    if (!selectedLevel || !selectedDuration || !selectedCompany || !user) return;
    if (!dataConsent || !privacyConsent) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    setUser({
      ...user,
      level: selectedLevel,
      dailyGoalMinutes: selectedDuration,
      companyPreference: selectedCompany,
      dataConsent: true,
      privacyConsent: true,
      onboardingComplete: true,
    });

    setCurrentStep('complete');
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  // Afficher le numéro de l'étape
  const getStepNumber = () => {
    const steps: OnboardingStep[] = [
      'welcome',
      'level',
      'duration',
      'company',
      'consent',
    ];
    return steps.indexOf(currentStep) + 1;
  };

  const canProceedToNext =
    (currentStep === 'welcome') ||
    (currentStep === 'level' && selectedLevel) ||
    (currentStep === 'duration' && selectedDuration) ||
    (currentStep === 'company' && selectedCompany) ||
    (currentStep === 'consent');

  const showBackButton = currentStep !== 'welcome' && currentStep !== 'complete';

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <Header title="Pas à pas" subtitle="Bienvenue" />

      <main className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full flex flex-col justify-center">
        {/* Step Indicator */}
        {currentStep !== 'welcome' && currentStep !== 'complete' && (
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(step => (
                <div
                  key={step}
                  className={`
                    flex-1 h-2 rounded-full transition-colors
                    ${
                      step <= getStepNumber()
                        ? 'bg-[#B45300]'
                        : 'bg-[#E8E8E5]'
                    }
                  `}
                />
              ))}
            </div>
            <p className="text-sm text-[#57564F] text-center">
              Étape {getStepNumber()} sur 5
            </p>
          </div>
        )}

        {/* Welcome Step */}
        {currentStep === 'welcome' && (
          <div className="text-center mb-8">
            <div className="text-7xl mb-6">🚶</div>
            <h1 className="text-4xl font-bold text-[#1A1915] mb-3">
              Pas à pas
            </h1>
            <p className="text-xl text-[#57564F] mb-2">
              Marchez à votre rythme
            </p>
            <p className="text-lg text-[#78776F] mb-8">
              sans pression, à votre pace
            </p>

            <Card className="mb-8 bg-[#FEF3C7] border-l-4 border-[#B45300]">
              <p className="text-[#92400E] font-semibold mb-2">
                ✨ Bienvenue dans notre communauté!
              </p>
              <p className="text-sm text-[#78776F]">
                Nous allons vous poser quelques questions simples pour
                personnaliser votre expérience. Ça prendra 2 minutes.
              </p>
            </Card>

            <Button size="lg" fullWidth onClick={handleNext}>
              Commençons →
            </Button>
          </div>
        )}

        {/* Level Selection Step */}
        {currentStep === 'level' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1A1915] mb-3">
                Quel est votre niveau?
              </h2>
              <p className="text-[#57564F]">
                Cela nous aidera à vous proposer un objectif adapté
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {(Object.keys(levelConfigs) as UserLevel[]).map(level => {
                const config = levelConfigs[level];
                const isSelected = selectedLevel === level;

                return (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`
                      w-full p-6 rounded-2xl border-2 transition-all text-left
                      ${
                        isSelected
                          ? 'border-[#B45300] bg-[#FEF3C7]'
                          : 'border-[#E8E8E5] bg-white hover:border-[#B45300] hover:bg-[#F5F5F3]'
                      }
                      focus-visible:outline-2 focus-visible:outline-[#B45300]
                      focus-visible:outline-offset-2
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`
                          w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                          ${
                            isSelected
                              ? 'border-[#B45300] bg-[#B45300]'
                              : 'border-[#A3A39D]'
                          }
                        `}
                      >
                        {isSelected && (
                          <span className="text-white font-bold">✓</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{config.emoji}</span>
                          <h3 className="text-xl font-bold text-[#1A1915]">
                            {config.title}
                          </h3>
                        </div>
                        <p className="text-[#57564F] mb-2">
                          {config.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              {showBackButton && (
                <Button variant="tertiary" onClick={handleBack} size="lg">
                  ← Retour
                </Button>
              )}
              <Button
                size="lg"
                fullWidth
                onClick={handleNext}
                disabled={!canProceedToNext}
              >
                Suivant →
              </Button>
            </div>
          </div>
        )}

        {/* Duration Selection Step */}
        {currentStep === 'duration' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1A1915] mb-3">
                Quelle durée vous convient?
              </h2>
              <p className="text-[#57564F]">
                Choisissez une durée confortable pour vous
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {durationOptions.map(option => {
                const isSelected = selectedDuration === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedDuration(option.id)}
                    className={`
                      p-4 rounded-xl border-2 transition-all text-center
                      ${
                        isSelected
                          ? 'border-[#B45300] bg-[#FEF3C7]'
                          : 'border-[#E8E8E5] bg-white hover:border-[#B45300]'
                      }
                      focus-visible:outline-2 focus-visible:outline-[#B45300]
                      focus-visible:outline-offset-2
                    `}
                  >
                    <p className="font-bold text-[#1A1915] mb-1">
                      {option.label}
                    </p>
                    <p className="text-xs text-[#57564F]">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              {showBackButton && (
                <Button variant="tertiary" onClick={handleBack} size="lg">
                  ← Retour
                </Button>
              )}
              <Button
                size="lg"
                fullWidth
                onClick={handleNext}
                disabled={!canProceedToNext}
              >
                Suivant →
              </Button>
            </div>
          </div>
        )}

        {/* Company Preference Step */}
        {currentStep === 'company' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1A1915] mb-3">
                Votre préférence?
              </h2>
              <p className="text-[#57564F]">
                Aimez-vous marcher seul ou accompagné?
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {companyOptions.map(option => {
                const isSelected = selectedCompany === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedCompany(option.id)}
                    className={`
                      w-full p-6 rounded-2xl border-2 transition-all text-left
                      ${
                        isSelected
                          ? 'border-[#B45300] bg-[#FEF3C7]'
                          : 'border-[#E8E8E5] bg-white hover:border-[#B45300] hover:bg-[#F5F5F3]'
                      }
                      focus-visible:outline-2 focus-visible:outline-[#B45300]
                      focus-visible:outline-offset-2
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{option.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-[#1A1915] text-lg mb-1">
                          {option.label}
                        </p>
                        <p className="text-[#57564F]">
                          {option.description}
                        </p>
                      </div>
                      <div
                        className={`
                          w-6 h-6 rounded-full border-2 flex-shrink-0
                          ${
                            isSelected
                              ? 'border-[#B45300] bg-[#B45300]'
                              : 'border-[#A3A39D]'
                          }
                        `}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              {showBackButton && (
                <Button variant="tertiary" onClick={handleBack} size="lg">
                  ← Retour
                </Button>
              )}
              <Button
                size="lg"
                fullWidth
                onClick={handleNext}
                disabled={!canProceedToNext}
              >
                Suivant →
              </Button>
            </div>
          </div>
        )}

        {/* Consent Step */}
        {currentStep === 'consent' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1A1915] mb-3">
                Vos données
              </h2>
              <p className="text-[#57564F]">
                Nous devons votre accord pour continuer
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {/* Data Consent */}
              <Card className="bg-[#F5F5F3]">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dataConsent}
                    onChange={e => setDataConsent(e.target.checked)}
                    className="w-6 h-6 rounded mt-1 cursor-pointer"
                    aria-label="J'accepte que mes données soient utilisées pour améliorer l'app"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[#1A1915] mb-2">
                      📊 Données du prototype
                    </p>
                    <p className="text-sm text-[#57564F] leading-relaxed">
                      Vos données de marche (durée, date, ressentis) sont utilisées
                      uniquement dans ce prototype. Elles sont stockées localement sur
                      votre téléphone et ne sont jamais partagées.
                    </p>
                  </div>
                </label>
              </Card>

              {/* Privacy Consent */}
              <Card className="bg-[#F5F5F3]">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={e => setPrivacyConsent(e.target.checked)}
                    className="w-6 h-6 rounded mt-1 cursor-pointer"
                    aria-label="J'accepte la politique de confidentialité"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[#1A1915] mb-2">
                      🛡️ Confidentialité
                    </p>
                    <p className="text-sm text-[#57564F] leading-relaxed">
                      Vos données ne sont pas vendues à des tiers. Cette application
                      ne demande jamais vos données médicales personnelles.
                    </p>
                  </div>
                </label>
              </Card>

              {/* Warning */}
              <Card className="bg-[#DBEAFE] border-l-4 border-[#3B82F6]">
                <p className="text-sm text-[#1E3A8A]">
                  <strong>⚠️ Important:</strong> Cette application n'est pas un
                  dispositif médical. Si vous avez des problèmes de santé, consultez
                  un professionnel.
                </p>
              </Card>
            </div>

            <div className="flex gap-3">
              {showBackButton && (
                <Button variant="tertiary" onClick={handleBack} size="lg">
                  ← Retour
                </Button>
              )}
              <Button
                size="lg"
                fullWidth
                onClick={handleComplete}
                disabled={!dataConsent || !privacyConsent || isSubmitting}
                isLoading={isSubmitting}
              >
                Terminer l'inscription
              </Button>
            </div>
          </div>
        )}

        {/* Complete Step */}
        {currentStep === 'complete' && (
          <div className="text-center">
            <div className="text-7xl mb-6 animate-pulse">🎉</div>
            <h1 className="text-3xl font-bold text-[#1A1915] mb-3">
              Bienvenue!
            </h1>
            <p className="text-lg text-[#57564F] mb-8">
              Vous êtes prêt à commencer votre aventure!
            </p>
            <Card className="bg-[#D1FAE5] border-l-4 border-[#10B981]">
              <p className="text-[#065F46]">
                Redirection en cours vers votre tableau de bord...
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
