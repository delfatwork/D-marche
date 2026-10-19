import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import WeekTotalCard from './WeekTotalCard';
import { CheckIcon, RouteIcon, StepsIcon, TargetIcon } from './icons';
import { buildDemoWeek, INITIALS, DAY, STEP_MIN, stepsOf } from '@/app/lib/week';
import { nf } from '@/app/lib/format';

// Same construction as the `days` list in app/page.tsx, reused here so the
// story exercises the real .days.mini markup (ticks + day letters) rather
// than a reinvented fixture.
const week = buildDemoWeek();
const days = week.map((d, i) => (
  <li key={i} className={`${d.min ? 'walked' : ''}${d.today ? ' today' : ''}`}>
    <span className="ini" aria-hidden="true">{INITIALS[d.dow]}</span>
    <span className="tick" aria-hidden="true">{d.min ? <CheckIcon /> : null}</span>
    <span className="sr-only">{DAY[d.dow]}{d.today ? ", aujourd'hui" : ''} : {d.min ? 'marche faite' : 'pas de marche'}</span>
  </li>
));

const totalSteps = week.reduce((acc, d) => acc + stepsOf(d), 0);
const totalMin = week.reduce((acc, d) => acc + d.min, 0);
const sortiesWeek = week.reduce((acc, d) => acc + (stepsOf(d) > 0 ? Math.ceil(stepsOf(d) / 1200) : 0), 0);

const meta = {
  component: WeekTotalCard,
  tags: ['ai-generated'],
  args: { days },
} satisfies Meta<typeof WeekTotalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TotalPas: Story = {
  args: {
    icon: <StepsIcon className="kpi-total-ico" />,
    label: 'Total pas',
    value: nf(totalSteps),
    href: '/activite/pas',
    ariaLabel: 'Voir le détail des pas sur 7 jours',
  },
  play: async ({ canvas }) => {
    // href-based card: it's a Link, not an article — same component, different root tag.
    await expect(canvas.getByRole('link')).toHaveAttribute('href', '/activite/pas');
  },
};

export const TotalSorties: Story = {
  args: {
    icon: <RouteIcon className="kpi-total-ico" />,
    label: 'Total sorties',
    value: nf(sortiesWeek),
  },
  play: async ({ canvas }) => {
    // No href on this variant: renders as a plain <article>, not a link.
    await expect(canvas.queryByRole('link')).toBeNull();
  },
};

export const TempsTotal: Story = {
  args: {
    icon: <TargetIcon className="kpi-total-ico" />,
    label: 'Temps total',
    value: <>{nf(totalMin)} <small>min</small></>,
    href: '/activite/pas',
    ariaLabel: 'Voir le détail des pas sur 7 jours',
  },
};

// isNew state (no walk recorded yet): app/page.tsx swaps the value for "–".
export const NouvelUtilisateur: Story = {
  args: {
    icon: <StepsIcon className="kpi-total-ico" />,
    label: 'Total pas',
    value: '–',
    href: '/activite/pas',
    ariaLabel: 'Voir le détail des pas sur 7 jours',
  },
};
