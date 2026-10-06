# Proposition de tokens visuels - Pas à pas

**Date** : 2026-10-06  
**Statut** : Audit & Proposition (À valider avant implémentation)

---

## 1. Audit des tokens existants

### 1.1 Sources actuelles des tokens

| Source | Couverture | État |
|--------|-----------|------|
| `globals.css` (CSS variables) | Couleurs, typo base, espacement, focus | ✅ Actif |
| `tailwind.config.ts` (extend) | Couleurs, fontSize, spacing | ⚠️ Partiel (OLD PRIMARY) |
| Hardcodes dans composants | Rayons, ombres, tous les styles détaillés | ❌ Fragmenté |
| `design-tokens.ts` | Complet (jamais importé) | ❌ Mort |

### 1.2 Problèmes identifiés

**Incohérences critiques** :
1. `tailwind.config.ts` n'a PAS été mis à jour lors du changement #D97706 → #B45300
   - Line 11: `'primary': '#D97706'` (OBSOLÈTE)
   - Doit être : `'primary': '#B45300'`
2. Tous les hardcodes restent dans composants (Button.tsx, StatsCard.tsx, Modal.tsx, etc.)
3. Aucun token pour rayons (border-radius) centralisé
4. Aucun token pour ombres (shadows) défini à Tailwind
5. Pas de tokens pour mode contraste élevé au niveau Tailwind

**Fragmentations** :
- Couleurs : CSS vars + Tailwind extend + hardcodes `bg-[#...]`
- Typography : Tailwind `fontSize` + hardcodes `text-[1rem]`
- Espacement : Tailwind `spacing` + hardcodes `p-6`, `mb-8`
- Rayons : Hardcodes seulement (`rounded-2xl`, `rounded-xl`, `rounded-lg`)

---

## 2. Tokens existants (Source de vérité actuelle)

### 2.1 Couleurs

#### Primaires
```
Primary Light   : #FEF3C7  (arrière-plan clair)
Primary         : #B45300  (NEW - était #D97706) ✅ AA conforme (5.8:1)
Primary Dark    : #92400E  (texte sur primaire, hover/active)
```

#### Secondaires
```
Secondary Light : #FED7AA
Secondary       : #F97316
Secondary Dark  : #9A3412
```

#### Sémantiques
```
Success         : #10B981  (tendance ↗, validation)
Warning         : #EAB308  (non utilisé actuellement)
Danger          : #EF4444  (bouton danger, reset)
Info            : #3B82F6  (messages info)
```

#### Neutres
```
Neutral 50  : #FAFAF8  (background page)
Neutral 100 : #F5F5F3  (background hover)
Neutral 200 : #E8E8E5  (borders, séparateurs)
Neutral 600 : #57564F  (texte secondaire)
Neutral 900 : #1A1915  (texte principal)
```

### 2.2 Typographie

#### Families
```
Body : -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Mono : (non défini)
```

#### Sizes (Tailwind)
```
xs   : 14px / 20px line-height
sm   : 16px / 24px
base : 18px / 28px  (size par défaut)
lg   : 20px / 30px
xl   : 24px / 36px
2xl  : 28px / 40px
3xl  : 32px / 44px
```

#### Weights (hardcodes)
```
Normal   : 400
Semibold : 600
Bold     : 700
```

#### Base
```
--font-size-base : 1.125rem (18px)
--line-height-base : 1.5
font-size-adjust : ex-height 0.5 (si support)
```

### 2.3 Espacements

#### Grid (Tailwind)
```
Basé sur Tailwind default (4px)
Custom spacing: 'safe-top', 'safe-bottom' (env vars)
```

#### Utilisés dans le code
```
p-2   : 0.5rem (8px)
p-4   : 1rem (16px)
p-5   : 1.25rem (20px)
p-6   : 1.5rem (24px)
p-8   : 2rem (32px)

px-4  : 1rem horizontal
py-2  : 0.5rem vertical
py-3  : 0.75rem vertical
py-4  : 1rem vertical
mb-1 à mb-8
```

### 2.4 Rayons (Border Radius)

#### Hardcodes actuels
```
rounded-lg   : 0.5rem (8px) - inputs
rounded-xl   : 0.75rem (12px) - cards
rounded-2xl  : 1rem (16px) - cards elevated, buttons
rounded-[1rem] : 1rem (16px) - buttons
```

#### Pattern
```
Petit  : 0.5rem   (inputs, petits éléments)
Moyen  : 0.75rem  (cards normales)
Grand  : 1rem     (cards elevated, buttons)
```

### 2.5 Ombres (Box Shadow)

#### Classes Tailwind
```
shadow-base : 0 1px 3px rgba(0,0,0,0.1)
shadow-lg   : 0 4px 6px rgba(0,0,0,0.1)
```

#### Dans globals.css
```
input:focus box-shadow : 0 0 0 3px rgba(217, 119, 6, 0.1)
→ À mettre à jour : rgba(180, 83, 0, 0.1) (nouvelle primaire)
```

### 2.6 Touch Targets (Zones tactiles)

#### Min-height utilisé
```
sm : 44px  (petits boutons)
md : 48px  (boutons normaux) ✅ AA compliant
lg : 56px  (gros boutons)
```

#### Implémentation
```
Button sm : min-h-[44px]
Button md : min-h-[48px]
Button lg : min-h-[56px]
```

### 2.7 Transitions

#### Timing
```
duration-250 : 250ms  (couleurs, shadows)
```

#### Easing
```
ease-in-out (default Tailwind)
```

### 2.8 Focus & Accessibilité

#### Variables CSS
```
--focus-outline : 2px solid var(--color-primary)
--focus-outline-offset : 2px
```

#### Appliqué sur
```
button, a, input, select, textarea : :focus-visible
Outline : 2px solid #B45300
Offset  : 2px
```

### 2.9 Mode Contraste Élevé

#### Media query
```
@media (prefers-contrast: more)
```

#### Overrides
```
--color-primary : #7C2D12  (plus foncé)
--color-secondary : #7C2D12
--color-neutral-600 : #1A1915  (noir)
+ border: 2px solid var(--color-neutral-900) sur body
```

**Manques** :
- Pas d'override pour borders, séparateurs
- Pas d'override pour text-sizes
- Pas de toggle utilisateur (juste prefers-contrast OS)

### 2.10 Texte Augmenté

#### Actuellement
```
@media (prefers-reduced-motion: no-preference)
  → scroll-behavior: smooth

@supports (font-size-adjust: ex-height)
  → font-size-adjust: ex-height 0.5
```

**Manques** :
- Aucun toggle utilisateur pour 3 niveaux (petit, normal, grand)
- Pas de data-attribute `[data-text-size]`
- Pas de CSS pour amplifier les font-size

---

## 3. Comparaison avec design-system.md

### 3.1 Ce qui est documenté ✅

| Item | Documenté dans design-system.md | Implémenté |
|------|----------------------------------|-----------|
| Palette couleurs | ✅ Complet | ✅ Oui (sauf Tailwind config) |
| Typographie scales | ✅ Mobile/Desktop | ⚠️ Seulement desktop |
| Espacements | ✅ Grid 4px | ✅ Tailwind default |
| Touch targets | ✅ 48px min | ✅ Oui |
| Focus states | ✅ Outline 2px | ✅ Oui |
| Rayons | ✅ 3 levels | ✅ Hardcodes |
| Ombres | ✅ 3 levels | ✅ 2 levels seulement |

### 3.2 Ce qui manque ❌

| Item | Documenté | Implémenté | Notes |
|------|-----------|-----------|-------|
| Mode contraste toggle UI | ✅ Phase 2 | ❌ Pas de UI | Juste CSS prêt |
| Texte scalable (3 niveaux) | ✅ Phase 2 | ❌ Pas de UI | Juste CSS framework |
| Transition durations | ✅ Nommé | ⚠️ Hardcodes | `duration-250` OK |
| Composants states (hover/active) | ✅ Documentés | ✅ Implémentés | Dans Button.tsx |
| Token naming convention | ✅ [À DÉCIDER] | ❌ Mixte | CSS vars + Tailwind |

---

## 4. Proposition : Structure unifiée de tokens

### 4.1 Recommandations de centralisation

**Phase 1 : Corriger incohérences critiques** (Immédiat)

```diff
# tailwind.config.ts
- 'primary': '#D97706',
+ 'primary': '#B45300',
```

**Phase 2 : Centraliser les rayons** (Important)

```javascript
// tailwind.config.ts - extend
borderRadius: {
  'xs': '0.5rem',   // 8px
  'sm': '0.75rem',  // 12px
  'md': '1rem',     // 16px
  // default Tailwind: lg, xl, 2xl, 3xl
}
```

**Phase 3 : Centraliser les ombres** (Important)

```javascript
// tailwind.config.ts - extend
boxShadow: {
  'base': '0 1px 3px rgba(0, 0, 0, 0.1)',
  'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
  'lg': '0 10px 40px rgba(0, 0, 0, 0.2)',
  'xl': '0 20px 60px rgba(0, 0, 0, 0.3)',
}
```

**Phase 4 : Décentraliser hardcodes** (Long terme)

Remplacer dans composants :
```diff
- bg-[#B45300]
+ bg-primary
- rounded-2xl
+ rounded-md
- shadow-lg
+ shadow-lg (une fois en config)
```

### 4.2 Structure de token proposée

```
tokens/
├── colors.ts          # Palette complète
├── typography.ts      # Families, sizes, weights, line-heights
├── spacing.ts         # Grid et valeurs nommées
├── borders.ts         # Radius + widths
├── shadows.ts         # Ombres (light, base, md, lg, xl)
├── transitions.ts     # Durations + easing
├── accessibility.ts   # Focus, contraste, texte scalable
└── components.ts      # États des composants (hover, active, disabled)
```

**Alternative (minimaliste)** :
- Garder CSS variables dans `globals.css`
- Centraliser dans Tailwind config seulement les manques (rayons, ombres)
- Documenter dans un seul fichier `tokens-reference.md`

### 4.3 Checklist d'implémentation

**Immédiat** :
- [ ] Corriger tailwind.config.ts : primary #D97706 → #B45300
- [ ] Ajouter borderRadius à Tailwind extend
- [ ] Ajouter boxShadow à Tailwind extend
- [ ] Mettre à jour input:focus box-shadow (187 → B45300)

**Important** :
- [ ] Remplir les toggles contraste + texte dans settings
- [ ] Ajouter data-attributes au html pour toggles
- [ ] Ajouter CSS pour mode contraste utilisateur
- [ ] Ajouter CSS pour texte scalable utilisateur

**Futur** :
- [ ] Refactoriser hardcodes → classes Tailwind
- [ ] Créer @tailwindcss/postcss @theme block (Tailwind 4)
- [ ] Migration complète v3 → v4 si décidé

---

## 5. Décisions [À VALIDER]

| Décision | Option A | Option B | Recommandation |
|----------|----------|----------|-----------------|
| **Token storage** | Fichiers séparés `/tokens` | CSS vars + Tailwind config | **Option B** (minimaliste, maintenu) |
| **Naming convention** | `--color-primary` | `tokens.colors.primary` | **CSS vars** (déjà en place) |
| **Tailwind v3 → v4** | Migrer maintenant | Attendre phase 2 | **Attendre** (pas bloquant) |
| **Componentized states** | Variantes Tailwind | Fichier config | **Variantes** (dans composants est OK) |

---

## 6. Résumé exécutif

### État actuel
- ✅ Couleurs : définies (CSS vars + Tailwind partiel, Tailwind config obsolète)
- ✅ Typographie : définies (Tailwind fontSize + hardcodes)
- ✅ Espacements : définis (Tailwind grid + hardcodes)
- ✅ Touch targets : 48px min OK
- ✅ Focus states : 2px outline OK
- ⚠️ Rayons : hardcodes seulement
- ⚠️ Ombres : 2 levels (manque xl)
- ❌ Mode contraste : CSS prêt, pas de UI
- ❌ Texte scalable : pas de UI

### Action immédiate recommandée
1. Corriger tailwind.config.ts (primary couleur)
2. Ajouter `borderRadius` et `boxShadow` à Tailwind
3. Documenter tous les tokens dans cette même structure

### Code impact estimate
- Corriger config : 1 changement (~2 min)
- Ajouter Tailwind tokens : ~10 nouvelles lignes (~5 min)
- Refactor hardcodes : ~50+ changements (~2-3h si complet)

---

**Prochaine étape** : Valider cette proposition, puis appliquer Phase 1 (immédiat).
