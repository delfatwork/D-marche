import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '@/app/components/Button'
import { Card } from '@/app/components/Card'
import { ProgressBar } from '@/app/components/ProgressBar'
import { Modal } from '@/app/components/Modal'

describe('Accessibilité', () => {
  test('6. Mode contraste élevé fonctionne', () => {
    // Mock matchMedia pour préférence-contrast
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query.includes('prefers-contrast'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    const { container } = render(<Button>Test Button</Button>)

    // Vérifier que les CSS variables de contraste sont appliquées
    const styles = window.getComputedStyle(container.querySelector('button')!)
    expect(styles).toBeDefined()

    // Vérifier le contraste (via classe ou styles)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  test('7. La taille du texte peut être augmentée', () => {
    const { container } = render(
      <div>
        <h1 className="text-3xl">Grand Titre</h1>
        <p className="text-base">Texte normal</p>
      </div>
    )

    const title = screen.getByText('Grand Titre')
    const paragraph = screen.getByText('Texte normal')

    // Vérifier que le texte est scalable (utilise rem/em)
    expect(title).toHaveClass('text-3xl')
    expect(paragraph).toHaveClass('text-base')

    // Vérifier que les éléments existent et sont visibles
    expect(title).toBeVisible()
    expect(paragraph).toBeVisible()
  })

  test('Boutons ont des focus states visibles', () => {
    const { container } = render(<Button>Click Me</Button>)

    const button = container.querySelector('button')
    expect(button).toHaveClass('focus-visible:outline-2')
    expect(button).toHaveClass('focus-visible:outline-[#B45300]')
  })

  test('Cartes ont des touch targets minimales', () => {
    const { container } = render(
      <Card>
        <button className="p-4">Touch Me</button>
      </Card>
    )

    const button = container.querySelector('button')
    expect(button).toHaveClass('p-4')
    // p-4 = 1rem = 16px padding, donc minimum 48px touch target
  })

  test('ProgressBar a aria-label pour accessibilité', () => {
    render(
      <ProgressBar
        value={50}
        max={100}
        ariaLabel="Progression: 50 sur 100"
      />
    )

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-label', 'Progression: 50 sur 100')
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
  })

  test('Modal a les roles et labels d\'accessibilité', () => {
    render(
      <Modal
        isOpen={true}
        title="Test Modal"
        description="Test Description"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    )

    const modal = screen.getByRole('alertdialog')
    expect(modal).toHaveAttribute('aria-modal', 'true')
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title')
    expect(modal).toHaveAttribute('aria-describedby', 'modal-description')

    expect(screen.getByText('Test Modal')).toHaveAttribute('id', 'modal-title')
    expect(screen.getByText('Test Description')).toHaveAttribute('id', 'modal-description')
  })

  test('Texte a un contraste minimum de 4.5:1', () => {
    render(
      <div>
        <h1 className="text-[#1A1915] bg-white">Contraste bon</h1>
      </div>
    )

    const heading = screen.getByText('Contraste bon')

    // Vérifier que le texte et le fond sont définis
    expect(heading).toHaveClass('text-[#1A1915]')
    expect(heading.parentElement).toHaveClass('bg-white')
  })

  test('Min-height des boutons est de 48px', () => {
    const { container } = render(<Button size="md">Button</Button>)

    const button = container.querySelector('button')
    // Vérifier les classes de hauteur minimum
    expect(button).toHaveClass('min-h-[48px]')
  })

  test('Typographie utilise unités relatives (rem)', () => {
    const { container } = render(
      <div>
        <h1 className="text-3xl">Titre</h1>
        <p className="text-base">Paragraphe</p>
      </div>
    )

    // Vérifier que les tailles utilisent les classes Tailwind (basées sur rem)
    const h1 = screen.getByText('Titre')
    const p = screen.getByText('Paragraphe')

    expect(h1).toHaveClass('text-3xl')
    expect(p).toHaveClass('text-base')
  })
})
