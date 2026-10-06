# Principes UX - Pas à pas

## Vision
Application accessible pour seniors pour encourager la marche régulière **sans performance** ni pression.

## Principes fondamentaux

### 1. **Pas de pression, marchez à votre rythme**
- ❌ Pas de gamification compétitive (pas de badges, classements)
- ❌ Pas de termes médicaux ou de recommandations de santé
- ❌ Pas de métriques de performance (distance ≈ minutes ÷ 3, calories)
- ✅ Encouragement positif sans jugement
- ✅ Chaque marche compte, peu importe la durée

### 2. **Accessibilité d'abord**
- ✅ Interface mobile-first pour smartphones (390 px min)
- ✅ Texte scalable (rem/em, pas pixels)
- ✅ Contraste WCAG AA minimum (4.5:1 pour le texte)
- ✅ Touch targets 48px minimum
- ✅ Focus states visibles
- ✅ Mode contraste élevé (`prefers-contrast: more`)
- ✅ Navigation au clavier possible
- ✅ Émojis avec alternatives textes

### 3. **Simplicité et clarté**
- ✅ Une action principale par écran
- ✅ Navigation simple et prédictible
- ✅ Langage clair en français
- ✅ Labellisation sémantique (ARIA, labels)
- [À DÉCIDER] Aide contextuelle vs guides externes

### 4. **Respect des données**
- ✅ Consentement explicite à l'onboarding
- ✅ Données stockées localement (localStorage)
- ✅ Possibilité de réinitialiser / supprimer les données
- [À DÉCIDER] Révocation du consentement après onboarding
- [À DÉCIDER] Export de données

### 5. **Ton inclusif et bienveillant**
- ✅ Messages encourageants et positifs
- ✅ Pas de culpabilisation (ex: pas de flèche ↘ pour baisse d'activité)
- ✅ Reconnaissance du progrès (ex: "Bien commencé!", "Vous êtes régulier!")
- ✅ Personnalisation par prénom et niveau

## Audience
**Seniors actifs**, généralement :
- Âge 50+
- Moins à l'aise avec la technologie
- Sensibles aux problèmes de vue / audition
- Apprécient la régularité et les habitudes
- Aiment marcher pour le bien-être, pas la performance

## Contenu interdit
- 🚫 Termes médicaux (diagnostic, thérapie, traitement)
- 🚫 Métriques de performance (distance, calories, vitesse)
- 🚫 Comparaisons et classements
- 🚫 Notifications intrusives
- 🚫 Publicités ou upsells

## Contenu bienvenu
- ✅ Conseils simples de sécurité (hydratation, repos)
- ✅ Encouragements textes
- ✅ Suivi de régularité (jours actifs)
- ✅ Ressenti utilisateur (bien, normal, fatigué)
- ✅ Notes libres utilisateur

---

**Statut** : Complété  
**Mise à jour** : 2026-10-06  
**Dépendances** : [user-flows.md](user-flows.md), [content-guidelines.md](content-guidelines.md)
