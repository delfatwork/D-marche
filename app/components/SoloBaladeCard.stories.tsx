import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { SoloBaladeCard } from './BaladeCards';
import { BAL_PARCOURS, type Parcours } from '@/app/lib/balades-data';

const canal = BAL_PARCOURS.find((p) => p.id === 'canal')!; // hard: 0 -> "Pour tous" (has a photo)
const centre = BAL_PARCOURS.find((p) => p.id === 'centre')!; // hard: 2 -> "Soutenue" (schema SVG fallback)

// No hard: 1 ("Modérée") parcours exists in BAL_PARCOURS yet, so this fixture
// is synthesized to cover the third balDiff() tier (app/lib/balades-data.ts).
const sentier: Parcours = {
  id: 'sentier',
  name: 'Sentier des Coteaux',
  km: '4,5 km',
  min: 58,
  ville: 'Saint-Mandé',
  hard: 1,
  access: 'Quelques pentes, bancs réguliers',
  pts: [
    { t: 'Départ : mairie', d: '0 m', i: 'flag' },
    { t: 'Montée du coteau', d: '1,2 km', i: 'route' },
    { t: 'Banc panoramique', d: '2,8 km', i: 'bench' },
    { t: 'Arrivée : mairie', d: '4,5 km', i: 'flag' },
  ],
  surface: ['Chemin stabilisé', 'Quelques passages en pente'],
  path: 'M10 60 C 50 10, 90 100, 130 40 S 170 20, 190 50',
};

const meta = {
  component: SoloBaladeCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof SoloBaladeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PourTous: Story = {
  args: { p: canal },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pour tous')).toBeVisible();
  },
};

export const Moderee: Story = {
  args: { p: sentier },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Modérée')).toBeVisible();
  },
};

export const Soutenue: Story = {
  args: { p: centre },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Soutenue')).toBeVisible();
  },
};

// The only CssCheck story in the project: proves the shared preview actually
// loaded app/globals.css. .chip-pour-tous sets --tag-border: var(--ink-soft),
// which resolves to #3B4D46 (see :root in app/globals.css) -> rgb(59, 77, 70).
export const CssCheck: Story = {
  args: { p: canal },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Pour tous');
    await expect(getComputedStyle(badge).borderColor).toBe('rgb(59, 77, 70)');
  },
};
