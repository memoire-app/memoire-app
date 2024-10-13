![image](https://github.com/user-attachments/assets/05b8ff42-662e-44b7-a568-9480138a9c0a)

# 🚀 Features

memoire is a web application for studying using flashcards.

## 🃏 Decks

To study, the user can create (or import) decks. These decks group from `0 to n` flashcards.
Each deck contains:
| Name | Number | Example | Modifiable |
| :- | :-: | :-: | :-: |
| Flashcards | `0 to n` | _Qst / Answer_ | ✅ |
| Title | 1 | _Python_ | ✅ |
| Tags | `0 to n` | `['code', 'algo']` | ✅ |
| Share Code | `1` | _abc123_ | ❌ |

## ✍️ Flashcards

Each flashcard contains a question and an answer in text format only (for now).

| Field    |                Description                |
| :------- | :---------------------------------------: |
| Question |        The content of the question        |
| Answer   | The solution associated with the question |

### Creating and managing flashcards

- **Creation**: The user can add a flashcard to an existing deck.
- **Modification**: Questions and answers can be edited at any time.
- **Deletion**: If a card is no longer relevant, it can be removed from the deck.

## 🧠 Revisions

The application offers an intelligent revision system allowing the user to evaluate their mastery of flashcards in 4 levels:
`to review`, `difficult`, `good`, and `easy`.\
**The goal is to base the tool on research recommendations to provide a suitable learning tool.**

### How the revision algorithm works

1. **Initial evaluation**: Each flashcard is presented to the user, who must self-evaluate on one of the 4 levels.
2. **Level management**:
   - As long as the revision includes flashcards with the status `to review`, the session is not considered complete.
   - (⚠️ TODO) _Cards evaluated as `easy` or `good` will appear less and less often over sessions_
   - (⚠️ TODO) _`Difficult` cards will come back more often until they are mastered_
3. **Continuous improvement**: This algorithm will be refined in the future by integrating research recommendations on memorization and revision efficiency.

References:

- [Seibert Hanson, A. E., & Brown, C. M. (2019). Enhancing L2 learning through a mobile assisted spaced-repetition tool: an effective but bitter pill?](https://www.tandfonline.com/doi/full/10.1080/09588221.2018.1552975?scroll=top&needAccess=true)
- [Anki Flashcards](https://faqs.ankiweb.net/what-spaced-repetition-algorithm.html)
- [SuperMemo](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)

### Revision mode

- **Classic mode**: The user reviews a deck by answering each flashcard, then evaluates their answer according to the 4 levels.
- (⚠️ TODO) **\*Exam mode**: Flashcards are presented without immediate correction, imitating an exam situation.\*

# 🤝 Contribute

Contributions through development, [issues](https://github.com/memoire-app/memoire-app/issues), or feature requests are welcome. \
A [Discord](https://discord.gg/CcqzXXJfvm) is available for easy communication.

## 💻 Configuration

After retrieving the project locally, you can install the necessary dependencies with:

```
npm i
```

To create the `Docker containers`:

```
docker compose up -d
```

`.env` files are required for the application to function (for both `front` AND `back`). `.env.example` files are available with the expected values.

> [!NOTE]  
> README.md files are also present in the `/frontend` and `/backend` folders, feel free to refer to them.

When these steps are completed, you can start the project by running (in `/frontend` and `/backend`) the command:

```
npm run dev
```

# ⚙️ Architecture

![memoire_archi](https://github.com/user-attachments/assets/1a72fa69-2003-4710-9fe9-dda5ff47e942)

- [Nuxt](https://nuxt.com/) with Typescript for the frontend
- [AdonisJS](https://adonisjs.com/) for the backend
- [PostgreSQL](https://www.postgresql.org/) for the database

> [!IMPORTANT]  
> This architecture represents only the "macro" view, a more detailed view will be created soon.
