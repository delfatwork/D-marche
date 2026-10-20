import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { NextWalkCard } from './BaladeCards';
import { BAL_CRENEAUX, balParcours } from '@/app/lib/balades-data';

const boucle = BAL_CRENEAUX.find((c) => c.id === 'c1')!; // -> canal, hard: 0 -> "Pour tous"

const meta = {
  component: NextWalkCard,
  tags: ['ai-generated'],
  args: {
    c: boucle,
    p: balParcours(boucle.parcoursId)!,
    joined: false,
    full: false,
    onJoin: fn(),
    onLeave: fn(),
  },
} satisfies Meta<typeof NextWalkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Boucle Bagnolet parc Romainville')).toBeVisible();
    // creneauWhen() reformats "Samedi 12 octobre" + "10 h 00" -> "sam 12 oct à 10h".
    await expect(canvas.getByText('sam 12 oct à 10h')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Je participe' })).toBeEnabled();
  },
};

export const Join: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Je participe' }));
    await expect(args.onJoin).toHaveBeenCalled();
  },
};

export const Joined: Story = {
  args: { joined: true },
  play: async ({ canvas, args }) => {
    const btn = canvas.getByRole('button', { name: 'Me désinscrire' });
    await expect(btn).toBeVisible();
    await userEvent.click(btn);
    await expect(args.onLeave).toHaveBeenCalled();
  },
};

export const Full: Story = {
  args: { full: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Complet' })).toBeDisabled();
  },
};
