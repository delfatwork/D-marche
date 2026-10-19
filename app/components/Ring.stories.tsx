import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import Ring from './Ring';

const meta = {
  component: Ring,
  tags: ['ai-generated'],
  args: {
    children: <strong>7</strong>,
  },
} satisfies Meta<typeof Ring>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { pct: 0 } };

export const Half: Story = {
  args: { pct: 50 },
  play: async ({ canvasElement }) => {
    // Ring drives its conic-gradient fill via the --p custom property (see .ring in globals.css).
    const ring = canvasElement.querySelector('.ring');
    await expect(ring).not.toBeNull();
    await expect(getComputedStyle(ring as Element).getPropertyValue('--p').trim()).toBe('50.0');
  },
};

export const Full: Story = { args: { pct: 100 } };

export const OverCapped: Story = {
  // Ring clamps pct to [0, 100] — 140 should render identically to 100.
  args: { pct: 140 },
};
