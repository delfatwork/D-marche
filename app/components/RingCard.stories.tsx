import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import RingCard from './RingCard';
import { RouteIcon, StepsIcon, TargetIcon } from './icons';
import { fmtHoursMin, nf } from '@/app/lib/format';

const meta = {
  component: RingCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pas: Story = {
  args: {
    icon: <StepsIcon className="ring-card-ico" />,
    headline: 'Pas',
    value: nf(4550),
    pct: (4550 / 7000) * 100,
    footer: `Cap ${nf(7000)}`,
    href: '/activite/pas',
    ariaLabel: 'Pas hier : 4 550 sur un objectif de 7 000. Ouvrir le détail des pas',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toHaveAttribute('href', '/activite/pas');
  },
};

export const Duree: Story = {
  args: {
    icon: <TargetIcon className="ring-card-ico" />,
    headline: 'Durée',
    value: fmtHoursMin(28),
    pct: (28 / 70) * 100,
    footer: `Cap ${fmtHoursMin(70)}`,
    ariaLabel: 'Durée hier : 28 min',
  },
  play: async ({ canvas }) => {
    // No href on this variant: renders as a plain <article>, not a link.
    await expect(canvas.queryByRole('link')).toBeNull();
  },
};

export const Sorties: Story = {
  args: {
    icon: <RouteIcon className="ring-card-ico" />,
    headline: 'Sorties',
    value: nf(2),
    pct: (2 / 3) * 100,
    footer: 'Cap 3',
    href: '/activite/sorties',
    ariaLabel: 'Sorties hier : 2. Ouvrir le détail des sorties',
  },
};
