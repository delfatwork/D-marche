import { useState, useCallback, useEffect } from 'react';
import { User, Walk, AppState } from './types';
import { mockUser, mockWalks } from './mock-data';

const STORAGE_KEY = 'pasapas-app-state';

// Obtenir la date d'aujourd'hui au format YYYY-MM-DD en heure locale
function getTodayDateString() {
  const now = new Date();
  return now.toLocaleDateString('en-CA'); // 'en-CA' format retourne YYYY-MM-DD en heure locale
}

export function useAppState() {
  const [state, setState] = useState<AppState>({
    user: null,
    walks: [],
    isLoading: true,
  });

  // Charger les données au montage
  useEffect(() => {
    loadState();
  }, []);

  // Charger depuis localStorage ou initialiser vide pour nouvel utilisateur
  const loadState = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setState(parsed);
      } else {
        // Première visite: état vide pour forcer l'onboarding
        setState({
          user: null,
          walks: [],
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'état:', error);
      // En cas d'erreur, état vide
      setState({
        user: null,
        walks: [],
        isLoading: false,
      });
    }
  }, []);

  // Sauvegarder l'état dans localStorage
  const saveState = useCallback((newState: AppState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      setState(newState);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'état:', error);
    }
  }, []);

  // Créer/mettre à jour l'utilisateur
  const setUser = useCallback(
    (user: User) => {
      saveState({ ...state, user });
    },
    [state, saveState]
  );

  // Ajouter une marche
  const addWalk = useCallback(
    (walk: Walk) => {
      const updatedWalks = [...state.walks, walk];
      saveState({ ...state, walks: updatedWalks });
    },
    [state, saveState]
  );

  // Mettre à jour une marche
  const updateWalk = useCallback(
    (walkId: string, updates: Partial<Walk>) => {
      const updatedWalks = state.walks.map(w =>
        w.id === walkId ? { ...w, ...updates } : w
      );
      saveState({ ...state, walks: updatedWalks });
    },
    [state, saveState]
  );

  // Obtenir la marche d'aujourd'hui
  const getTodayWalk = useCallback(() => {
    const today = getTodayDateString();
    return state.walks.find(w => w.date === today);
  }, [state.walks]);

  // Obtenir les marches des 7 derniers jours
  const getWeeklyWalks = useCallback(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return state.walks.filter(w => {
      const walkDate = new Date(w.date + 'T00:00:00');
      return walkDate >= sevenDaysAgo && walkDate <= today;
    });
  }, [state.walks]);

  // Obtenir les statistiques du ressenti
  const getFeelingStats = useCallback(() => {
    const stats = {
      excellent: 0,
      bien: 0,
      normal: 0,
      fatigue: 0,
    };

    state.walks.forEach(walk => {
      if (walk.feeling) {
        stats[walk.feeling]++;
      }
    });

    return stats;
  }, [state.walks]);

  // Réinitialiser l'app (pour développement)
  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      user: null,
      walks: [],
      isLoading: false,
    });
  }, []);

  return {
    // État
    user: state.user,
    walks: state.walks,
    isLoading: state.isLoading,

    // Actions
    setUser,
    addWalk,
    updateWalk,

    // Sélecteurs
    getTodayWalk,
    getWeeklyWalks,
    getFeelingStats,

    // Utilitaires
    reset,
  };
}
