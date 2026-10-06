import { User, Walk } from './types';

// Utilisateur fictif
export const mockUser: User = {
  id: 'user-1',
  name: 'Marie',
  level: 'intermediaire',
  dailyGoalMinutes: 20,
  companyPreference: 'indifferent',
  dataConsent: true,
  privacyConsent: true,
  onboardingComplete: true,
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
};

// Marches fictives de la semaine passée
export const mockWalks: Walk[] = [
  {
    id: 'walk-1',
    userId: 'user-1',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    durationMinutes: 20,
    feeling: 'bien',
    notes: 'Belle promenade au parc',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'walk-2',
    userId: 'user-1',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    durationMinutes: 25,
    feeling: 'excellent',
    notes: 'Très énergique aujourd\'hui',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'walk-3',
    userId: 'user-1',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    durationMinutes: 15,
    feeling: 'normal',
    notes: 'Marche courte mais régulière',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'walk-4',
    userId: 'user-1',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    durationMinutes: 20,
    feeling: 'bien',
    notes: '',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'walk-5',
    userId: 'user-1',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    durationMinutes: 30,
    feeling: 'excellent',
    notes: 'Vraiment agréable',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'walk-6',
    userId: 'user-1',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    durationMinutes: 25,
    feeling: 'bien',
    notes: 'Bonne marche',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Configurations pour l'onboarding
export const levelConfigs = {
  debutant: {
    title: 'Je débute',
    description: 'Je marche peu ou pas régulièrement',
    dailyGoal: 15,
    emoji: '🚶',
  },
  intermediaire: {
    title: 'Je marche régulièrement',
    description: 'Je marche quelques fois par semaine',
    dailyGoal: 20,
    emoji: '🚶‍♂️',
  },
  regulier: {
    title: 'Je suis actif',
    description: 'Je marche presque tous les jours',
    dailyGoal: 30,
    emoji: '🏃',
  },
};

export const durationOptions = [
  { id: 10, label: '10 minutes', description: 'Une marche courte' },
  { id: 15, label: '15 minutes', description: 'Une marche douce' },
  { id: 20, label: '20 minutes', description: 'Une marche régulière' },
  { id: 30, label: '30 minutes', description: 'Une marche plus longue' },
  { id: 45, label: '45 minutes', description: 'Une belle promenade' },
];

export const companyOptions = [
  {
    id: 'seul' as const,
    label: 'Seul',
    emoji: '🚶',
    description: 'J\'aime marcher en solitaire',
  },
  {
    id: 'accompagne' as const,
    label: 'Accompagné',
    emoji: '👥',
    description: 'J\'aime marcher avec quelqu\'un',
  },
  {
    id: 'indifferent' as const,
    label: 'Indifférent',
    emoji: '🤝',
    description: 'Seul ou accompagné, c\'est pareil',
  },
];
