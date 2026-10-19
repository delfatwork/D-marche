import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { GroupeBaladeCard } from './BaladeCards';
import { BAL_CRENEAUX, balParcours, type Creneau, type Parcours } from '@/app/lib/balades-data';

const samedi = BAL_CRENEAUX.find((c) => c.id === 'c1')!; // -> canal, hard: 0 -> "Pour tous"

// No real créneau targets a hard: 1 parcours yet, so parcours + créneau are
// synthesized here to cover the "Modérée" tier (balDiff() in
// app/lib/balades-data.ts), mirroring the "sentier" fixture in
// SoloBaladeCard.stories.tsx.
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
const coteaux: Creneau = {
  id: 'c-demo-moderee',
  title: 'Sortie des Coteaux',
  parcoursId: 'sentier',
  date: 'Mardi 15 octobre',
  time: '14 h 00',
  meet: 'Mairie',
  count: 6,
  max: 10,
};

// No real créneau targets a hard: 2 parcours yet either, so this one is
// synthesized to cover the "Soutenue" tier.
const rando: Creneau = {
  id: 'c-demo-soutenue',
  title: 'Randonnée urbaine',
  parcoursId: 'centre',
  date: 'Dimanche 20 octobre',
  time: '9 h 00',
  meet: 'Place centrale',
  count: 5,
  max: 12,
};

const meta = {
  component: GroupeBaladeCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof GroupeBaladeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PourTous: Story = {
  args: { c: samedi, p: balParcours(samedi.parcoursId)! },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pour tous')).toBeVisible();
    // creneauWhen() reformats "Samedi 12 octobre" + "10 h 00" -> "sam 12 oct à 10h".
    await expect(canvas.getByText('sam 12 oct à 10h')).toBeVisible();
  },
};

export const Moderee: Story = {
  args: { c: coteaux, p: sentier },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Modérée')).toBeVisible();
  },
};

export const Soutenue: Story = {
  args: { c: rando, p: balParcours(rando.parcoursId)! },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Soutenue')).toBeVisible();
    await expect(canvas.getByText('dim 20 oct à 9h')).toBeVisible();
  },
};
