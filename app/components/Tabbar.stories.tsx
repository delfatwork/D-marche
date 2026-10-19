import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import Tabbar from './Tabbar';

// KNOWN ISSUE (needs-work): with `nextjs.appDirectory: true`, Next's own
// <RedirectBoundary> (rendered by @storybook/nextjs-vite's AppRouterProvider
// mock) crashes calling useRouter() — "Cannot read properties of undefined
// (reading 'data')" — on this project's Next 16.3.8. Without appDirectory,
// usePathname() returns null instead, which Tabbar.tsx doesn't guard against.
// Root-caused by reading node_modules/@storybook/nextjs-vite's mock source;
// looks like a Storybook/Next version mismatch, not a story bug.
const meta = {
  component: Tabbar,
  tags: ['ai-generated', 'needs-work'],
} satisfies Meta<typeof Tabbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnAccueil: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: '/' } } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /accueil/i })).toHaveAttribute('aria-current', 'page');
  },
};

export const OnBalades: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: '/balades' } } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /balades/i })).toHaveAttribute('aria-current', 'page');
    await expect(canvas.getByRole('link', { name: /accueil/i })).not.toHaveAttribute('aria-current');
  },
};

// Tabbar hides itself entirely on these routes (HIDDEN_PREFIXES in Tabbar.tsx) — renders nothing.
export const HiddenDuringOnboarding: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: '/onboarding' } } },
};
