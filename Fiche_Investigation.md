# Fiche d'investigation

## Fonctionnalité :

Filtrer les recettes dans l’interface utilisateur

## Problématique :

Accéder rapidement à une recette correspondant à un besoin de l’utilisateur dans les recettes déjà reçues

### Option 1 :

Utilisation de boucles natives - boucle `FOR` - pour gérer et itérer à travers les tableaux des recettes et les listes de tags, dans le but de rechercher des recettes à partir d’un champ de recherche principal et/ou de filtres par tags.

#### Avantages :

**Contrôle précis sur l'itération** : La boucle `for` offre un contrôle précis sur les indices et permet d'accéder facilement aux éléments d'un tableau.
**Compatibilité avec les versions antérieures de JavaScript** : Les boucles `for` sont prises en charge dans toutes les versions de JavaScript, offrant ainsi une compatibilité accrue avec différents environnements.

#### Inconvénients :

**Syntaxe verbeuse** : La syntaxe de la boucle `for` peut être verbeuse, ce qui peut rendre le code moins lisible, surtout pour des itérations complexes.
**Risque d'erreurs d'indexation** : Une mauvaise gestion des indices dans une boucle `for` peut entraîner des erreurs d'indexation et des bugs difficiles à déboguer.

### Option 2 :

Utilisation de la programmation fonctionnelle JavaScript avec les méthodes de l'objet array `FOREACH` pour gérer et itérer à travers les tableaux des recettes et les listes de tags, dans le but de rechercher des recettes à partir d’un champ de recherche principal et/ou de filtres par tags.

#### Avantages :

**Lisibilité améliorée** : La boucle `forEach` offre une syntaxe plus concise et plus lisible par rapport à la boucle `for`, ce qui rend le code plus facile à comprendre.
**Facilité d'utilisation avec des fonctions de rappel** : La boucle `forEach` facilite l'utilisation de fonctions de rappel, ce qui permet d'effectuer des opérations sur chaque élément de manière plus expressive.

#### Inconvénients :

**Incapacité à utiliser le mot-clé return pour arrêter l'itération** : Dans une boucle `forEach`, il n'est pas possible d'utiliser les mots-clé return et break pour arrêter prématurément l'itération, ce qui peut être nécessaire dans certains cas.

## Solution retenue :

J’ai plutôt retenu la solution utilisant **la méthode `forEach`** plutôt que la boucle `for`.
Après réalisation de test de performances sur le site [jsben.ch](http://jsben.ch/), j' ai pu constater que l’utilisation des méthodes de programmation fonctionnelle JavaScript comme `forEach` et `map` était plus rapide dans l'exécution des itérations qu’avec les boucle natives:

| Méthode | Itérations par seconde | Score |
| ------- | ---------------------- | ----- |
| ForEach | 2 743 809              | 100%  |
| For     | 2 647 907              | 96.5% |

Si ces tests avaient montré que la boucle `for` était significativement plus rapide, alors dans ce cas particulier, elle aurait été préférée malgré sa syntaxe plus verbeuse.

De plus, la syntaxe de `forEach` est plus simple et intuitive, ce qui réduit le risque d'erreurs de syntaxe et facilite la compréhension du code pour les développeurs.

Enfin, l'utilisation de méthodes de haut niveau comme `forEach`, `map`, etc., est considérée comme plus conforme à la pratique moderne de la programmation JavaScript, qui favorise un code plus déclaratif et fonctionnel.
