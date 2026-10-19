import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import TipCard from './TipCard';
import { PARC_ROWS } from '@/app/lib/parcourir-data';

const chaussures = PARC_ROWS.tips[0]; // "Comment choisir ses chaussures ?"
const chaleur = PARC_ROWS.tips[3]; // "Marcher par temps chaud"

const meta = {
  component: TipCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof TipCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    photo: chaussures.photo,
    title: chaussures.t,
    href: '/parcourir/tips/0',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(chaussures.t)).toBeVisible();
    await expect(canvas.getByText('Lire l’article')).toBeVisible();
    // The photo is decorative (alt=""), so it's excluded from the a11y tree —
    // query it directly instead of by role.
    await expect(canvas.getByRole('link').querySelector('img')).toBeVisible();
  },
};

export const AnotherTip: Story = {
  args: {
    photo: chaleur.photo,
    title: chaleur.t,
    href: '/parcourir/tips/3',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(chaleur.t)).toBeVisible();
  },
};

// Proves the shared preview actually loaded app/globals.css: the arrow
// button's background is --action, which resolves to --g-blue-600
// (#1B4FD8 -> rgb(27, 79, 216)) via :root in app/globals.css.
export const CssCheck: Story = {
  args: {
    photo: chaussures.photo,
    title: chaussures.t,
    href: '/parcourir/tips/0',
  },
  play: async ({ canvas }) => {
    const arrow = canvas.getByRole('link').querySelector('.card-arrow')!;
    await expect(getComputedStyle(arrow).backgroundColor).toBe('rgb(27, 79, 216)');
  },
};
