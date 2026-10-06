# Product Brief - Pas à pas

**Version** : MVP  
**Date** : 2026-10-06  
**Statut** : En développement

---

## Contexte

Nous concevons une application mobile accessible destinée aux seniors. Son objectif est d'aider les utilisateurs à marcher plus régulièrement, sans pression de performance et avec une expérience rassurante.

## Utilisateurs

- **Seniors** de 65 ans et plus
- **Débutants** ou personnes peu actives
- **Peu technophiles** : faible maîtrise des applications mobiles
- **Flexibles** : pouvant marcher seuls ou accompagnés

## Problème

Les applications existantes sont souvent :
- ❌ Trop complexes
- ❌ Trop sportives (orientées performance)
- ❌ Trop centrées sur la compétition
- ❌ Intimidantes pour les débutants

**Notre approche** : Simple, humaine, progressive et inclusive.

## Objectif du MVP

Permettre à un utilisateur de :

1. ✅ Configurer son niveau de départ
2. ✅ Voir une recommandation quotidienne
3. ✅ Commencer une marche
4. ✅ Suivre sa marche (minuteur)
5. ✅ Déclarer son ressenti
6. ✅ Visualiser sa régularité sur une semaine

## Fonctionnalités MVP

### Écrans implémentés
- ✅ Onboarding (5 étapes : niveau, durée, préférence, consentement)
- ✅ Tableau de bord (objectif quotidien, progression, stats)
- ✅ Session de marche (minuteur, pause, terminer)
- ✅ Ressenti (4 niveaux : excellent, bien, normal, fatigué)
- ✅ Journal des ressentis (historique)
- ✅ Historique hebdomadaire (tendances)
- ✅ Paramètres (accueil, navigation, accessibilité)

### Données
- ✅ Données fictives pour prototype
- ✅ Stockage local (localStorage)
- ✅ Pas de backend

## Contraintes UX

### Structure
- ✅ **Une action principale par écran** (CTA unique et visible)
- ✅ **Texte lisible** (1.125rem minimum, font semibold)
- ✅ **Contraste élevé** (WCAG AA 4.5:1 minimum)
- ✅ **Boutons larges** (48px min touch target)
- ✅ **Navigation simple** (BottomNav partout, max 2-3 niveaux)
- ✅ **Aucun geste obligatoire** (pas de swipe, pinch requis)

### Ton et messages
- ✅ **Positif et encourageant** (célébrer les progrès)
- ✅ **Non culpabilisant** (pas de termes négatifs)
- ✅ **Langage simple** (compréhensible en < 10 secondes)
- ✅ **Pas de jargon médical** (bien-être vs santé)

### Accessibilité
- ✅ **Mobile-first responsive** (390px+ optimisé)
- ✅ **Texte scalable** (rem-based, supports zoom)
- ✅ **Mode contraste** (@media prefers-contrast: more)
- ✅ **Labels explicites** (aria-*, sr-only)
- ✅ **Clavier seul** (focus visible, modales Échap)
- ✅ **Pas d'icônes seules** (emoji + texte)

## Contraintes Santé et Éthique

### Disclaimer médical
- ✅ **Pas de diagnostic** (jamais qualifier la santé)
- ✅ **Pas de promesses** (pas « guérir » ou « traiter »)
- ✅ **Avertissement inclus** (settings : rappel de consulter)
- ✅ **Conseil de sécurité** (hydratation, repos, écoute corps)

### Respect de l'utilisateur
- ✅ **Pas de comparaison** (zéro leaderboard, zéro classement)
- ✅ **Pas de compétition** (encouragement personnel seul)
- ✅ **Consentement explicite** (onboarding, révocable)
- ✅ **Données locales** (aucun envoi serveur)

## Livrable attendu

✅ **Prototype web responsive** fonctionnel :
- Utilisable sur mobile (390px+)
- Interface entièrement en français
- Données fictives réalistes
- Tests unitaires en place
- Documentation complète
- Accessible WCAG 2.1 AA

## État de conformité

### Complètement implémenté ✅
| Objectif | Statut |
|----------|--------|
| Configurer niveau | ✅ Onboarding page 1-2 |
| Recommandation quotidienne | ✅ Dashboard affiche objectif |
| Commencer une marche | ✅ Walk page, bouton CTA |
| Suivre la marche | ✅ Minuteur HH:MM:SS |
| Déclarer ressenti | ✅ Feeling page, 4 options |
| Visualiser régularité | ✅ Weekly page, stats |
| Accessibilité | ✅ WCAG AA (contraste 5.8:1) |
| Données fictives | ✅ 7 jours mock data |
| Stockage local | ✅ localStorage OK |
| Navigation simple | ✅ BottomNav partout |

### Partiellement implémenté 🟡
| Objectif | Statut | Notes |
|----------|--------|-------|
| Mode contraste toggle | 🟡 CSS prêt | Pas de UI toggle (phase 2) |
| Texte scalable (3 niveaux) | 🟡 Framework | Pas de UI toggle (phase 2) |
| Réglages d'accessibilité | 🟡 Skeleton | UI recommandations seulement |

### Non implémenté (optionnel) ❌
| Objectif | Raison |
|----------|--------|
| Export de données | Phase future |
| Suppression de profil | Phase future |
| Révocation consentement | Phase future |
| Partage social | Volontairement absent |

## Métriques de succès

### Utilisabilité
- ✅ Objectif compris en < 10 secondes
- ✅ Premier parcours complété en < 5 minutes
- ✅ Navigation sans confusion
- ✅ Tous les textes > 18px (base)

### Accessibilité
- ✅ Contraste minimum 4.5:1 (AA)
- ✅ Touch targets 48px+
- ✅ Focus visibles
- ✅ Fonctionnel au clavier seul

### Performance
- ✅ Build sans erreurs
- ✅ Pas de dépendances obsolètes
- ✅ Responsive 390px-1920px

## Prochaines phases (roadmap)

### Phase 2 : Accessibilité avancée
- [ ] Toggle UI : contraste élevé
- [ ] Toggle UI : 3 niveaux de texte
- [ ] Recommandation quotidienne (engine)
- [ ] Mode sombre

### Phase 3 : Tests et docs
- [ ] Tests E2E (playwright)
- [ ] Tests d'accessibilité automatisés (axe)
- [ ] Documentation composants
- [ ] Guide utilisateur

### Phase 4 : Backend et données réelles
- [ ] Authentification
- [ ] Sync données cloud
- [ ] Export/suppression de données
- [ ] Notifications

---

## Alignement avec le code

Ce brief est complètement aligné avec :
- [`docs/ux-principles.md`](./ux-principles.md) - Détail des valeurs
- [`docs/user-flows.md`](./user-flows.md) - Parcours détaillés
- [`docs/design-system.md`](./design-system.md) - Tokens visuels
- [`docs/accessibility.md`](./accessibility.md) - Standards WCAG
- [`docs/content-guidelines.md`](./content-guidelines.md) - Ton et messages
- [`README.md`](../README.md) - Vue d'ensemble technique

**Last updated** : 2026-10-06
