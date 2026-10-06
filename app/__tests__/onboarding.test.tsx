import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OnboardingPage from '@/app/onboarding/page'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock useAppState
jest.mock('@/app/lib/useAppState', () => ({
  useAppState: () => ({
    user: {
      id: 'test-user',
      name: 'Test User',
      level: null,
      dailyGoalMinutes: 20,
      companyPreference: null,
      dataConsent: false,
      privacyConsent: false,
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
    },
    setUser: jest.fn(),
  }),
}))

describe('Onboarding Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('1. Affiche l\'écran de bienvenue', () => {
    render(<OnboardingPage />)

    expect(screen.getByText('Pas à pas')).toBeInTheDocument()
    expect(screen.getByText('Marchez à votre rythme')).toBeInTheDocument()
    expect(screen.getByText('Commençons')).toBeInTheDocument()
  })

  test('2. Utilisateur peut sélectionner un niveau', async () => {
    render(<OnboardingPage />)

    // Cliquer sur "Commençons"
    const startButton = screen.getByText('Commençons')
    fireEvent.click(startButton)

    // Attendre l'affichage de l'écran de sélection du niveau
    await waitFor(() => {
      expect(screen.getByText('Quel est votre niveau?')).toBeInTheDocument()
    })

    // Vérifier que les options sont présentes
    expect(screen.getByText('Je débute')).toBeInTheDocument()
    expect(screen.getByText('Je marche régulièrement')).toBeInTheDocument()
    expect(screen.getByText('Je suis actif')).toBeInTheDocument()
  })

  test('3. Utilisateur peut sélectionner une durée', async () => {
    render(<OnboardingPage />)

    // Parcourir jusqu'à l'écran de durée
    fireEvent.click(screen.getByText('Commençons'))

    await waitFor(() => {
      const jeDebute = screen.getByText('Je débute').closest('button')
      fireEvent.click(jeDebute!)
    })

    // Vérifier que les options de durée sont présentes
    await waitFor(() => {
      expect(screen.getByText('Quelle durée vous convient?')).toBeInTheDocument()
      expect(screen.getByText('10 minutes')).toBeInTheDocument()
      expect(screen.getByText('20 minutes')).toBeInTheDocument()
    })
  })

  test('4. Utilisateur peut confirmer ses préférences', async () => {
    render(<OnboardingPage />)

    // Naviguer à travers tous les écrans
    fireEvent.click(screen.getByText('Commençons'))

    // Sélectionner niveau
    await waitFor(() => {
      const jeDebute = screen.getByText('Je débute').closest('button')
      fireEvent.click(jeDebute!)
    })

    // Sélectionner durée
    await waitFor(() => {
      const vingtMin = screen.getByText('20 minutes').closest('button')
      fireEvent.click(vingtMin!)
    })

    // Sélectionner compagnie
    await waitFor(() => {
      const indifferent = screen.getByText('Indifférent').closest('button')
      fireEvent.click(indifferent!)
    })

    // Vérifier que l'écran de consentement est atteint
    await waitFor(() => {
      expect(screen.getByText('Vos données')).toBeInTheDocument()
    })
  })

  test('5. Utilisateur accepte les consentements', async () => {
    render(<OnboardingPage />)

    // Parcourir jusqu'à l'écran de consentement
    fireEvent.click(screen.getByText('Commençons'))

    await waitFor(() => {
      const jeDebute = screen.getByText('Je débute').closest('button')
      fireEvent.click(jeDebute!)
    })

    await waitFor(() => {
      const vingtMin = screen.getByText('20 minutes').closest('button')
      fireEvent.click(vingtMin!)
    })

    await waitFor(() => {
      const indifferent = screen.getByText('Indifférent').closest('button')
      fireEvent.click(indifferent!)
    })

    // Cocher les checkboxes de consentement
    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.click(checkboxes[0])
      fireEvent.click(checkboxes[1])
    })

    // Vérifier que le bouton de confirmation est enabled
    const confirmButton = await screen.findByText('Terminer l\'inscription')
    expect(confirmButton).not.toBeDisabled()
  })
})
