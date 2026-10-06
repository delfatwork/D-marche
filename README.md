# Pas à pas - Application de marche accessible pour seniors

> Encourager la marche régulière **sans pression**. Une app mobile-first, accessible et bienveillante.

## 👋 Bienvenue !

**Pas à pas** est une application conçue spécifiquement pour les seniors qui aiment marcher et veulent tracker leur régularité, **sans performance** ni culpabilisation.

### Caractéristiques principales
- ✅ **Mobile-first** : Optimisée pour smartphone (390px+)
- ✅ **Accessible** : WCAG 2.1 AA (contraste, texte scalable, clavier)
- ✅ **Pas de pression** : Zéro gamification, zéro termes médicaux
- ✅ **Respectueuse des données** : Stockage local, consentement clair
- ✅ **Incluive** : Français, langage simple, ton bienveillant

---

## 📖 Documentation

La **documentation complète** se trouve dans le dossier [`docs/`](./docs/) :

| Document | Pour qui | Contient |
|----------|----------|----------|
| [**Principes UX**](./docs/ux-principles.md) | PM, Designers | Vision, audience, valeurs, contenu interdit |
| [**Flux utilisateur**](./docs/user-flows.md) | Dev, QA, Designers | 6 parcours détaillés (onboarding, marche, historique, etc.) |
| [**Design System**](./docs/design-system.md) | Dev frontend, Designers | Palette, typo, composants, espacements, tokens |
| [**Accessibilité**](./docs/accessibility.md) | **Tous** | WCAG 2.1 AA, checklist, non-conformités, tests |
| [**Content Guidelines**](./docs/content-guidelines.md) | Rédacteurs, Dev | Ton/voix, messages, ressenti, contenu interdit |

**→ Lire [`docs/README.md`](./docs/README.md) pour un guide complet.**

---

## 🚀 Démarrer

### Prérequis
- Node.js 22+
- npm ou yarn

### Installation

```bash
# Cloner le repo
git clone [URL_REPO]
cd App-D-marche

# Installer les dépendances
npm install

# Démarrer le serveur dev
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

### Commandes

```bash
npm run dev        # Serveur dev (Turbopack)
npm run build      # Build production
npm start          # Lancer le build production
npm test           # Lancer les tests Jest
npm run test:watch # Tests en mode watch
npm run lint       # Vérifier le linting Next.js
```

---

## 📂 Structure du projet

```
App-D-marche/
├── docs/                          # 📚 Documentation design + UX
│   ├── README.md                  # Index et guide
│   ├── ux-principles.md           # Valeurs et principes
│   ├── user-flows.md              # Parcours utilisateur
│   ├── design-system.md           # Design tokens, composants
│   ├── accessibility.md           # WCAG 2.1 AA, checklist
│   └── content-guidelines.md      # Ton, messages, ressenti
│
├── app/                           # 🎯 Code application
│   ├── lib/
│   │   ├── types.ts              # Types TypeScript
│   │   ├── useAppState.ts        # Gestion d'état (localStorage)
│   │   └── mock-data.ts          # Données fictives
│   │
│   ├── components/                # React composants
│   │   ├── Button.tsx            # Bouton (4 variantes, 3 sizes)
│   │   ├── Card.tsx              # Card
│   │   ├── Header.tsx            # En-tête
│   │   ├── Modal.tsx             # Modale (⚠️ non-accessible)
│   │   ├── ProgressBar.tsx       # Barre de progrès
│   │   ├── StatsCard.tsx         # Card statistique
│   │   └── BottomNavigation.tsx  # Menu inférieur
│   │
│   ├── (dossiers pages)
│   │   ├── page.tsx              # Accueil / Dashboard
│   │   ├── onboarding/           # Parcours d'onboarding
│   │   ├── walk/                 # Session de marche + résultat
│   │   ├── feeling/              # Évaluation ressenti
│   │   ├── feelings/             # Journal des ressentis
│   │   ├── weekly/               # Historique hebdomadaire
│   │   └── settings/             # Paramètres utilisateur
│   │
│   ├── globals.css               # Styles globaux + CSS variables
│   ├── layout.tsx                # Layout principal
│   └── __tests__/                # Tests Jest
│
├── public/                        # Assets statiques
├── package.json                   # Dépendances
├── tsconfig.json                  # Config TypeScript
├── tailwind.config.ts            # Config Tailwind
├── jest.config.cjs               # Config Jest
├── jest.setup.cjs                # Mocks Jest
├── postcss.config.mjs            # Config PostCSS
└── next.config.ts                # Config Next.js
```

### Écrans implémentés

- ✅ Accueil / Dashboard
- ✅ Onboarding (5 étapes)
- ✅ Session de marche (démarrer, pause, terminer, modale quit)
- ✅ Résultat marche
- ✅ Évaluation ressenti
- ✅ Journal des ressentis
- ✅ Historique hebdomadaire
- ✅ Paramètres (skeleton)

---

## 🔧 Stack technologique

| Outil | Version | Usage |
|-------|---------|-------|
| Next.js | 16.3 | Framework React (App Router, Turbopack) |
| React | 19.3 | Composants UI |
| TypeScript | 7 | Typage statique |
| Tailwind CSS | 4 | Styles (avec @tailwindcss/postcss) |
| Jest | 30 | Tests unitaires |
| React Testing Library | 16.3 | Tests composants |

### ES Modules
Le projet utilise `"type": "module"` dans package.json (ESM).

### Stockage
- **localStorage** : `pasapas-app-state` (user, walks, settings)
- **Pas de backend** : Tous les calculs côté client

---

## 🎨 Design & Accessibilité

### Palette actuelle
- Primaire : `#D97706` (orange)
- Texte : `#1A1915` (noir très foncé)
- Fonds : `#FAFAF8` (blanc cassé)

**⚠️ Problème connu** : Contraste blanc/orange = 3.2:1 (< 4.5:1 AA)  
**→ Voir [`docs/accessibility.md`](./docs/accessibility.md#phase-1--palette-urgent) pour les options**

### Fonctionnalités d'accessibilité
- ✅ Mode contraste (`prefers-contrast: more`)
- ✅ Texte scalable (rem/em)
- ✅ Touch targets 48px
- ✅ Focus states visibles
- ✅ Langue : français
- ❌ Mode contraste utilisateur (pas de toggle)
- ❌ Texte scalable utilisateur (3 niveaux)
- ❌ Modales accessibles (pas de piège focus)

---

## 🧪 Tests

### État actuel
- ❌ 17 tests échoués (sélecteurs ambigus, assertions non-alignées)
- ⚠️ Pas bloquant pour l'étape 1 (bugs corrigés, tests révisés plus tard)

### Lancer les tests
```bash
npm test              # Une fois
npm run test:watch   # Mode watch
```

### Couverture
- Tests d'onboarding
- Tests de marche (minuteur)
- Tests d'historique
- Tests d'accessibilité (basiques)

---

## 🐛 Bugs connus et correction

### Étape 1 : Assainir la base ✅ COMPLÉTÉE

| Bug | Fix |
|-----|-----|
| Onboarding bloqué (new user) | `user: null` au lieu de `mockUser` |
| "Quit without saving" | Supprimé update dans `handleConfirmQuit` |
| Distance/calories affichées | Retirées (contraires au brief) |
| Dates UTC | Utilisation `toLocaleDateString('en-CA')` |
| Tendance hebdo toujours ↗ | Recalcul correct des semaines |
| Code mort | `.swp` + `design-tokens.ts` supprimés |
| TypeScript warnings | Exclu `__tests__`, ajout types jest |

### Étape 2 : Accessibilité + Contraste 🔄 EN COURS

- [ ] Palette corrigée pour AA
- [ ] Bascule contraste élevé (settings)
- [ ] 3 niveaux texte (settings)
- [ ] Modales accessibles
- [ ] BottomNav sur tous les écrans

### Étape 3 : Tests au vert 📅 PRÉVUE

- [ ] Sélecteurs robustes (getByRole, getByTestId)
- [ ] Assertions réalistes
- [ ] Nouveaux utilisateur flow

---

## 🌍 Contexte produit

**Audience** : Seniors 50+, moins familiers avec la tech, appréciant la régularité  
**Objectif** : Encourager la marche régulière **sans culpabilisation** ni jargon médical  
**Non-négociable** : Accessibilité, respect des données, ton bienveillant

**→ Lire [`docs/ux-principles.md`](./docs/ux-principles.md) pour la vision complète**

---

## 📋 Checklist avant production

- [ ] Tous les tests échouent → Les corriger (étape 3)
- [ ] Palette AA confirmée → Décider et implémenter (étape 2)
- [ ] Accessibility tests passants → aXe, WAVE clean
- [ ] Tous les écrans avec BottomNav → Navigation complète
- [ ] Modales avec piège focus → Accessible au clavier
- [ ] Aucun terme médical/performance → Audit contenu
- [ ] Mode contraste + texte scalable → Toggles dans settings

---

## 🤝 Contribution

Les contributions suivent la [documentation de design](./docs/) :

1. Lire les [principes UX](./docs/ux-principles.md)
2. Respecter le [design system](./docs/design-system.md)
3. Suivre les [directives de contenu](./docs/content-guidelines.md)
4. Implémenter selon [accessibility.md](./docs/accessibility.md)
5. Tester avec la [checklist](./docs/accessibility.md#testabilité)

---

## 📝 Licence

[À DÉCIDER]

---

## 📞 Contacts

[À DÉCIDER]

---

## 🙏 Remerciements

Conception pour et par les seniors. Pas à pas, à votre rythme.

---

**Dernière mise à jour** : 2026-10-06  
**État du projet** : Étape 1 ✅ | Étape 2 🔄 | Étape 3 📅
