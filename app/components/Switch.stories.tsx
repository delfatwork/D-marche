import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';
import Switch from './Switch';

const meta = {
  component: Switch,
  tags: ['ai-generated'],
  args: {
    id: 'notif1',
    label: 'Notifications de rappel',
    desc: 'Recevez un rappel quotidien pour marcher.',
    onChange: fn(),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: { checked: false },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  },
};

export const On: Story = {
  args: { checked: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  },
};

export const Toggle: Story = {
  args: { checked: false },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('switch'));
    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
};
