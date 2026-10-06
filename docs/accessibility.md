# Accessibilité - Pas à pas

## Engagement
"Pas à pas" s'engage à être **WCAG 2.1 AA compliant** pour être vraiment accessible aux seniors et à tous les utilisateurs.

---

## Standards visés

### WCAG 2.1 Level AA
- ✅ Contraste minimum 4.5:1 pour texte normal
- ✅ Contraste minimum 3:1 pour grands textes
- ✅ Touch targets minimum 48px × 48px
- ✅ Texte redimensionnable jusqu'à 200%
- ✅ Pas de contenu qui clignote > 3 Hz
- ✅ Raccourcis clavier disponibles

### Critères critiques pour seniors
- ✅ Mode contraste élevé activable
- ✅ Texte scalable en 3 niveaux (petit, normal, grand)
- ✅ Navigation simple (max 2-3 niveaux de profondeur)
- ✅ Focus states très visibles
- ✅ Langage simple, pas de jargon

---

## Conformités actuelles

### ✅ Implémentées
- Langue : `lang="fr"` sur `<html>`
- Métadonnées viewport : `width=device-width, initial-scale=1`
- Sémantique HTML5 : `<header>`, `<main>`, `<nav>`
- Aria-labels sur composants critiques (`ProgressBar`, `Modal`)
- Touch targets : Min 48px sur boutons
- Media queries : `prefers-contrast: more`, `prefers-reduced-motion`
- Texte sur base rem (escalable)

### ⚠️ Partiellement complètes
- Tailwind v4 migration : En cours (v3 encore utilisée localement)
- Mode contraste élevé : CSS prêt, pas de toggle UI
- Texte scalable : Rem utilisés, pas de toggle UI pour 3 niveaux
- Focus traps : Non implémentée dans modales

### ❌ Non implémentées
- Couleurs : Contraste primaire 3.2:1 (< 4.5:1 AA requis)
- Modales : Pas de piège focus, pas de fermeture Échap
- Navigation : BottomNavigation seulement sur accueil
- Raccourcis clavier : [À DÉCIDER] lesquels exposer

---

## Checklist d'implémentation

### Phase 1 : Palette (URGENT)

**Problème** : Texte blanc sur `#D97706` = 3.2:1 (non-AA)

**Décisions possibles** :
- [ ] A) Foncer primaire : `#D97706` → `#B45300` (5.8:1)
- [ ] B) Garder primaire, changer fond : Toujours `#FEF3C7`+
- [ ] C) Garder primaire, texte sombre : `#92400E` au lieu de blanc
- [ ] D) Autre palette entièrement

**Statut** : [À DÉCIDER]

### Phase 2 : Contrôles utilisateur

#### Toggle Contraste élevé

```tsx
// settings/page.tsx
<label>
  <input type="checkbox" 
    onChange={(e) => {
      document.documentElement.setAttribute(
        'data-contrast', 
        e.target.checked ? 'high' : 'normal'
      )
      localStorage.setItem('contrast-mode', e.target.checked ? 'high' : 'normal')
    }} 
  />
  Mode contraste élevé
</label>
```

**CSS** : Voir [design-system.md](design-system.md#mode-contraste-élevé)

#### Taille de texte (3 niveaux)

```tsx
// settings/page.tsx
<fieldset>
  <legend>Taille du texte</legend>
  <label>
    <input type="radio" name="text-size" value="small" />
    Petit (90%)
  </label>
  <label>
    <input type="radio" name="text-size" value="normal" defaultChecked />
    Normal
  </label>
  <label>
    <input type="radio" name="text-size" value="large" />
    Grand (125%)
  </label>
</fieldset>
```

**Persistance** : 
- localStorage clé : `text-size`
- HTML data-attribute : `data-text-size`

**CSS** : Voir [design-system.md](design-system.md#échelle-de-texte-utilisateur)

### Phase 3 : Modales accessibles

**Éléments critiques** :

```tsx
// components/Modal.tsx
<div role="alertdialog"
     aria-modal="true"
     aria-labelledby="modal-title"
     aria-describedby="modal-description">
  <h2 id="modal-title">Titre</h2>
  <p id="modal-description">Description</p>
  <button onClick={handleClose}>Fermer</button>
</div>
```

**Comportements** :
- Piège focus : Premier input focus d'entrée, dernier action retourne au premier
- Échap : Ferme la modale
- Focus initial : Dans l'input primaire ou bouton principal
- Focus restauré : À l'élément qui a ouvert la modale

**[À DÉCIDER]** Bibliothèque ? Exemple : `@headlessui/react`

### Phase 4 : Navigation complète

**Objectif** : BottomNavigation visible sur TOUS les écrans

**Impactés** :
- ✅ Accueil (déjà fait)
- ❌ Onboarding (peut-être ?)
- ❌ Marche (en cours ?)
- ❌ Ressenti
- ❌ Journal
- ❌ Historique
- ❌ Paramètres

### Phase 5 : Raccourcis clavier

**[À DÉCIDER]** Lesquels implémenter ?

**Exemples potentiels** :
- `Ctrl+M` : Démarrer marche
- `Ctrl+H` : Historique
- `Ctrl+S` : Paramètres
- `Escape` : Fermer modale / retour
- `Enter` : CTA principal

---

## Testabilité

### Outils

| Outil | Usage | Lien |
|-------|-------|------|
| aXe | Audit automatisé | https://www.deque.com/axe/ |
| WAVE | Inspection visuelle | https://wave.webaim.org/ |
| Lighthouse | Performance + A11y | DevTools Chrome |
| Color Contrast Analyzer | Ratios de contraste | https://www.tpgi.com/color-contrast-checker/ |
| Keyboard Nav | Test clavier seul | Manual |
| Screen Reader | VoiceOver (macOS), NVDA (Win) | Manual |

### Cas de test

**CT-A11y-001 : Contraste texte**
- Vérifier tous les contrastes en ligne de base
- Outils : Color Contrast Analyzer
- Résultat attendu : ≥ 4.5:1 pour texte normal

**CT-A11y-002 : Mode contraste élevé**
- Cliquer toggle contraste dans paramètres
- Vérifier `[data-contrast="high"]` sur `<html>`
- Tester la persistance (reload page)

**CT-A11y-003 : Texte scalable**
- Sélectionner "Grand" dans paramètres
- Vérifier `[data-text-size="large"]` appliqué
- Mesurer font-size : doit être +25%

**CT-A11y-004 : Modale accessible**
- Ouvrir modale (ex: quit sans enregistrer)
- Tester Tab/Shift+Tab : doit cycler dans modale seule
- Tester Échap : doit fermer

**CT-A11y-005 : Navigation**
- BottomNav visible sur tous les écrans
- Focus visible sur chaque item
- Clicker chaque lien : navigation OK

**CT-A11y-006 : Focus states**
- Naviguer au clavier seul (Tab)
- Chaque bouton/lien doit avoir focus visible distinctif
- Aucun focus perdu

---

## Non-conformités connues

### Actuellement bloquantes

| Problème | Ligne | Sévérité | Fix |
|----------|-------|----------|-----|
| Contraste primaire < AA | walk/page.tsx:147, weekly/page.tsx:120 | 🔴 Critique | [À DÉCIDER] palette |
| Modale sans piège focus | components/Modal.tsx | 🟠 Majeure | Ajouter focus trap |
| BottomNav absente | Sauf accueil | 🟠 Majeure | Ajouter navigation |
| Pas de contrôle texte scalable | settings/page.tsx | 🟠 Majeure | Ajouter UI + CSS |
| Pas de contrôle contraste | settings/page.tsx | 🟡 Moyenne | Ajouter toggle |

### Futures améliorations

- [ ] Réduction mouvement : `prefers-reduced-motion` → supprimer transitions
- [ ] Raccourcis clavier complets
- [ ] Support clavier numpad (marche, historique)
- [ ] Lecteur d'écran : ARIA live regions pour minuteur

---

## Ressources

- [WCAG 2.1 Official](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)

---

**Statut** : Design complété, implémentation [À DÉCIDER] pour palette  
**Mise à jour** : 2026-10-06  
**Dépendances** : [design-system.md](design-system.md)
