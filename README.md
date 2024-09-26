![image](https://github.com/user-attachments/assets/05b8ff42-662e-44b7-a568-9480138a9c0a)

# 🚀 Fonctionnalités

memoire est une application web pour réviser à l'aide de flashcards.

## 🃏 Decks

Pour réviser, l'utilisateur va pouvoir créer (ou importer) des decks. Ces decks regoupent de `0 à n` flashcards.
Chaque deck contient :
| Nom | Nombre | Example | Modifiable |
| :- | :-: | :-: | :-: |
| Flashcards | `0 à n` | _Qst / Réponse_ | ✅ |
| Titre | 1 | _Python_ | ✅ |
| Tags | `0 à n` | `['code', 'algo']` | ✅ |
| Code de partage | `1` | _abc123_ | ❌ |

## ✍️ Flashcards

Chaque flashcard contient une question et une réponse au format texte uniquement (pour le moment).

| Champ    |            Description             |
| :------- | :--------------------------------: |
| Question |     Le contenu de la question      |
| Réponse  | La solution associée à la question |

### Création et gestion des flashcards

- **Création** : L'utilisateur peut ajouter une flashcard à un deck existant.
- **Modification** : Les questions et les réponses peuvent être éditées à tout moment.
- **Supression** : Si une carte n'est plus pertinente, elle peut être retirée du deck.

## 🧠 Révisions

L'application propose un système de révision intelligent permettant à l'utilisateur d'évaluer sa maîtrise des flashcards en 4 niveaux :
`à revoir`, `difficile`, `bien`, et `facile`.\
**L'objectif est de se baser sur les recommendations de la recherche pour proposer un outil adapté à l'apprentissage.**

### Fonctionnement de l'algorithme de révision

1. **Évaluation initiale** : Chaque flashcard est présentée à l'utilisateur, qui doit s'auto-évaluer sur un des 4 niveaux.
2. **Gestion des niveaux** :
   - Tant que la révision comporte des flashcards avec le statut `à revoir`, la session n'est pas considérée comme terminée.
   - (⚠️ TODO) _Les cartes évaluées comme `facile` ou `bien` apparaîtront de moins en moins souvent au fil des sessions_
   - (⚠️ TODO) _Les cartes `difficile` reviendront plus souvent jusqu'à ce qu'elles soient maîtrisées_
3. **Amélioration continue** : Cet algorithme sera affiné à l'avenir en intégrant les recommandations de la recherche sur la mémorisation et l'efficacité des révisions.

Références :

- [Seibert Hanson, A. E., & Brown, C. M. (2019). Enhancing L2 learning through a mobile assisted spaced-repetition tool: an effective but bitter pill?](https://www.tandfonline.com/doi/full/10.1080/09588221.2018.1552975?scroll=top&needAccess=true)
- [Anki Flashcards](https://faqs.ankiweb.net/what-spaced-repetition-algorithm.html)
- [SuperMemo](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)

### Mode de révision

- **Mode classique** : L'utilisateur révise un deck en répondant à chaque flashcard, puis évalue sa réponse selon les 4 niveaux.
- (⚠️ TODO) **\*Mode examen** : Les flashcards sont présentées sans correction immédiate, imitant une situation d'examen.\*

# 🤝 Contribuer

Les contributions à travers du développement, des [issues](https://github.com/memoire-app/memoire-app/issues) ou des demandes de fonctionnalités sont les bienvenus. \
Un [Discord](https://discord.gg/CcqzXXJfvm) est disponible pour échanger facilement.

## 💻 Configuration

Après avoir récupéré le projet localement, vous pouvez installer les dépendances nécessaires avec :

```
npm i
```

Pour créer les `containers Docker` :

```
docker compose up -d
```

Des `.env` sont nécessaires au fonctionnement de l'application (pour le `front` ET le `back`). Des `.env.example` sont disponibles avec les valeurs attendues.

> [!NOTE]  
> Des README.md sont égalements présents dans les dossiers `/frontend` et `/backend`, n'hésitez pas à vous y réferrer.

Lorsque ces différentes étapes sont finies, vous pouvez lancer le projet en exécutant (dans `/frontend` et `/backend`) la commande :

```
npm run dev
```

# ⚙️ Architecture

![memoire_archi](https://github.com/user-attachments/assets/1a72fa69-2003-4710-9fe9-dda5ff47e942)

- [Nuxt](https://nuxt.com/) avec Typescript pour le frontend
- [AdonisJS](https://adonisjs.com/) pour le backend
- [PostgreSQL](https://www.postgresql.org/) pour la BDD

> [!IMPORTANT]  
> Cette architecture ne représente que la vue "macro", une vue + détaillée sera réalisée prochainement.

# 🙏 Crédits

- [Rémi Saurel](https://github.com/RemiSaurel) - 🧑‍💻 Créateur et développeur
- [Amine Naim](https://github.com/aminenaim) - 🚰 Développeur (DevOps)
