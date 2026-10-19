# D-marche — Inventaire produit, design system et user stories

Oct 9, 2026 · @Delphine  Colas

## Synthèse

Le prototype D-marche compte 11 écrans, 13 drawers, 72 actions utilisateur et 3 modes d'affichage. Il couvre 10 domaines fonctionnels, regroupés ici en 10 epics et 31 user stories.

L'inventaire est extrait du code du prototype publié (fichier `pas-a-pas.html`, version du 10 octobre 2026). Les données sont fictives, et plusieurs fonctions sont simulées : Bluetooth, GPS, SMS, impression.

| Élément | Nombre |
| --- | --- |
| Écrans (routes) | 11 |
| Drawers (bottom sheets) | 13 |
| Actions (`data-action`) | 72 |
| Tokens couleur | 18 par mode |
| Modes d'affichage | 3 (clair, sombre, contraste élevé) + 3 tailles de texte + mouvement réduit |
| Composants identifiés | 34 |

## Écrans

Les 11 écrans sont reliés par une barre du bas à 4 entrées (Accueil, Pas à pas, Balades, Parcourir) et par des en-têtes avec flèche de retour.

| Écran | Route | Rôle | États |
| --- | --- | --- | --- |
| Onboarding | `onboarding` | 5 étapes : bienvenue, rythme, observation de l'évolution, connexion du podomètre, motivation | étape 1 à 5, erreur « choisissez un objectif », recherche Bluetooth, appareil trouvé, appareil sélectionné, connexion en cours, podomètre connecté |
| Accueil | `home` | Cap du jour, Pas à pas, Hier, 7 derniers jours, Idées de balades, Conseils | compte nouveau (vide), compte existant, mode Durée, mode Sorties, mode Pas, relevé en cours, relevé terminé |
| Marche en cours | `walk` | Minuteur, pause, fin de marche, signalement d'observation | en cours, en pause, marche exploratoire |
| Activité (Pas / Sorties) | `activite` (métrique pas ou sorties) | Historique avec périodes 1j, 7j, 4s, 1a | métrique Pas, métrique Sorties, compte vide, jour courant (suivant désactivé) |
| Pas à pas | `pas-a-pas` | Défi du moment, Petites victoires, Bonnes habitudes, Mes Trophées | défi à faire, défi fait, trophée acquis, trophée grisé |
| Balades | `balades` | Recherche par ville, filtres type et difficulté, liste | autour de moi, ville sélectionnée, sans géoloc ni ville, aucun résultat, filtres actifs |
| Balade (détail) | `balade` | Carrousel, infos, onglets ancres, actions | solo, groupe, inscrit, complet, header transparent ou plein |
| Parcourir | `parcourir` | Rangées de conseils, D-cartes, création de D-carte | liste, formulaire de création, D-carte en relecture |
| Profil | `profile` | Identité, parcours, mesure de l'objectif, données | nombre renseigné ou non, confirmation d'effacement |
| Podomètre | `podometre` | Statut, infos appareil, relevé des pas | non connecté, connecté, relevé en cours, relevé effectué |
| Réglages | `settings` | Taille du texte, contraste élevé, animations réduites | normal, grand, très grand, contraste on ou off, mouvement on ou off |

**Drawers (13)** : connexion, inscription, code SMS, changement de numéro, objectif, podomètre, suppression de compte, aide, info carte, observation, partage, filtres balades, trophée, récompense.

## Features

Les features sont regroupées en 10 domaines, qui deviennent les 10 epics de la section suivante.

| Domaine | Feature | Statut prototype |
| --- | --- | --- |
| Compte | Inscription par prénom et téléphone, code SMS | Simulé (code 123456) |
| Compte | Connexion par téléphone et code SMS | Simulé |
| Compte | Changement de numéro, déconnexion, suppression du compte en 2 étapes | Simulé |
| Onboarding | Choix du parcours (doux 5 000, progresser 7 000, accompagné 10 000 pas) | Fonctionnel |
| Onboarding | Choix de la mesure de l'objectif (durée, sorties, pas) | Fonctionnel |
| Onboarding | Accord de géolocalisation, dans l'étape motivation | Simulé |
| Onboarding | Connexion d'un podomètre (sélection, puis spinner, puis succès), rappels de motivation | Simulé |
| Accueil | Cap du jour selon la mesure choisie, barre de progression, message adapté | Fonctionnel |
| Accueil | Cartes Hier et 7 derniers jours, réordonnées selon la mesure | Fonctionnel |
| Accueil | Rangée Pas à pas, Idées de balades, Conseils pour la marche | Fonctionnel |
| Suivi | Historique Pas et Sorties par période, navigation par jour, semaine, bloc | Fonctionnel |
| Podomètre | Connexion Bluetooth, infos appareil, relevé des pas, déconnexion. Relevé automatique dès la connexion, non désactivable | Simulé |
| Marche | Minuteur, pause, fin, signalement d'observation (5 catégories) | Fonctionnel |
| Balades | Recherche autour de moi ou par ville avec suggestions | Simulé (3 villes) |
| Balades | Filtres type et difficulté, combinaisons sans résultat désactivées | Fonctionnel |
| Balades | Fiche balade : carrousel, onglets ancres, participants, conseils, points de passage | Fonctionnel |
| Balades | Inscription à une balade de groupe, partage, impression | Partiel (impression navigateur) |
| Pas à pas | Défi du moment, Petites victoires, Bonnes habitudes | Fonctionnel |
| Pas à pas | Trophées : 6 niveaux, détail, récompense au premier événement | Fonctionnel |
| Contenus | Rangées de conseils et D-cartes, création d'une D-carte soumise à relecture | Fonctionnel |
| Accessibilité | Taille du texte (3), contraste élevé, animations réduites, thème sombre système | Fonctionnel |
| Données | Information sur les données conservées sur le téléphone, effacement de toutes les marches | Fonctionnel |

## Design system : tokens et modes

Le prototype définit 18 tokens couleur, déclinés en 3 modes. La typographie repose sur Atkinson Hyperlegible, avec une base de 18 px (112,5 %).

### Les trois niveaux de tokens

Depuis le 10 octobre 2026, les tokens sont organisés en trois couches. Une couche ne référence que celle du dessus.

| Niveau | Préfixe | Contenu | Change selon le mode |
| --- | --- | --- | --- |
| 1. Global | `--g-` | Palette brute (37 valeurs) et échelles : tailles, rayons, épaisseurs de bordure | Non |
| 2. Semantic | aucun | Rôles : `--bg`, `--surface`, `--ink`, `--primary`, `--danger`, `--space-1` à `--space-8`, `--r-sm` à `--r-pill` | Oui, c'est la seule couche redéfinie par mode |
| 3. Composant | nom du composant | `--card-bg`, `--card-radius`, `--card-pad`, `--btn-radius`, `--field-radius`, `--chip-soutenue-bg`, `--tabbar-bg`, `--sheet-radius` | Non, hérite du sémantique |

Exemple de chaîne : `--g-green-700` → `--primary` → `--btn-bg`. Un changement de marque se fait au niveau 1, un changement de mode au niveau 2, un ajustement local au niveau 3.

Dans Figma, cela donne trois collections : Primitives (sans mode), Sémantique (3 modes : clair, sombre, contraste élevé) et Composants (sans mode).

**Convention de nommage**

| Niveau | Forme | Exemples |
| --- | --- | --- |
| Global | `--g-` + teinte + échelle 100 à 900, ou `--g-` + catégorie + index | `--g-green-700`, `--g-red-100`, `--g-size-4`, `--g-radius-2`, `--g-border-1` |
| Semantic, couleur | nom du rôle, suffixe `-soft` (version atténuée), `-ink` (texte posé dessus), `-bg` (fond) | `--surface`, `--ink-soft`, `--primary-ink`, `--danger-bg` |
| Semantic, dimensions | catégorie + taille en t-shirt | `--space-2xs` à `--space-3xl`, `--space-gutter`, `--radius-sm` à `--radius-xl`, `--radius-pill`, `--border-width` |
| Composant | nom du composant + propriété + variante | `--card-radius`, `--btn-min-h`, `--chip-soutenue-bg`, `--sheet-radius` |

Les tokens qui nommaient une chose plutôt qu'un rôle ont été renommés le 10 octobre 2026 : `--page` → `--canvas`, `--frame` → `--device-frame`, `--hill2` → `--illus-fill`, `--sun` → `--illus-accent`, `--path` → `--illus-line`. Les échelles numériques `--space-1` à `--space-8` et `--r-sm` à `--r-pill` ont été remplacées par les formes ci-dessus.

### Couleurs

| Token | Clair | Sombre | Contraste élevé | Usage |
| --- | --- | --- | --- | --- |
| `--page` | #DFE7E2 | #0B1310 | #FFFFFF | Fond derrière le téléphone |
| `--frame` | #1F2E28 | #000000 | #000000 | Cadre du téléphone (desktop) |
| `--bg` | #F2F5F1 | #111C17 | #FFFFFF | Fond des écrans, en-têtes |
| `--surface` | #FFFFFF | #192620 | #FFFFFF | Cartes, champs, drawers, barre du bas |
| `--ink` | #16241F | #EEF3F0 | #000000 | Texte principal |
| `--ink-soft` | #3B4D46 | #C4D1CA | #000000 | Texte secondaire, contours de boutons |
| `--line` | #C3CFC8 | #36483F | #000000 | Bordures, filets |
| `--primary` | #2B6A4E | #86CDA8 | #003B22 | Action principale, état actif |
| `--primary-ink` | #FFFFFF | #0C1A13 | #FFFFFF | Texte sur fond primaire |
| `--primary-soft` | #DCEAE2 | #1E3529 | #FFFFFF | Fonds de badges, tuiles, visuels |
| `--hill2` | #C7DDD0 | #22392D | #FFFFFF | Illustrations, photo factice |
| `--sun` | #E3A63B | #F0BE5E | #000000 | Accent illustration |
| `--path` | #C9D3CC | #34463D | #6E6E6E | Tracé des illustrations |
| `--warn-bg` | #FFF3DC | #2D2412 | #FFFFFF | Fond d'alerte, difficulté Modérée |
| `--warn-line` | #A8701A | #E3AB4E | #000000 | Bordure d'alerte |
| `--focus` | #1B4FD8 | #9DB8FF | #000000 | Anneau de focus clavier |

Tokens ajoutés le 9 octobre 2026 : `--danger` (#9B1C1C clair, #FFB3B3 sombre, #000000 contraste élevé) et `--danger-bg` (#FBE3E3, #3A1717, #FFFFFF). Ils remplacent les couleurs d'erreur, du bouton danger et de la difficulté Soutenue, codées en dur jusque-là.

### Typographie

| Style | Taille | Graisse | Usage |
| --- | --- | --- | --- |
| Base | 18 px (112,5 %) | 400 | Corps de texte, interligne 1,5 |
| h1 | 1,75 rem | 700 | Titres d'onboarding, titre de balade (1,5 rem) |
| h2 / `.sec-title` | 1,2 / 1,15 rem | 700 | Titres de section |
| `.sub-title` (h3) | 0,98 rem | 700 | Sous-sections Petites victoires, Bonnes habitudes |
| `.big` | 2 rem | 700 | Chiffres clés, chiffres tabulaires |
| `.kv-label` | 0,95 rem | 700 | Libellés de données |
| `.small` | 0,9 rem | 400 | Texte secondaire |
| Badge, chip | 0,8 / 0,78 rem | 700 | Étiquettes |

### Espacements et rayons

- Rayons : 5 tokens, appliqués à toutes les déclarations du CSS. `--r-sm` 8 px, `--r-md` 14 px, `--r-lg` 18 px, `--r-xl` 22 px, `--r-pill` 999 px (pastilles et cercles). Seul le cadre du téléphone (44 px, affichage desktop) reste hors échelle.
- Espacements : 8 tokens, appliqués à toutes les propriétés `gap`. `--space-1` 0,2 rem, `--space-2` 0,3 rem, `--space-3` 0,4 rem, `--space-4` 0,5 rem, `--space-5` 0,6 rem, `--space-6` 0,75 rem, `--space-7` 0,9 rem, `--space-8` 1,1 rem. Les `padding` et `margin` utilisent aussi ces tokens, plus une gouttière de page --gutter (1,25 rem). Restent hors échelle quelques valeurs propres à un composant : chevauchement du header (-4,9 rem), place des icônes dans le champ de recherche (2,8 rem), bas de page (1,5 rem), cadre desktop (32 px).
- Bordure : `--bw` = 2 px, 3 px en contraste élevé.

### Modes

| Mode | Attribut | Effet |
| --- | --- | --- |
| Clair | défaut | Palette claire |
| Sombre | `prefers-color-scheme: dark` ou `data-theme="dark"` | Palette sombre |
| Contraste élevé | `data-contrast="high"` | Noir et blanc, bordures 3 px, focus jaune |
| Texte grand | `data-text="large"` | Police à 131 %, cartes empilées |
| Texte très grand | `data-text="xlarge"` | Police à 150 %, cartes empilées |
| Mouvement réduit | `data-motion="reduce"` | Animations et transitions coupées |

## Composants et états

Le prototype utilise 34 composants. Tous ont un état focus clavier (`--focus`), et un état contraste élevé hérité des tokens.

| Catégorie | Composant | Variants | États |
| --- | --- | --- | --- |
| Action | Button `.btn` | primary, secondary, quiet (lien), danger | default, focus, disabled, pressed |
| Action | Icon button `.icon-btn` | retour, sync, podomètre, réglages, profil | default, focus, syncing (rotation), done (coche), badge-dot connecté |
| Action | Button group `.bal-tgroup` | imprimer + partager | default, focus |
| Action | Lien texte `.defi-rlink`, `.sq-btn` | Rejoindre, À faire | à faire, rejoint, fait (coche) |
| Navigation | Tab bar `.tabbar` | 4 entrées | default, active (`aria-current`) |
| Navigation | Top bar `.topbar` | titre centré, retour, Aide, transparent | fixe, fond plein, transparent sur carrousel, plein au scroll |
| Navigation | Ancres `.bal-dtabs` | 3 ou 4 sections | default, sticky sous le header |
| Navigation | Segmented `.seg-bar` | périodes 1j à 1a | default, selected |
| Saisie | Champ texte `.field` | texte, téléphone, code SMS, textarea | default, focus, erreur, rempli automatiquement |
| Saisie | Choice `.choice` | radio card, ligne | default, checked, focus |
| Saisie | Switch `.switch` | Activé / Désactivé | on, off, focus |
| Saisie | Segments texte `.seg` | taille du texte | normal, grand, très grand |
| Saisie | Barre de recherche `.bal-field` | loupe, jeton, saisie, effacer, filtre | autour de moi, ville, vide (placeholder), saisie en cours |
| Saisie | Suggestions `.bal-suggest` | position, villes + nombre | ouvert, fermé, filtré |
| Saisie | Chip filtre `.bal-chip` | type, difficulté | default, pressed, disabled (barré) |
| Affichage | Card `.card` | standard, cap du jour, défi, kpi | default, is-done, empty |
| Affichage | Carte balade `.bal-card` | solo, groupe | default, focus (lien) |
| Affichage | Rail card `.rcard` | conseil, défi, voir plus | default, focus |
| Affichage | Carte carrée `.sq-card` | petite victoire | à faire, fait |
| Affichage | Stat `.stat` + anneau `ring` | pas, sorties, durée | vide (–), en cours, atteint |
| Affichage | KPI `.kpi` | total, moyenne, durée | rempli, vide (–) |
| Affichage | Barre de progression `.track` | pas, minutes | 0 %, en cours, 100 % |
| Affichage | Badge `.badge` | neutre, ok | default |
| Affichage | Chip difficulté `.chip` | Pour tous, Modérée, Soutenue | clair, sombre, contraste |
| Affichage | Tag filtre `.bal-tag` | localisation, type, difficulté | avec croix, sans croix |
| Affichage | Badge trophée `.trophy-badge` | 6 niveaux | acquis (coche), grisé |
| Affichage | Carrousel `.bal-slider` | tracé, points, surface | diapo 1 à 3, points de progression |
| Affichage | Graphique `.pchart` | barres, objectif | 1j anneau, 7j, 4s, 1a |
| Affichage | Tuile conseil `.tip-tile` | chaussures, eau, bancs, téléphone | default |
| Affichage | Carte participant `.pax-card` | initiale + prénom | default |
| Feedback | Drawer `.sheet` | 13 contenus | ouvert, fermé, animé, mouvement réduit |
| Feedback | Toast `.toast` | information | visible, masqué |
| Feedback | Message d'erreur `.error` | formulaire | masqué, visible (`role=alert`) |
| Feedback | Confirmation en ligne `.inline-confirm` | effacement | default |

Variables Figma conseillées : collection Couleurs (3 modes), collection Typo (3 tailles), booléen Mouvement.

### Familles fusionnées

Le 10 octobre 2026, cinq familles de composants ont été fusionnées : la différence entre leurs membres passe désormais par des variables, et non par une règle CSS séparée.

| Famille | Membres fusionnés | Variables qui portent la différence |
| --- | --- | --- |
| Tag | `.badge`, `.chip`, `.bal-tag`, et les 3 niveaux de difficulté | `--tag-bg`, `--tag-ink`, `--tag-border`, `--tag-pad`, `--tag-size`, `--tag-radius` |
| Button | `.btn` et ses 4 hiérarchies, `.icon-btn` | `--btn-bg`, `--btn-ink`, `--btn-border`, `--btn-pad`, `--iconbtn-size`, `--iconbtn-radius` |
| Card | `.card`, `.rcard`, `.sq-card`, `.pt-card`, `.pax-card` | `--card-bg`, `--card-border`, `--card-radius`, `--card-pad`, `--card-width` |
| Segmented | `.seg-bar`, `.seg-opt`, `.bal-chip`, `.cat-badge` | `--seg-radius`, `--seg-opt-radius`, `--seg-gap` |
| Metric | `.stat`, `.kpi`, `.track` | `--metric-pad`, `--metric-gap`, `--track-h`, `--track-bg` |

Pour Figma, cela ramène l'inventaire de 34 à 21 composants : un composant par famille, avec ses propriétés (hiérarchie, taille, orientation, variante de couleur) au lieu de plusieurs composants proches.

Composants ajoutés le 10 octobre 2026 : spinner de connexion (`.spinner`, animation coupée en mouvement réduit) et pastille de succès (`.ok-ico`), tous deux dans l'étape podomètre de l'onboarding.

## Variables d'état et données

L'état applicatif tient dans un objet `state`. Les variables marquées « persistée » sont conservées sur l'appareil (localStorage).

| Variable | Valeurs | Persistée | Rôle |
| --- | --- | --- | --- |
| `screen` | 11 routes | non | Écran affiché |
| `level` | doux, progresser, accomp | oui | Parcours, fixe le cap (5 000, 7 000, 10 000 pas) |
| `goalMetric` | duree, sorties, pas | oui | Mesure de l'objectif, réordonne l'accueil |
| `locAuth` | true, false | oui | Localisation autorisée. Remise à false à l'entrée dans l'onboarding |
| `name`, `phone` | texte | oui (prénom) | Identité |
| `onboarded`, `isNew` | booléen | oui | Parcours terminé, compte vide |
| `pedo` | nom d'appareil ou null | oui | Podomètre connecté |
| `pedoAuto`, `lastSync`, `syncCount` | booléen, heure, nombre | oui (syncCount) | Synchronisation |
| `lastSync`, `syncCount` | heure, nombre | oui | Relevé des pas. `pedoAuto` a été supprimé : le relevé automatique est toujours actif |
| `textSize`, `contrast`, `motion` | normal/large/xlarge, booléens | oui | Accessibilité |
| `notif1`, `notif2` | booléen | oui | Rappels |
| `week` | 7 jours × minutes | oui | Données de marche |
| `defisValides` | id → booléen | oui | Défis rejoints ou faits |
| `balDone`, `walksDone` | nombre | oui | Compteurs de balades et de marches, pour les trophées et les défis (par exemple 5 marches) |
| `balSearch` | scope + ville | non | Recherche de balades |
| `balMode`, `balDiff` | all/solo/groupe, all/pour-tous/moderee/soutenue | non | Filtres de balades |
| `balJoined`, `balFollowed` | liste d'ids | non | Inscriptions et suivis |
| `pasMetric`, `pasPeriod`, `pasDay`, `pasWeek`, `pasBlock` | pas/sorties, 1j/7j/4s/1a, décalages | non | Historique |
| `running`, `elapsed`, `exploTrack` | booléen, secondes, id | non | Marche en cours |
| `sheet` | 13 drawers ou null | non | Drawer ouvert |

**Constantes** : `STEP_MIN` = 100 pas par minute, `KM_PER_STEP` = 0,00075, 1 sortie = 12 minutes, code SMS de démo = 123456.

**Jeux de données fictifs** : 3 parcours, 2 balades de groupe, 2 campagnes D-carte, 3 observations, 3 villes, 14 sorties, 3 défis Petites victoires, 4 Bonnes habitudes, 3 Exploration (masqués), 6 trophées.

## Epics

Chaque epic correspond à une page ou à un parcours transverse. La priorité suit la règle MVP : P1 pour le parcours de base, P2 pour l'engagement, P3 pour l'extension communautaire.

| Epic | Pages | Objectif utilisateur | Stories | Priorité |
| --- | --- | --- | --- | --- |
| E1 Compte et sécurité | Drawers connexion, inscription, Profil | Accéder à son compte simplement, sans mot de passe | US-01 à US-03 | P1 |
| E2 Onboarding | Onboarding | Démarrer avec un objectif adapté à son niveau | US-04 à US-07 | P1 |
| E3 Accueil et cap du jour | Accueil | Voir en un coup d'œil où j'en suis aujourd'hui | US-08 à US-11 | P1 |
| E4 Suivi de l'activité | Pas, Sorties | Comprendre ma régularité dans le temps | US-12 à US-13 | P1 |
| E5 Podomètre | Podomètre | Compter mes pas sans y penser | US-14 à US-16 | P1 |
| E6 Marche | Marche en cours | Marcher à mon rythme, en sécurité | US-17 à US-18 | P1 |
| E7 Balades | Balades, Balade | Trouver une balade adaptée près de chez moi | US-19 à US-24 | P2 |
| E8 Pas à pas et trophées | Pas à pas | Garder la motivation sans pression de performance | US-25 à US-28 | P2 |
| E9 Contenus et D-cartes | Parcourir | Apprendre et partager des conseils | US-29 | P3 |
| E10 Accessibilité et données | Réglages, Profil | Adapter l'app à mes besoins et maîtriser mes données | US-30 à US-31 | P1 |

## User stories

31 stories, rédigées pour le persona principal : une personne de 65 ans ou plus, peu active, peu à l'aise avec le numérique. Chaque story liste ses critères d'acceptance testables et les états UI à couvrir.

### E1 Compte et sécurité

**US-01 Créer un compte** · P1 · 3 pts En tant que nouvelle utilisatrice, je veux créer un compte avec mon prénom et mon téléphone, afin de commencer sans retenir de mot de passe.

- [x] Le code SMS est demandé après le numéro, puis vérifié.
- [x] Un numéro invalide affiche un message d'erreur explicite.
- [x] Après validation, l'onboarding démarre à l'étape objectif.

* États : vide, saisie, envoi du code, code faux, succès.

**US-02 Se connecter** · P1 · 2 pts En tant qu'utilisatrice inscrite, je veux me reconnecter avec mon numéro et un code SMS, afin de retrouver mes données.

- [x] Un lien « renvoyer le code » est disponible.
- [x] Après validation, l'accueil s'affiche avec mes données.

* États : saisie, code envoyé, code faux, succès.

**US-03 Gérer mon compte** · P1 · 3 pts En tant qu'utilisatrice, je veux changer de numéro, me déconnecter ou supprimer mon compte, afin de garder le contrôle sur mon identité.

- [x] La suppression demande une case à cocher puis un code SMS.
- [x] Après suppression, les données locales sont effacées et l'onboarding s'affiche.

* États : défaut, confirmation, erreur de case non cochée, succès.

### E2 Onboarding

**US-04 Choisir mon objectif** · P1 · 2 pts En tant que débutante, je veux choisir parmi 3 parcours, afin d'avoir un cap réaliste.

- [x] Continuer sans choix affiche « Choisissez un objectif pour continuer ».
- [x] Le parcours fixe le cap à 5 000, 7 000 ou 10 000 pas.

**US-05 Choisir comment mesurer mon objectif** · P1 · 2 pts En tant qu'utilisatrice, je veux mesurer mon objectif en durée, en sorties ou en pas, afin de suivre ce qui a du sens pour moi.

- [x] Durée est sélectionnée par défaut.
- [x] Le choix est modifiable dans le Profil et change l'accueil.

**US-06 Autoriser la localisation** · P1 · 2 pts En tant qu'utilisatrice, je veux autoriser ou refuser la localisation dans l'étape motivation, afin de voir des balades proches sans y être obligée.

- [x] L'accord est désactivé à l'arrivée sur l'étape, et le refus laisse l'app utilisable.
- [ ] Le choix règle l'état de la barre de recherche des balades.

**US-07 Connecter un podomètre et choisir mes rappels** · P1 · 3 pts En tant qu'utilisatrice, je veux connecter mon podomètre et activer des rappels doux, afin que mes pas soient comptés et que je reste motivée.

- [ ] La recherche montre « Recherche d'appareils », puis la liste. Un appareil déjà connecté à un autre compte n'y figure pas.
- [ ] La sélection d'un appareil précède la connexion, puis un spinner et le message « Podomètre connecté » s'affichent. Le relevé automatique est activé dès la connexion. Tout refuser reste possible.

* États : recherche, trouvé, sélectionné, connexion en cours, podomètre connecté, refus.

### E3 Accueil et cap du jour

**US-08 Voir mon cap du jour** · P1 · 3 pts En tant qu'utilisatrice, je veux voir mon avancement dans l'unité choisie, afin de savoir ce qu'il me reste à faire.

- [ ] La valeur, la barre et le message suivent la mesure choisie.
- [ ] Avant la première marche : « Un tout petit tour de 10 minutes pour bien démarrer. »
- [ ] Dès une sortie : « Bravo, vous avez effectué » + badge du nombre de sorties.

* États : vide, en cours, atteint.

**US-09 Comparer hier et la semaine** · P1 · 3 pts En tant qu'utilisatrice, je veux voir hier et les 7 derniers jours, afin de constater ma régularité.

- [ ] L'ordre et le contenu des cartes suivent la mesure choisie (durée, sorties, pas).
- [ ] Un compte nouveau affiche « – ».
- [ ] Les cartes Pas et Sorties ouvrent leur historique.

**US-10 Trouver une idée de sortie** · P2 · 2 pts En tant qu'utilisatrice, je veux une rangée de petites sorties sur l'accueil, afin de passer à l'action sans réfléchir.

- [ ] La dernière carte « Voir toutes les idées de sorties » ouvre Pas à pas.

**US-11 Découvrir balades et conseils** · P2 · 2 pts En tant qu'utilisatrice, je veux voir 3 idées de balades et des conseils, afin d'aller plus loin.

- [ ] Les cartes affichent titre, distance, difficulté, type.
- [ ] « Voir plus de balades » ouvre la page Balades.

### E4 Suivi de l'activité

**US-12 Consulter mes pas** · P1 · 5 pts En tant qu'utilisatrice, je veux voir mes pas par jour, semaine, 4 semaines et année, afin de suivre mes progrès.

- [ ] Le graphique montre l'objectif quotidien.
- [ ] Le bouton « suivant » est désactivé sur la période en cours.

* États : vide, jour, semaine, 4 semaines, année.

**US-13 Consulter mes sorties** · P1 · 3 pts En tant qu'utilisatrice, je veux le même historique en nombre de sorties, afin de valoriser la régularité plutôt que la quantité.

- [ ] Objectif de 2 sorties par jour, totaux en sorties et en minutes.

### E5 Podomètre

**US-14 Voir l'état de mon podomètre** · P1 · 2 pts En tant qu'utilisatrice, je veux voir le modèle, la version, la batterie et le signal, afin de savoir si tout fonctionne.

- [ ] L'icône de l'en-tête porte un point vert quand l'appareil est connecté.

**US-15 Relever mes pas et déconnecter l'appareil** · P1 · 3 pts En tant qu'utilisatrice, je veux que mes pas arrivent tout seuls dans l'application, et pouvoir lancer un relevé à la demande, afin d'avoir des données à jour.

- [ ] Le relevé automatique est actif dès la connexion et n'est pas désactivable.
- [ ] L'icône tourne pendant le relevé, puis affiche une coche 1,5 s, et l'heure du dernier relevé s'affiche.

* États : non connecté, connecté, relevé en cours, relevé effectué, déconnecté.

**US-16 Être récompensée au premier relevé** · P2 · 2 pts En tant que nouvelle utilisatrice, je veux être félicitée quand mes pas arrivent pour la première fois, afin de me sentir encouragée dès le départ.

- [ ] Le trophée Premier pas passe en acquis, avec une coche.
- [ ] Un drawer affiche le nom du trophée et la raison du gain.

### E6 Marche

**US-17 Faire une marche** · P1 · 3 pts En tant qu'utilisatrice, je veux lancer, mettre en pause et terminer une marche, afin de marcher à mon rythme.

- [ ] La flèche de retour ramène à l'accueil.
- [ ] Les minutes sont ajoutées seulement si j'ai accepté l'enregistrement.

**US-18 Signaler une observation** · P3 · 3 pts En tant que participante à une marche exploratoire, je veux signaler un obstacle en 5 catégories, afin d'améliorer mon quartier.

- [ ] La catégorie est obligatoire, la photo et le commentaire sont facultatifs.

### E7 Balades

**US-19 Chercher autour de moi** · P2 · 3 pts En tant qu'utilisatrice, je veux voir les balades autour de moi par défaut, afin de trouver vite une balade proche.

- [ ] Le badge « Autour de moi » avec icône et croix remplace le placeholder.
- [ ] Sans géolocalisation ni ville, le placeholder « Rechercher une ville » s'affiche.

**US-20 Chercher par ville** · P2 · 3 pts En tant qu'utilisatrice, je veux taper une ville et choisir une suggestion, afin de trouver des balades ailleurs.

- [ ] Les suggestions affichent le nombre de balades par ville.
- [ ] Une ville sans balade propose les balades à moins de 5 km.

**US-21 Filtrer les balades** · P2 · 3 pts En tant qu'utilisatrice, je veux filtrer par type et par difficulté, afin de choisir une balade adaptée.

- [ ] Les filtres sans résultat sont désactivés et barrés.
- [ ] Les filtres actifs s'affichent en badges, avec une croix pour les retirer.
- [ ] Le libellé est « Filtre : » pour 1 filtre et « Filtres : » pour 2.

**US-22 Consulter une fiche balade** · P2 · 5 pts En tant qu'utilisatrice, je veux voir les visuels, la distance, la difficulté, les conseils et les points de passage, afin de me préparer.

- [ ] Le header est transparent sur le carrousel, puis plein au défilement.
- [ ] Les onglets restent collés sous le header et font défiler jusqu'à la section.
- [ ] Une balade solo n'a pas de section Participants.

**US-23 Rejoindre une balade de groupe** · P2 · 3 pts En tant qu'utilisatrice, je veux m'inscrire à une balade de groupe, afin de marcher accompagnée.

- [ ] Le bouton « Comment y aller » m'inscrit, « Me désinscrire » annule.
- [ ] Une balade pleine affiche « Complet ».

**US-24 Partager ou imprimer une balade** · P3 · 2 pts En tant qu'utilisatrice, je veux partager ou imprimer la fiche, afin de proposer la balade à un proche.

- [ ] Le partage propose SMS, WhatsApp et copie du lien.
- [ ] L'impression masque les boutons et la navigation.

### E8 Pas à pas et trophées

**US-25 Relever le défi du moment** · P2 · 2 pts En tant qu'utilisatrice, je veux un seul défi mis en avant, afin de savoir quoi faire aujourd'hui.

- [ ] Le lien Rejoindre devient « Rejoint ».

**US-26 Réaliser des petites victoires** · P2 · 2 pts En tant qu'utilisatrice, je veux des actions courtes à cocher, afin de transformer un déplacement du quotidien en victoire.

- [ ] Chaque carré passe de « À faire » à « Fait » avec une coche.

**US-27 Rejoindre une bonne habitude** · P2 · 3 pts En tant qu'utilisatrice, je veux rejoindre un défi de régularité, afin d'ancrer la marche dans ma routine.

- [ ] Manquer un jour remet le compteur à zéro, avec un message non culpabilisant et une proposition de retenter le défi.

**US-28 Voir mes trophées** · P2 · 3 pts En tant qu'utilisatrice, je veux voir mes trophées acquis et à venir, afin de mesurer mon chemin parcouru.

- [ ] Acquis : coloré, avec coche. Non acquis : grisé.
- [ ] Un tap ouvre le détail : concept, condition, progression.

### E9 Contenus et D-cartes

**US-29 Lire et proposer une D-carte** · P3 · 3 pts En tant qu'utilisatrice, je veux lire des conseils et soumettre le mien, afin de partager mon expérience.

- [ ] Titre, thème et conseil sont obligatoires.
- [ ] La carte soumise apparaît « En relecture ».

### E10 Accessibilité et données

**US-30 Adapter l'affichage** · P1 · 3 pts En tant que personne malvoyante, je veux agrandir le texte, augmenter le contraste et réduire les animations, afin de lire confortablement.

- [x] Aucun texte ne déborde en très grand texte.
- [x] Le contraste élevé passe à 3 px de bordure et à un focus jaune.

**US-31 Maîtriser mes données** · P1 · 2 pts En tant qu'utilisatrice, je veux savoir ce qui est conservé sur mon téléphone et pouvoir tout effacer, afin de garder le contrôle sur ma vie privée.

- [ ] Une phrase indique que les marches restent sur le téléphone et ne sont ni envoyées ni partagées.
- [ ] L'effacement demande une confirmation en ligne et efface toutes les marches, pas seulement celles du jour.

## Incohérences et questions ouvertes

Les 9 incohérences relevées sont résolues au 9 octobre 2026. Il reste 1 question produit à trancher avant le handoff.

- [ ] Défis Exploration débloqués par surprise : les défis et leurs événements déclencheurs sont à définir.
