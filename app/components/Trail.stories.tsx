import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import Trail from './Trail';

const meta = {
  component: Trail,
  tags: ['ai-generated'],
} satisfies Meta<typeof Trail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { progress: 0 },
  play: async ({ canvasElement }) => {
    const prog = canvasElement.querySelector('.trail-prog') as SVGPathElement;
    await expect(prog.style.strokeDashoffset).toBe('100');
  },
};

export const Half: Story = {
  args: { progress: 0.5 },
  play: async ({ canvasElement }) => {
    const prog = canvasElement.querySelector('.trail-prog') as SVGPathElement;
    await expect(prog.style.strokeDashoffset).toBe('50');
  },
};

export const Full: Story = {
  args: { progress: 1 },
  play: async ({ canvasElement }) => {
    const prog = canvasElement.querySelector('.trail-prog') as SVGPathElement;
    await expect(prog.style.strokeDashoffset).toBe('0');
  },
};

export const OverCapped: Story = {
  // Trail clamps progress to [0, 1] — 1.5 should render identically to 1.
  args: { progress: 1.5 },
  play: async ({ canvasElement }) => {
    const prog = canvasElement.querySelector('.trail-prog') as SVGPathElement;
    await expect(prog.style.strokeDashoffset).toBe('0');
  },
};

export const UnderCapped: Story = {
  // Trail clamps progress to [0, 1] — -0.5 should render identically to 0.
  args: { progress: -0.5 },
  play: async ({ canvasElement }) => {
    const prog = canvasElement.querySelector('.trail-prog') as SVGPathElement;
    await expect(prog.style.strokeDashoffset).toBe('100');
  },
};
