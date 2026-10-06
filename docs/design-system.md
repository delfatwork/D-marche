# Design System - Pas à pas

## Filosofie
- **Mobile-first** : Conçu pour 390 px (iPhone SE)
- **Accessible** : WCAG AA, touch-friendly, texte scalable
- **Minimaliste** : Pas de décoration superflue, focus sur le contenu
- **Chaleureux** : Émojis et couleurs douces pour encouragement

---

## Palette de couleurs

### Couleurs principales

| Nom | Hex | Usage | Contraste |
|-----|-----|-------|-----------|
| Primaire | `#D97706` | Boutons, CTA, accents | ⚠️ 3.2:1 sur blanc (non-AA) |
| Primaire Dark | `#92400E` | Texte sur fond primaire | ✅ OK |
| Primaire Light | `#FED7AA` | Arrière-plan card | ✅ OK |
| Secondaire | `#F97316` | Variante primaire | ⚠️ 2.8:1 sur blanc (non-AA) |
| Succès | `#10B981` | Validation, objectif atteint | ✅ 4.5:1 sur blanc |
| Info | `#3B82F6` | Messages informatifs | ✅ 4.5:1 sur blanc |
| Texte principal | `#1A1915` | Texte corps, headings | ✅ 21:1 sur blanc |
| Texte secondaire | `#57564F` | Texte léger, labels | ✅ 9.1:1 sur blanc |
| Texte gris | `#A3A39D` | Texte très léger | ⚠️ 4.3:1 sur blanc (limite) |
| Fond | `#FAFAF8` | Arrière-plan page | ✅ OK |
| Bordure | `#E8E8E5` | Séparateurs, bordures | ✅ OK |

### État du texte

**[À DÉCIDER]** Correction palette pour WCAG AA:
- Option 1 : Primaire → `#C85A17` (plus foncé, 5.2:1)
- Option 2 : Primaire → `#B45300` (5.8:1)
- Option 3 : Garder `#D97706` mais utiliser seulement sur fonds clairs (`#FEF3C7`)

### Mode contraste élevé

**[À DÉCIDER]** Surcharges CSS :

```css
[data-contrast="high"] {
  --color-primary: #8B5A00;      /* Plus foncé */
  --color-text: #000000;          /* Noir pur */
  --color-text-secondary: #333333;
  --color-border: #333333;        /* Bordures visibles */
}
```

---

## Typographie

### Family
- **Body** : Système (sans-serif)
  - macOS/iOS : `-apple-system, BlinkMacSystemFont, "Segoe UI"`
  - Fallback : `sans-serif`
- **Mono** : `Courier New, monospace` (si nécessaire)

### Scales

**Desktop / Tablet**
| Usage | Taille | Poids | Line height |
|-------|--------|-------|-------------|
| H1 (Grand titre) | 2rem (32px) | 700 | 1.2 |
| H2 (Titre section) | 1.75rem (28px) | 700 | 1.3 |
| H3 (Titre card) | 1.5rem (24px) | 600 | 1.3 |
| Body Large | 1.125rem (18px) | 400 | 1.6 |
| Body Normal | 1rem (16px) | 400 | 1.6 |
| Body Small | 0.875rem (14px) | 400 | 1.5 |
| Caption | 0.75rem (12px) | 400 | 1.4 |

**Mobile**
| Usage | Taille | Notes |
|-------|--------|-------|
| H1 | 1.75rem (28px) | Réduit pour mobile |
| Body Normal | 1rem (16px) | Min pour lisibilité |
| Caption | 0.875rem (14px) | Jamais en-dessous |

### Échelle de texte utilisateur

**[À DÉCIDER]** 3 niveaux persistence dans `localStorage` + attribut `data-text-size`:

```css
/* Petit (0.9x) */
[data-text-size="small"] {
  font-size: 0.9em;
}

/* Normal (1x) - défaut */
[data-text-size="normal"] {
  font-size: 1em;
}

/* Grand (1.25x) */
[data-text-size="large"] {
  font-size: 1.25em;
}
```

---

## Espacements

### Système de grid

Base : `0.25rem` (4px)

| Nom | Pixels | Rem | Usage |
|-----|--------|-----|-------|
| xs | 4px | 0.25rem | Espaces micro |
| sm | 8px | 0.5rem | Padding intra-composant |
| md | 16px | 1rem | Padding composant normal |
| lg | 24px | 1.5rem | Espaces entre sections |
| xl | 32px | 2rem | Grands espaces |
| 2xl | 48px | 3rem | Très grands espaces |

### Touch targets

- **Minimum** : 48px × 48px (recommandation WCAG)
- **Confortable** : 56px × 56px+
- Appliqué aux : Boutons, links interactifs, inputs

### Padding standard

- **Pages** : 24px (lg) horizontalement, 32px (xl) verticalement
- **Cards** : 16px (md) dans tous les sens
- **Boutons** : 16px (md) horizontalement, 12px (sm) verticalement

---

## Composants

### Button

**Variantes**

| Variante | Bg | Text | Hover | Active |
|----------|----|----|-------|--------|
| Primary | `#D97706` | White | `#92400E` | `#7C2D12` |
| Secondary | `#E8E8E5` | `#1A1915` | `#D6D6D0` | `#BFBFB9` |
| Tertiary | Transparent | `#D97706` | Underline | `#92400E` |
| Danger | `#EF4444` | White | `#DC2626` | `#B91C1C` |

**Sizes**

| Taille | Padding | Font | Min-height |
|--------|---------|------|------------|
| sm | 8px 16px | 0.875rem | 40px |
| md | 12px 24px | 1rem | 48px |
| lg | 16px 32px | 1.125rem | 56px |

**Focus state**
- Outline : 2px solid `#D97706`
- Offset : 2px

**[À DÉCIDER]** Boutons en mode contraste :
- Bordures : 2px au lieu de remplissage

### Card

```css
/* Style de base */
.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 16px;
}

/* Avec elevation */
.card.elevated {
  box-shadow: 0 4px 6px rgba(0,0,0,0.15);
}

/* Avec gradient (accueil) */
.card.gradient {
  background: linear-gradient(135deg, #FEF3C7 0%, #FED7AA 100%);
}
```

### Modal

```css
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  padding: 24px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
}
```

**[À DÉCIDER]** Accessibilité modale :
- `role="alertdialog"` ou `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` + `aria-describedby`
- Piège focus (focus wrapper)
- Fermeture à Échap

### ProgressBar

```jsx
<div role="progressbar" aria-label="Progression: 12 sur 20 minutes"
     aria-valuenow={12} aria-valuemin={0} aria-valuemax={20}>
  <div style={{width: '60%'}} />
</div>
```

### BottomNavigation

- Position : Fixed, bottom 0
- Hauteur : 64px (avec padding)
- Items : Icône emoji + label
- Active : Couleur primaire + underline épais
- Tous les écrans : [À DÉCIDER] actuellement que l'accueil

---

## Shadows

| Nom | Valeur |
|-----|--------|
| base | `0 1px 3px rgba(0,0,0,0.1)` |
| md | `0 4px 6px rgba(0,0,0,0.1)` |
| lg | `0 10px 40px rgba(0,0,0,0.2)` |

---

## Transitions

| Propriété | Durée | Easing |
|-----------|-------|--------|
| Couleur | 250ms | ease-in-out |
| Transform | 250ms | ease-in-out |
| Opacity | 200ms | ease-in |

---

## Outils de développement

### Tailwind v4 Config

**[À DÉCIDER]** Migration de Tailwind v3 → v4 :
- Remplacer `@tailwind base/components/utilities` par `@import "tailwindcss"`
- Migrer tokens vers `@theme` block
- Générer classes arbitraires depuis `tailwind.config.ts`

### CSS Variables (globals.css)

```css
:root {
  /* Colors */
  --color-primary: #D97706;
  --color-primary-dark: #92400E;
  --color-primary-light: #FED7AA;
  --color-text: #1A1915;
  --color-text-secondary: #57564F;
  --color-bg: #FAFAF8;
  
  /* Typography */
  --font-size-base: 1.125rem;
  
  /* Spacing */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  
  /* Shadows */
  --shadow-base: 0 1px 3px rgba(0,0,0,0.1);
}
```

---

**Statut** : Complété (avec [À DÉCIDER] pour améliorations)  
**Mise à jour** : 2026-10-06  
**Dépendances** : [accessibility.md](accessibility.md)
