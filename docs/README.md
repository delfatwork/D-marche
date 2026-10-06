# Documentation - Pas à pas

Bienvenue dans la documentation de design et UX de **Pas à pas**, l'application accessible pour seniors pour encourager la marche régulière sans pression.

---

## 📚 Structure de la documentation

### [0️⃣ Product Brief](./product-brief.md)
**Pour qui ?** : Tous (vue d'ensemble)  
**Quoi ?** : Contexte, objectifs, contraintes, état de conformité

- Utilisateurs et problème
- Objectifs du MVP (6 étapes)
- Fonctionnalités implémentées vs en cours vs futures
- Contraintes UX et éthique
- État de conformité avec checklist

---

### [1️⃣ Principes UX](./ux-principles.md)
**Pour qui ?** : Product managers, designers, développeurs  
**Quoi ?** : Vision, valeurs, audience, contenu interdit

- Vision et objectifs produit
- 5 principes fondamentaux (pas de pression, accessibilité, simplicité, respect des données, ton inclusif)
- Profil utilisateur (seniors, bien-être)
- Contenus interdits et autorisés

---

### [2️⃣ Flux utilisateur](./user-flows.md)
**Pour qui ?** : Développeurs, testeurs, designers  
**Quoi ?** : Chemins utilisateur, écrans, étapes, comportements

Détail complet de 6 parcours :
1. **Onboarding** : Bienvenue → Niveau → Durée → Préférence → Consentement
2. **Tableau de bord** : Accueil, progression, navigation
3. **Session de marche** : Démarrer → Minuteur → Terminer → Ressenti
4. **Évaluation ressenti** : Mood (4 niveaux) + Notes libres
5. **Historique hebdo** : Statistiques, tendances, détail par jour
6. **Paramètres** : Profil, accessibilité, données, confidentialité

---

### [3️⃣ Design System](./design-system.md)
**Pour qui ?** : Designers, développeurs frontend  
**Quoi ?** : Couleurs, typo, composants, espacements, tokens

- **Palette** : Primaire, secondaire, états (⚠️ Contraste AA en [À DÉCIDER])
- **Typographie** : Family, scales mobiles/desktop, texte scalable (petit/normal/grand)
- **Espacements** : Grid 4px, touch targets 48px
- **Composants** : Button, Card, Modal, ProgressBar, BottomNav
- **Tokens CSS** : Variables globales et Tailwind
- **Mode contraste élevé** : Surcharges CSS possibles

---

### [4️⃣ Accessibilité](./accessibility.md)
**Pour qui ?** : Tous (spécialement développeurs et testeurs)  
**Quoi ?** : WCAG 2.1 AA, checklist, tests, non-conformités

**Conformités actuelles** :
- ✅ Langue, viewport, sémantique HTML5, ARIA, touch targets, rem

**Manques urgents** :
- ⚠️ Contraste primaire (3.2:1 < 4.5:1 AA)
- ❌ Modales sans piège focus
- ❌ BottomNav seulement sur accueil
- ❌ Pas de contrôles utilisateur (contraste, texte scalable)

**Checklist d'implémentation** : 5 phases de priorités

**Cas de test** : 6 CT-A11y détaillés (contraste, mode, texte, modale, nav, focus)

---

### [5️⃣ Directives de contenu](./content-guidelines.md)
**Pour qui ?** : Rédacteurs, développeurs, testeurs  
**Quoi ?** : Ton/voix, messages, contenu interdit, ressenti

**Ton** : Bienveillant, positif sans pression, honnête, inclusif, simple

**Messages encourageants** : Par contexte (onboarding, accueil, pendant/après marche)

**Ressenti** : 4 niveaux (excellent, bien, normal, fatigué)

**Interdit** : Termes médicaux, comparaisons, culpabilisation, prédictions

**Autorisé** : Bien-être, progression personnelle, encouragements

---

## 🗺️ Dépendances entre documents

```
ux-principles.md
    ↓ (définit l'audience et les valeurs)
    ├→ user-flows.md (décrit les parcours alignés aux principes)
    ├→ design-system.md (implémente les principes visuellement)
    └→ content-guidelines.md (définit le ton et les messages)

design-system.md
    ↓ (palette, typo, composants)
    └→ accessibility.md (doit respecter WCAG avec les tokens du design)

accessibility.md
    ↓ (exigences d'accessibilité)
    └→ user-flows.md (doit implémenter les comportements accessibles)

content-guidelines.md
    ↓ (messages et ton)
    └→ user-flows.md (les écrans doivent utiliser les messages guidés)
```

---

## 📋 Checklist avant mise en production

### Design
- [ ] Palette CC confirmée (décision sur contraste)
- [ ] Typographie testée mobile/desktop
- [ ] Composants documentés avec variantes
- [ ] Dark mode / mode contraste défini [À DÉCIDER]

### Développement
- [ ] Tous les styles via Tailwind v4 + CSS variables
- [ ] BottomNav sur tous les écrans
- [ ] Modales avec piège focus + Échap
- [ ] Contrôles accessibilité (contraste, texte)
- [ ] Tests d'accessibilité passants (aXe, WAVE)

### Contenu
- [ ] Pas de termes médicaux
- [ ] Pas de distances/calories
- [ ] Messages encourageants utilisés partout
- [ ] Noms ressenti (excellent, bien, normal, fatigué)

### Tests
- [ ] CT-A11y-001 à 006 passant
- [ ] Navigation clavier complète
- [ ] Tests lecteur d'écran (NVDA/VoiceOver)
- [ ] Responsive 390px+

---

## 🔧 Guide rapide pour...

### Je veux ajouter un nouvel écran
1. Lire [user-flows.md](./user-flows.md) pour comprendre le contexte
2. Respecter les principes [ux-principles.md](./ux-principles.md)
3. Utiliser les tokens [design-system.md](./design-system.md)
4. Appliquer [accessibility.md](./accessibility.md)
5. Rédiger selon [content-guidelines.md](./content-guidelines.md)

### Je veux tester l'accessibilité
1. Lire "Testabilité" dans [accessibility.md](./accessibility.md)
2. Exécuter les cas de test CT-A11y-001-006
3. Utiliser les outils : aXe, WAVE, Color Contrast Analyzer

### Je veux modifier la palette
1. Voir section "Palette de couleurs" dans [design-system.md](./design-system.md)
2. Vérifier contraste minimum 4.5:1 dans [accessibility.md](./accessibility.md)
3. Mettre à jour les CSS variables
4. Tester tous les écrans

### Je veux améliorer les messages
1. Consulter [content-guidelines.md](./content-guidelines.md)
2. Respecter les principes de ton
3. Bannir termes interdit
4. Ajouter emoji/ressenti si pertinent

---

## [À DÉCIDER]

Items en attente de décision produit/design :

| Document | Item | Impact |
|----------|------|--------|
| design-system.md | Correction palette AA | 🔴 Critique pour conformité |
| design-system.md | Mode contraste élevé CSS | 🟠 Important pour accessibilité |
| design-system.md | Migration Tailwind v3→v4 | 🟠 Important pour maintenance |
| accessibility.md | Raccourcis clavier | 🟡 Nice-to-have |
| user-flows.md | Export/suppression données | 🟡 RGPD considération |
| user-flows.md | Révocation consentement | 🟡 RGPD considération |
| content-guidelines.md | Variantes contraste élevé | 🟡 Nice-to-have |

---

## 📞 Questions ?

Pour chaque question, consulter le document approprié ou ajouter à la section [À DÉCIDER].

**Mise à jour** : 2026-10-06  
**Auteur** : Équipe Pas à pas  
**Licence** : [À DÉCIDER]
