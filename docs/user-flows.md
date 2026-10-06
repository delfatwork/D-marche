# Flux utilisateur - Pas à pas

## 1. Onboarding (Nouvel utilisateur)

**Parcours** : Bienvenue → Niveau → Durée cible → Préférence → Consentement → Tableau de bord

### Étapes détaillées

**1.1 Écran de bienvenue**
- Titre : "Bienvenue dans Pas à pas"
- Message de présentation
- CTA : "Commençons →"
- Pas de back / skipping possible

**1.2 Sélection du niveau de départ**
- Options :
  - 🚶 **Je débute** → Objectif quotidien : 15 min
  - 🚶 **Régulier** (intermédiaire) → Objectif : 20 min
  - 🏃 **Actif** → Objectif : 30 min
- Description courte pour chaque niveau
- Format : Boutons empilés (mobile-first)
- Peut revenir à l'étape précédente

**1.3 Sélection de la durée cible**
- Question : "Combien de temps souhaitez-vous marcher chaque jour?"
- Options : 10, 15, 20, 25, 30, 35, 40, 45 minutes
- Format : Grille 2 colonnes
- Valeur par défaut = niveau choisi précédemment

**1.4 Préférence de compagnie**
- Question : "Préférez-vous marcher..."
- Options :
  - 🚶 **Seul(e)** → Pas de recommandation
  - 👥 **Accompagné(e)** → Peut suggérer partage avec un ami
  - 🤷 **Indifférent** → Flexible
- Format : Boutons avec émojis

**1.5 Consentement aux données**
- ✅ Cases à cocher pour :
  - "J'accepte que mes données de marche soient stockées localement"
  - "J'ai lu et accepte la politique de confidentialité"
- Les deux doivent être cochées pour continuer
- Bouton : "Continuer" (activé uniquement si les deux ✓)

**1.6 Écran de confirmation**
- Affiche résumé des choix (niveau, durée, nom)
- Option de modification rapide
- CTA principal : "Commencer à marcher"
- CTA secondaire : "Retour"

### Sortie de l'onboarding
- Redirection vers **Tableau de bord** (page d'accueil)
- `onboardingComplete: true` sauvegardé
- Données stockées dans localStorage

---

## 2. Tableau de bord (Page d'accueil)

**Parcours** : Accueil → [Marche | Journal | Paramètres | Cette semaine]

### État de l'écran

**Bloc 1 : Salutation**
- "Bonjour [Prénom]! 👋"
- Affiche la date d'aujourd'hui en français
- Objectif du jour en gros (ex: "20 minutes de marche")

**Bloc 2 : Progression aujourd'hui**
- Si aucune marche aujourd'hui :
  - Bouton 🚶 "Marcher maintenant" (CTA principal)
  - État : "Aucune marche aujourd'hui"
  - Barre de progrès à 0%
  
- Si une marche commencée :
  - Affiche la durée actuelle
  - Barre de progrès : `actuels / objectif`
  - Bouton : "Continuer ma marche"
  
- Si objectif atteint :
  - ✓ "Objectif atteint!"
  - Affiche la durée totale
  - Bouton : "Commencer une nouvelle marche"

**Bloc 3 : Cette semaine**
- Affiche "Jours actifs : X / 7"
- Message encourageant (voir [content-guidelines.md](content-guidelines.md))
- Bouton : "Voir le détail"
- Format : Card avec couleur gradient

**Navigation inférieure**
- 🏠 Accueil
- 🚶 Marche
- 📝 Journal
- ⚙️ Paramètres

---

## 3. Session de marche

**Parcours** : Démarrer → Minuteur → Pause/Reprise → Terminer → Ressenti → Accueil

### États du minuteur

**État "Idle" (avant de démarrer)**
- Minuteur affiche 00:00
- Bouton : "Démarrer"
- Bouton Quitter : retour sans confirmation

**État "Running" (en cours)**
- Minuteur en temps réel (HH:MM:SS)
- Boutons : Pause | Terminer | Quitter
- Si quitter :
  - Modale : "Êtes-vous sûr de vouloir arrêter votre marche?"
  - Options : "Continuer" | "Oui, arrêter" (sans sauvegarder la durée)

**État "Paused" (mise en pause)**
- Minuteur figé
- Boutons : Reprendre | Terminer | Quitter
- La durée est mise à jour si on pause/reprend

**État "Completed" (terminé)**
- Écran de résultat affiche :
  - ✓ "Bravo!"
  - Durée marche en gros
  - Si objectif atteint : "🎉 Objectif atteint! +X minutes!"
  - Conseils : "Pensez à vous hydrater et vous reposer. Écoutez votre corps!"
- Boutons :
  - 📝 "Évaluer mon ressenti" (CTA principal)
  - 🔄 "Refaire une marche"
  - ← "Retour à l'accueil"

---

## 4. Évaluation du ressenti

**Parcours** : Ressenti unique → Journal des ressentis

### Écran "Ressenti"

- Question : "Comment vous vous sentez après cette marche?"
- Boutons emoji :
  - 😍 **Excellent** → "Plein d'énergie!"
  - 😊 **Bien** → "Vraiment bien"
  - 😐 **Normal** → "Ça va"
  - 😴 **Fatigué** → "Un peu fatigué"
- Format : Boutons empilés avec emoji large
- Après sélection : modale pour notes optionnelles
- Redirection : Journal des ressentis

### Écran "Journal des ressentis"

- Liste des 7 derniers ressentis avec date
- Format : Card par jour avec emoji + ressenti + notes libres
- Édition possible (clic sur une journée)
- Suppression possible (swipe ou bouton)

---

## 5. Historique hebdomadaire ("Cette semaine")

**Parcours** : Dashboard → "Voir le détail" → Historique

### Statistiques affichées

- **Jours actifs** : X / 7 (avec tendance ↗ / ↘ / →)
- **Total** : XXX minutes
- **Moyenne** : XX min/jour
- Message encourageant basé sur régularité (voir [content-guidelines.md](content-guidelines.md))

### Détail par jour

- Table : Lun | Mar | Mer | Jeu | Ven | Sam | Dim
- Chaque jour affiche :
  - Durée si marche (ex: "25 min")
  - Ressenti (emoji si disponible)
  - Notes libres si disponibles
  - Surligné si aujourd'hui

### Tendance

**Calcul** : Cette semaine vs semaine précédente
- ↗ Hausse : `jours_actuels > jours_précédents`
- ↘ Baisse : `jours_actuels < jours_précédents`
- → Stable : `jours_actuels == jours_précédents`

---

## 6. Paramètres

**Parcours** : Accueil → Paramètres → [Modifier profil | Accessibilité | Confidentialité | À propos]

### Sections

**6.1 Mon profil**
- Modifier : Nom, Niveau, Objectif quotidien
- Afficher : Date d'inscription

**6.2 Accessibilité** 
- 🔲 Mode contraste élevé (bascule)
- 🔲 Texte en taille : Petit | Normal | Grand (radio)
- Information : "Ces paramètres s'appliquent dans toute l'app"
- Explications sur les raccourcis clavier ([À DÉCIDER] lesquels)

**6.3 Données**
- Afficher : Nombre de marches enregistrées
- [À DÉCIDER] Bouton : "Exporter mes données"
- [À DÉCIDER] Bouton : "Réinitialiser et retirer mes données"
- Confirmation modale avant suppression

**6.4 Confidentialité & Consentement**
- Afficher le texte de consentement complet
- [À DÉCIDER] Bouton : "Révoquer mon consentement"
- Lien : "Politique de confidentialité" (externe ?)

**6.5 À propos**
- Version : [À DÉCIDER]
- Crédits : "Une app accessible pour seniors"
- Lien : Feedback / Support

---

**Statut** : Complété  
**Mise à jour** : 2026-10-06  
**Dépendances** : [ux-principles.md](ux-principles.md), [content-guidelines.md](content-guidelines.md)
