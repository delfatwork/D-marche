import type { Preview } from '@storybook/nextjs-vite'
import '../app/globals.css'
import { AppStateProvider } from '../app/lib/app-state'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },

  decorators: [
    (Story) => (
      <AppStateProvider>
        <Story />
      </AppStateProvider>
    ),
  ],

  async beforeEach() {
    // App-D-marche has no backend: state lives in localStorage under this
    // key (see app/lib/app-state.tsx). Seed an onboarded, non-"isNew" user
    // so components that read useAppState() render real data, not the
    // first-run / "–" placeholder state.
    localStorage.setItem(
      'dmarche-v1',
      JSON.stringify({
        level: 'progresser',
        goalMetric: 'duree',
        onboarded: true,
        isNew: false,
        name: 'Alex',
      })
    );
  },
};

export default preview;