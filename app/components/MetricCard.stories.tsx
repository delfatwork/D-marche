import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import MetricCard from './MetricCard';
import { RouteIcon, StepsIcon, TargetIcon } from './icons';
import { nf } from '@/app/lib/format';

const meta = {
  component: MetricCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MoyennePas: Story = {
  args: {
    icon: <StepsIcon className="metric-card-ico" />,
    label: 'Moyenne pas',
    value: nf(6043),
    unit: 'par jour',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Moyenne pas')).toBeVisible();
    await expect(canvas.getByText('par jour')).toBeVisible();
  },
};

export const DureeTotale: Story = {
  args: {
    icon: <TargetIcon className="metric-card-ico" />,
    label: 'Durée totale',
    value: nf(423),
    unit: 'min',
  },
};

export const NbSorties: Story = {
  args: {
    icon: <RouteIcon className="metric-card-ico" />,
    label: 'Nb de sorties',
    value: nf(5),
    unit: 'au total',
  },
};
