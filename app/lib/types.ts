// Types pour l'application

export type UserLevel = 'debutant' | 'intermediaire' | 'regulier';
export type Feeling = 'excellent' | 'bien' | 'normal' | 'fatigue';
export type CompanyPreference = 'seul' | 'accompagne' | 'indifferent';

export interface User {
  id: string;
  name: string;
  level: UserLevel;
  dailyGoalMinutes: number;
  companyPreference: CompanyPreference;
  dataConsent: boolean;
  privacyConsent: boolean;
  onboardingComplete: boolean;
  createdAt: string;
}

export interface Walk {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  durationMinutes: number;
  feeling: Feeling | null;
  notes: string;
  createdAt: string;
}

export interface AppState {
  user: User | null;
  walks: Walk[];
  isLoading: boolean;
}
