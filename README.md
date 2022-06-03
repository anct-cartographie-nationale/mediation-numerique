# Bibliothèque pour la cartographie de l’offre de médiation numérique

## À propos

Il s'agit d'une collection d'éléments Angular à destination des projets qui ont pour vocation d'intégrer des fonctionnalités liées au recensement de l'offre de médiation numérique sur le territoire Français et à l'orientation des usagers vers les services de médiation numérique les plus adaptés à leurs besoins.

## Table des matières

- 🪧 [À propos](#à-propos)
- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 🛠️ [Utilisation](#utilisation)
- 🤝 [Contribution](#contribution)
- 🏗️ [Construit avec](#construit-avec)
- 📚 [Documentation](#documentation)
- 🏷️ [Gestion des versions](#gestion-des-versions)
- 📝 [Licence](#licence)

## Prérequis

- [Git](https://git-scm.com/) : Système de contrôle de versions distribué d'un ensemble de fichiers
- [Node](https://nodejs.org/) : Environnement d'exécution pour Javascript
- [Yarn](https://yarnpkg.com/) : Gestionnaire de paquets pour les produits développés dans des environnements Node

> Node et Yarn peuvent être installés via [nvm](https://github.com/nvm-sh/nvm) qui permet d'obtenir et d'utiliser rapidement différentes versions de Node via la ligne de commande.

## Installation

### Pour l'utiliser dans un projet Angular

- Avec yarn : `yarn add @gouvfr-anct/mediation-numerique`
- Avec npm : `npm install @gouvfr-anct/mediation-numerique`

### Pour contribuer au développement

Ce projet a été construit dans un espace de travail Angular, pour fonctionner correctement, il est nécessaire de le cloner dans un environnement similaire :

#### En utilisant l'espace de travail original

- Suivre la procédure d'installation du projet [Client Base](https://github.com/anct-cartographie-nationale/client-base)
- Une fois que l'espace de travail est prêt, il faut créer le dossier `@gouvfr-anct` dans `projects`
- Puis cloner le dépôt en local dans le dossier `projects/@gouvfr-anct` : `git clone git@github.com:anct-cartographie-nationale/mediation-numerique.git`

#### En utilisant un projet Angular déjà existant

- Dans le dossier du projet Angular cible, lancer la commande de génération de bibliothèques : `ng generate library @gouvfr-anct/mediation-numerique`
- Cette commande va adapter les fichiers `package.json`, `angular.json` et `tsconfig.json` pour adapter le projet au développement de la bibliothèque qui vient d'être générée dans le nouveau dossier `projects`
- Créer le fichier `tsconfig.base.json` à la racine du projet et y copier le contenu de `tsconfig.json` en supprimant la propriété `compilerOptions.paths`, pour éviter une duplication il est possible de faire en sorte que `tsconfig.json` étende `tsconfig.base.json` en ajoutant seulement la propriété `compilerOptions.paths`
- Optionnellement, il est possible d'adapter le code généré dans `angular.json` et `tsconfig.json`, ainsi que l'arborescence dans le dossier `projects` afin d'ajouter le `@` manquant pour correspondre au chemin `projects/@gouvfr-anct/mediation-numerique`
- Supprimer le dossier `mediation-numerique` contenant le code de la bibliothèque générée
- Puis cloner le dépôt en local à la place : `git clone git@github.com:anct-cartographie-nationale/mediation-numerique.git`
- Attention à bien installer les paquets npm dont la bibliothèque a besoin dans le projet Angular de base :
  - @angular/flex-layout
  - leaflet
  - geojson
  - @asymmetrik/ngx-leaflet

#### Dans tous les cas

##### Installer Husky

[Husky](https://typicode.github.io/husky) est un outil de gestion des hooks git pour effectuer des tâches automatiques

Mise en place de Husky dans le dossier du projet `@gouvfr-anct/mediation-numerique` :

```bash
npx husky install
```

Rendre exécutable les fichiers qui contiennent les hooks :

```bash
chmod a+x .husky/commit-msg
chmod a+x .husky/pre-commit
```

## Utilisation

Ces commandes servent dans un contexte de développement de la bibliothèque et doivent être exécutées depuis la racine de l'espace de travail, c'est-à-dire depuis le dossier parent du dossier `projects`.

### Construction

Exécuter `yarn build @gouvfr-anct/mediation-numerique` pour construire le projet. Les fichiers de sortie sont écrits dans le dossier `dist/@gouvfr-anct/mediation-numerique/`.

### Test

Exécuter `yarn test @gouvfr-anct/mediation-numerique` pour tester le projet.

> Si suite à un build le dossier `dist` contient `@gouvfr-anct/mediation-numerique`, certains tests sont en erreur, pour résoudre cela, il faut soit supprimer le dossier `@gouvfr-anct/mediation-numerique` dans `dist`, soit exécuter la commande `npx ng test @gouvfr-anct/mediation-numerique` directement dans le dossier `projects/@gouvfr-anct/mediation-numerique`.

### ESLint

Exécuter `yarn lint @gouvfr-anct/mediation-numerique` pour une analyse statique des fichiers `.ts` du projet.

### Commit lint

Exécuter `yarn commitlint --from HEAD~1` pour valider la syntaxe du dernier commit.

### Prettier

Exécuter `yarn prettier` pour mettre à niveau la syntaxe de l'ensemble des fichiers du projet.

## Contribution

### Nommage des branches

- Avant de créer une nouvelle branche de travail, récupérer les dernières modifications disponibles sur la branche `main`
- La nouvelle branche de travail doit ête préfixée par `build/`, `chore/`, `ci/`, `docs/`, `feat/`, `fix/`, `perf/`, `refactor/`, `revert/`, `style/` ou `test/` en fonction du type de modification prévu, pour plus de détails à ce sujet, consulter [Conventional Commits cheat sheet](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)
- Une branche portant une version à publier doit être de la forme `release/X.Y` avec `X.Y` égal au numéro de majeur et de mineur de la release, cela signifie donc que tous les patches sont à appliquer sur la même branche pour chaque version mineure. Cette organisation permet de gérer plusieurs versions de la bibliothèque en parallèle sans mettre en péril la rétrocompatibilité.

### Commits

#### Convention

Les commits de ce repository doivent respecter la syntaxe décrite par la spécification des [Commits Conventionnels](https://www.conventionalcommits.org/fr)

#### Signature

La branche `main`, ainsi que l'ensemble des branches de travail avec un préfixe valide requièrent que les commits soient signés :

- La documentation de GitHub indique comment [configurer la signature des commits](https://docs.github.com/en/enterprise-server@3.5/authentication/managing-commit-signature-verification/about-commit-signature-verification)
- Les utilisateurs de [keybase](https://keybase.io/) peuvent [signer leurs commits avec leur clé GPG sur Keybase](https://stephenreescarter.net/signing-git-commits-with-a-keybase-gpg-key/)

### Publier sur la branche principale

- La branche principale est `main`, il n'est pas possible de publier en faisant un `push` depuis un dépôt local
- Il faut forcément créer une nouvelle branche de travail avec l'un préfixe autorisé
- À chaque publication sur une branche de travail, le workflow `Validate feature` sur [github actions](https://github.com/anct-cartographie-nationale/mediation-numerique/actions) vérifie
  - Qu'il est possible de créer un build sans erreur
  - Que la syntaxe correspond bien à ce qui est [défini par Prettier](https://github.com/anct-cartographie-nationale/client-base/blob/main/.prettierrc.json)
  - Que le code écrit en TypeScript respecte les conventions décrites par les [règles ESLint](https://github.com/anct-cartographie-nationale/client-base/blob/main/.eslintrc.json)
  - Que les messages des commits suivent le standard établi par [Conventional Commits](https://www.conventionalcommits.org/fr)
- Une fois les développements terminés, il faut créer une [pull request](https://github.com/anct-cartographie-nationale/mediation-numerique/pulls) avec la banche de travail comme origin et la branche `main` comme destination.
- La pull request ne peut être fusionné que si :
  - Les étapes du workflow `Validate feature` sont valides
  - Les fichiers modifiés ont été revus par au moins une personne
  - Les commits ajoutés sont signés
- La branche de travail est supprimée automatiquement une fois qu'elle a été fusionnée

### Déployer

Pour publier une nouvelle version, il faut que le numéro de version cible soit mis à jour dans le fichier `package.json`, que le fichier `CHANGELOG.md` soit mis à jour et que le commit de la version à publier porte un tag de la forme `vX.Y.Z` correspondant au numéro de version présent dans `package.json`.

Il est possible d'automatiser ce processus en utilisant la commande `standard-version` :

- Récupérer la version à publier depuis la branche `main`
- Vérifier la valeur du prochain tag avec la commande `standard-version --dry-run`
- Récupérer ou créer la branche `release/X.Y` correspondant à la majeure et la mineure indiquée par la commande précédente
- Lancer la commande `standard-version` qui
  - met à jour la version dans le fichier `package.json`
  - met à jour le fichier `CHANGELOG.md`
  - créé un nouveau commit
  - ajoute le tag correspondant à la version dans le fichier `package.json`
- Pousser la branche avec le tag `git push origin release/X.Y --tags` conduit à la publication d'une nouvelle version
- Si le numéro de version est le plus grand au sens de la [priorité définie par la spécification de la gestion sémantique de version (11)](https://semver.org/lang/fr/), alors il faut créer une [pull request](https://github.com/anct-cartographie-nationale/mediation-numerique/pulls) vers la branche `main`, il ne faut pas le faire si ce n'est pas le cas.

## Construit avec

### langages & Frameworks

- [TypeScript](https://www.typescriptlang.org/) est un langage open source construit à partir de JavaScript
- [Angular](https://angular.io/) est une boîte à outils open source pour construire des clients web

### Outils

#### CLI

- [Jest](https://jestjs.io/) est une boîte à outils pour écrire des tests automatisés en JavaScript
- [Eslint](https://eslint.org/) est un analyseur statique de JavaScript avec les plugins suivants :
- [Prettier](https://prettier.io/) est un magnificateur de code source en JavaScript

#### CI

- [Github Actions](https://docs.github.com/en/actions) est l'outil d'intégration et de déploiement continu intégré à GitHub
  - L'historique des déploiements est disponible [sous l'onglet Actions](https://github.com/anct-cartographie-nationale/mediation-numerique/actions/)
- Secrets du dépôt :
  - `NODE_AUTH_TOKEN` : Clé d'accès NPM pour publier sur l'organisation [@gouvfr-anct](https://www.npmjs.com/org/gouvfr-anct)

#### Déploiement

- [npm](https://www.npmjs.com/) est le registre de référence pour les paquets Node.
  - Organisation : [@gouvfr-anct](https://www.npmjs.com/org/gouvfr-anct)
  - Paquet : [@gouvfr-anct/mediation-numerique](https://www.npmjs.com/package/@gouvfr-anct/mediation-numerique)

## Documentation

### Table des matières

- [Mise en place](#mise-en-place)
  - [Configurations](#configurations)
  - [Modules](#modules)
- [Éléments disponibles](#éléments-disponibles)
  - [Shared](#shared)
  - [Map](#map)
  - [Structure](#structure)

### Mise en place

#### Configurations

Les modules `Map` et `Structure` ont besoin d'être configurés en utilisant la méthode `forRoot` qui prend en paramètre des implémentations côté projet afin de les injecter dans les éléments de la bibliothèque qui en ont besoin.

- Map
  - [GeometryPolygonConfiguration](./src/lib/configurations/geometry-polygon.configuration.ts) : Configuration d'une forme de type `FeatureCollection<Polygon>` à afficher sur la carte
  - [ZoomLevel](./src/lib/configurations/zoom-level.configuration.ts) : Configuration des niveaux de zooms `min`, `regular`, `userPosition` et `max`
  - [InitialPosition](./src/lib/configurations/initial-position.configuration.ts) : Configuration de la position initiale de la carte par la `latitude` et la `longitude`
  - [MarkerType](./src/lib/configurations/marker-type.configuration.ts) : Configuration des types de marqueurs `structure`, `mdm`, `conseillerFrance`, `user`
  - [GeojsonService](./src/lib/map/repositories/geo-json.repository.ts) : Repository disposant des méthodes `getMDMGeoJson` et `getTownshipCoord`
- Structure
  - [SearchService](./src/lib/structure/repositories/search.repository.ts) : Repository disposant des méthodes `getCategoriesAccompaniment`, `getCategoriesOthers`, `getCategoriesTraining` et `getIndex`
  - [StructureService](./src/lib/structure/repositories/structure.repository.ts) : Repository disposant des méthodes `getStructure` et `sendMailOnStructureError`

Les configurations peuvent être définies sous forme d'objets ou d'énumérations dans un dossier `config` du projet, les repositories peuvent être définis comme des services Angular classiques sans `providedIn: 'root'`, car c'est le module de la bibliothèque qui se charge de l'injection dans les providers.

#### Modules

- Shared
  - [ButtonModule](./shared/src/lib/components/button/button.module.ts)
  - [SvgIconModule](./shared/src/lib/components/svg-icon/svg-icon.component.ts)
  - [TextInputModalModule](./shared/src/lib/components/text-input-modal/text-input-modal.module.ts)
  - [ModalModule](./shared/src/lib/directives/modal/modal.module.ts)
  - [TooltipModule](./shared/src/lib/directives/tooltip/tooltip.module.ts)
  - [DayModule](./shared/src/lib/pipes/day/day.module.ts)
  - [PhoneModule](./shared/src/lib/pipes/phone/phone.pipe.ts)
- Map
  - [MapModule](./src/lib/map/components/map.module.ts)
- Structure
  - [StructureModule](./src/lib/structure/modules/structure.module.ts)

### Éléments disponibles

#### Shared

##### Composants

- [ButtonComponent](./shared/src/lib/components/button/button.component.ts)
  - Sélecteur : `app-button`
- [SvgIconComponent](./shared/src/lib/components/svg-icon/svg-icon.component.ts)
  - Sélecteur : `app-svg-icon`
- [TextInputModalComponent](./shared/src/lib/components/text-input-modal/text-input-modal.component.ts)
  - Sélecteur : `app-text-input-modal`

##### Directives

- [ModalOutsideDirective](./shared/src/lib/directives/modal/modalOutside.directive.ts)
  - Sélecteur : `[clickOutside]`
- [TooltipDirective](./shared/src/lib/directives/tooltip/tooltip.directive.ts)
  - Sélecteur : `[app-tooltipDirective]`

##### Pipes

- [DayPipe](./shared/src/lib/pipes/day/day.pipe.ts)
  - Sélecteur : `| day`
- [PhonePipe](./shared/src/lib/pipes/phone/phone.pipe.ts)
  - Sélecteur : `| phone`

#### Map

##### Composants

- [MapComponent](./src/lib/map/components/map.component.ts)
  - Sélecteur : `app-map`

##### Models

- [Equipment](./src/lib/map/models/enum/equipment.enum.ts)
- [typeStructureEnum](./src/lib/map/models/enum/typeStructure.enum.ts)
- [Weekday](./src/lib/map/models/enum/weekday.enum.ts)
- [Address](./src/lib/map/models/address.model.ts)
- [Day](./src/lib/map/models/day.model.ts)
- [GeoJson](./src/lib/map/models/geojson.model.ts)
- [OpeningDay](./src/lib/map/models/openingDay.model.ts)
- [PersonalOffer](./src/lib/map/models/personalOffer.model.ts)
- [Structure](./src/lib/map/models/structure.model.ts)
- [Time](./src/lib/map/models/time.model.ts)
- [Week](./src/lib/map/models/week.model.ts)

##### Repositories

- [GeoJsonRepository](./src/lib/map/repositories/geo-json.repository.ts)

#### Structure

##### Composants

- [CardComponent](./src/lib/structure/components/card/card.component.ts)
  - Sélecteur : `app-card`
- [StructureListSearchComponent](./src/lib/structure/components/search/structure-list-search.component.ts)
  - Sélecteur : `app-structure-list-search`
- [StructureListComponent](./src/lib/structure/components/structure-list/structure-list.component.ts)
  - Sélecteur : `app-structure-list`
- [StructureDetailsComponent](./src/lib/structure/components/structure-details/structure-details.component.ts)
  - Sélecteur : `app-structure-details`

##### Models

- [Category](./src/lib/structure/models/category.model.ts)
- [Filter](./src/lib/structure/models/filter.model.ts)
- [Module](./src/lib/structure/models/module.model.ts)

##### Repositories

- [SearchRepository](./src/lib/structure/repositories/search.repository.ts)
- [StructureRepository](./src/lib/structure/repositories/structure.repository.ts)

## Gestion des versions

Afin de maintenir un cycle de publication clair et de favoriser la rétrocompatibilité, la dénomination des versions suit la spécification décrite par la [Gestion sémantique de version](https://semver.org/lang/fr/)

Les versions disponibles ainsi que les journaux décrivant les changements apportés sont disponibles depuis [la page des Releases](https://github.com/anct-cartographie-nationale/mediation-numerique/releases).

## Licence

Voir le fichier [LICENSE.md](./LICENSE.md) du dépôt.
