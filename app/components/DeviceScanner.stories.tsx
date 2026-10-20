import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, waitFor } from 'storybook/test';
import DeviceScanner from './DeviceScanner';
import { DEVICES } from '@/app/lib/onboarding-data';

const meta = {
  component: DeviceScanner,
  tags: ['ai-generated'],
  args: {
    onConnected: fn(),
  },
} satisfies Meta<typeof DeviceScanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /rechercher un podomètre/i })).toBeVisible();
  },
};

export const Scanning: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /rechercher un podomètre/i }));
    await expect(canvas.getByText("Recherche d'appareils…")).toBeVisible();
  },
};

// After ~1.4s the simulated scan finds a device and shows the picker.
export const Found: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /rechercher un podomètre/i }));
    await waitFor(() => expect(canvas.getByText('Appareils trouvés')).toBeVisible(), { timeout: 3000 });
    await expect(canvas.getByText(DEVICES[0])).toBeVisible();
    await expect(canvas.getByRole('button', { name: /connecter cet appareil/i })).toBeDisabled();
  },
};

// Picking a device enables the connect button, which then shows the connecting state.
export const Connecting: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /rechercher un podomètre/i }));
    await waitFor(() => expect(canvas.getByText('Appareils trouvés')).toBeVisible(), { timeout: 3000 });
    await userEvent.click(canvas.getByRole('radio'));
    await userEvent.click(canvas.getByRole('button', { name: /connecter cet appareil/i }));
    await expect(canvas.getByText('Connexion en cours…')).toBeVisible();
  },
};

// After ~2s the simulated connection completes and onConnected fires.
export const Connected: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: /rechercher un podomètre/i }));
    await waitFor(() => expect(canvas.getByText('Appareils trouvés')).toBeVisible(), { timeout: 3000 });
    await userEvent.click(canvas.getByRole('radio'));
    await userEvent.click(canvas.getByRole('button', { name: /connecter cet appareil/i }));
    await waitFor(() => expect(args.onConnected).toHaveBeenCalledWith(DEVICES[0]), { timeout: 4000 });
  },
};
