import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, waitFor } from 'storybook/test';
import AuthCodeStep from './AuthCodeStep';

const meta = {
  component: AuthCodeStep,
  tags: ['ai-generated'],
  args: {
    title: 'Vérifiez votre numéro',
    message: 'Nous avons envoyé un code à votre numéro.',
    confirmLabel: 'Valider',
    onVerified: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof AuthCodeStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DangerConfirm: Story = { args: { confirmLabel: 'Supprimer le compte', confirmDanger: true } };

// The component auto-fills the (simulated) SMS code after ~1.2s — wait for it,
// then verify the real submit flow calls onVerified.
export const CorrectCode: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await waitFor(() => expect(canvas.getByLabelText(/code reçu/i)).toHaveValue('123456'), {
      timeout: 3000,
    });
    await userEvent.click(canvas.getByRole('button', { name: /valider/i }));
    await expect(args.onVerified).toHaveBeenCalled();
  },
};

export const WrongCode: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText(/code reçu/i), '000000');
    await userEvent.click(canvas.getByRole('button', { name: /valider/i }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent(/code incorrect/i);
  },
};
