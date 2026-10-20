import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor } from 'storybook/test';
import ActiviteScreen from './ActiviteScreen';

const meta = {
  component: ActiviteScreen,
  tags: ['ai-generated'],
} satisfies Meta<typeof ActiviteScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

// useAppState() only renders real content once `hydrated` flips true on mount
// (see app/lib/app-state.tsx) — wait for the heading before asserting.
export const Pas: Story = {
  args: { metric: 'pas' },
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => expect(canvas.getByRole('heading', { name: 'Pas' })).toBeVisible());
    // Default period is "7j" — switch to "1j" to reach the goal-percentage view.
    await userEvent.click(canvas.getByRole('button', { name: '1j' }));
    await expect(canvas.getByText(/% de l'objectif/)).toBeVisible();
  },
};

export const Sorties: Story = {
  args: { metric: 'sorties' },
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => expect(canvas.getByRole('heading', { name: 'Sorties' })).toBeVisible());
    await userEvent.click(canvas.getByRole('button', { name: '1j' }));
    await expect(canvas.getByText(/% de l'objectif/)).toBeVisible();
  },
};
