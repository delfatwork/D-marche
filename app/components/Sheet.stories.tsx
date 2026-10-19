import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';
import Sheet from './Sheet';

const meta = {
  component: Sheet,
  tags: ['ai-generated'],
  args: {
    titleId: 'sheet-title',
    onClose: fn(),
    children: (
      <>
        <h2 id="sheet-title">Choisir une option</h2>
        <p>Contenu de la feuille.</p>
      </>
    ),
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: { open: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'sheet-title');
  },
};

// Sheet returns null when closed, so there is nothing to render/query here —
// this variant documents the closed state rather than asserting on it.
export const Closed: Story = { args: { open: false } };

export const EscapeCloses: Story = {
  args: { open: true },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByRole('dialog')).toBeVisible();
    await globalThis.document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await expect(args.onClose).toHaveBeenCalled();
  },
};
