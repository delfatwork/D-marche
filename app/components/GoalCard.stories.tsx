import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import GoalCard from './GoalCard';
import { fmtHoursMin, nf } from '@/app/lib/format';

const meta = {
  component: GoalCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof GoalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pas: Story = {
  args: {
    value: <>{nf(6200)} <small>/ {nf(10000)} pas</small></>,
    message: 'Encore 3 800 pas pour atteindre votre cap.',
    badge: '1 sortie',
    emptyText: "Aucune sortie aujourd'hui",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Votre cap du jour')).toBeVisible();
    await expect(canvas.getByText('1 sortie')).toBeVisible();
  },
};

export const Duree: Story = {
  args: {
    value: <>{fmtHoursMin(28)} <small>/ {fmtHoursMin(70)}</small></>,
    message: 'Un tout petit tour de 10 minutes pour bien démarrer.',
    badge: '1 sortie',
    emptyText: "Aucune sortie aujourd'hui",
  },
};

export const Sorties: Story = {
  args: {
    value: <>{nf(1)} <small>/ sorties</small></>,
    message: 'Encore 2 sorties pour atteindre votre cap.',
    badge: `${nf(4200)} pas`,
    emptyText: "Aucun pas aujourd'hui",
  },
};

// No sortie/step logged yet today: falls back to emptyText instead of a badge.
export const SansBadge: Story = {
  args: {
    value: <>{nf(0)} <small>/ {nf(10000)} pas</small></>,
    message: 'Un tout petit tour de 10 minutes pour bien démarrer.',
    badge: null,
    emptyText: "Aucune sortie aujourd'hui",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Aucune sortie aujourd'hui")).toBeVisible();
  },
};
