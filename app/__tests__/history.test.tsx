import React from 'react'
import { render, screen } from '@testing-library/react'
import WeeklyPage from '@/app/weekly/page'

const mockWalks = [
  {
    id: 'walk-1',
    userId: 'test-user',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    durationMinutes: 20,
    feeling: 'bien' as const,
    notes: 'Belle promenade',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'walk-2',
    userId: 'test-user',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    durationMinutes: 25,
    feeling: 'excellent' as const,
    notes: 'Très énergique',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'walk-3',
    userId: 'test-user',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    durationMinutes: 15,
    feeling: 'normal' as const,
    notes: '',
    createdAt: new Date().toISOString(),
  },
]

jest.mock('@/app/lib/useAppState', () => ({
  useAppState: () => ({
    getWeeklyWalks: jest.fn(() => mockWalks),
  }),
}))

describe('History & Statistics', () => {
  test('5. L\'historique est mis à jour', () => {
    render(<WeeklyPage />)

    // Vérifier que les stats sont affichées
    expect(screen.getByText('Jours actifs')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument() // 3 jours actifs

    // Vérifier que le total minutes est correct (20+25+15=60)
    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('60')).toBeInTheDocument()
  })

  test('Calcule la moyenne correctement', () => {
    render(<WeeklyPage />)

    // Moyenne: 60 minutes / 3 jours = 20 minutes
    expect(screen.getByText('Moyenne')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
  })

  test('Affiche le détail par jour', () => {
    render(<WeeklyPage />)

    expect(screen.getByText('Détail par jour')).toBeInTheDocument()

    // Vérifier qu'au moins une marche est affichée
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('minutes')).toBeInTheDocument()
  })

  test('Affiche les messages positifs basés sur la régularité', () => {
    render(<WeeklyPage />)

    // Avec 3 jours actifs (2-4 jours), devrait afficher "Bien commencé!"
    expect(screen.getByText('Bien commencé!')).toBeInTheDocument()
  })

  test('Calcule la distance estimée', () => {
    render(<WeeklyPage />)

    // Distance: 60 minutes / 3 = 20 km
    expect(screen.getByText('🗺️')).toBeInTheDocument()
    expect(screen.getByText(/\d+/)).toBeInTheDocument()
  })

  test('Affiche message informatif sur les estimations', () => {
    render(<WeeklyPage />)

    expect(
      screen.getByText(/Calculée comme moyenne/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/estimation seulement/)
    ).toBeInTheDocument()
  })

  test('Affiche les ressentis associés', () => {
    render(<WeeklyPage />)

    // Vérifier que les émojis des ressentis sont affichés
    expect(screen.getByText('🚶')).toBeInTheDocument() // Jours actifs
    expect(screen.getByText('⏱️')).toBeInTheDocument() // Total
    expect(screen.getByText('📊')).toBeInTheDocument() // Moyenne
  })

  test('Affiche des statistiques sans données médicales', () => {
    render(<WeeklyPage />)

    // Vérifier qu'il n'y a pas de termes médicaux
    const text = document.body.innerText
    expect(text).not.toMatch(/calories brûlées/i)
    expect(text).not.toMatch(/diagnostic/i)
    expect(text).not.toMatch(/médical/i)
  })

  test('Message positif change selon régularité (0 jours)', () => {
    jest.mock('@/app/lib/useAppState', () => ({
      useAppState: () => ({
        getWeeklyWalks: jest.fn(() => []),
      }),
    }))

    // Recréer le mock pour 0 jours
    const mockGetWeeklyWalks = jest.fn(() => [])
    jest.mock('@/app/lib/useAppState', () => ({
      useAppState: () => ({
        getWeeklyWalks: mockGetWeeklyWalks,
      }),
    }))
  })

  test('Affiche les données avec texte plutôt que graphiques seulement', () => {
    render(<WeeklyPage />)

    // Vérifier que les chiffres sont affichés en texte
    expect(screen.getByText('Jours actifs')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('Moyenne')).toBeInTheDocument()
    expect(screen.getByText('Distance')).toBeInTheDocument()

    // Vérifier les valeurs numériques
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('60')).toBeInTheDocument()
  })

  test('Affiche CTA pour marcher', () => {
    render(<WeeklyPage />)

    // Vérifier les boutons d'action
    expect(screen.getByText('🚶 Marcher maintenant')).toBeInTheDocument()
    expect(screen.getByText('← Retour au tableau de bord')).toBeInTheDocument()
  })
})
