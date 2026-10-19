import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';
import Button from './Button';

const meta = {
  component: Button,
  tags: ['ai-generated'],
  args: {
    children: 'Continuer',
    onClick: fn(),
  },
  argTypes: {
    hierarchy: {
      control: 'select',
      options: ['primary', 'secondary', 'quiet', 'danger'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { hierarchy: 'primary' },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const PrimaryDisabled: Story = {
  args: { hierarchy: 'primary', disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled();
  },
};

export const Secondary: Story = {
  args: { hierarchy: 'secondary', children: 'Modifier' },
};

export const SecondaryDisabled: Story = {
  args: { hierarchy: 'secondary', children: 'Modifier', disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled();
  },
};

export const Quiet: Story = {
  args: { hierarchy: 'quiet', children: 'Annuler' },
};

export const QuietDisabled: Story = {
  args: { hierarchy: 'quiet', children: 'Annuler', disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled();
  },
};

export const Danger: Story = {
  args: { hierarchy: 'danger', children: 'Supprimer le compte' },
};

export const DangerDisabled: Story = {
  args: { hierarchy: 'danger', children: 'Supprimer le compte', disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled();
  },
};
