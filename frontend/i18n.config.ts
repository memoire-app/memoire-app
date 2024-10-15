export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      landing: {
        welcome: "Join the adventure now",
        study: "Study efficiently with flashcards",
        subtitle:
          "Create decks, practice, and discover decks created by the community",
        create: "Create a deck",
        why: "Why use",
        features: [
          {
            title: "Create your deck",
            content: "🔖 On one side the question, on the other the answer",
          },
          {
            title: "Study effectively",
            content: "📚 Study your courses efficiently and playfully",
          },
          {
            title: "Share your decks",
            content: "😎 Share your decks with your friends and the community",
          },
          {
            title: "Check your stats",
            content: "📊 Check your statistics to track your progress",
          },
          {
            title: "New features to discover",
            content: "✨ Great things are coming, stay tuned",
          },
        ],
        questions_frequent: "Frequent questions",
        questions: [
          {
            label: "How to create a deck?",
            content: "Just log in and click the 'Create a deck' button.",
          },
          {
            label: "Are my decks accessible to everyone?",
            content:
              "No. By default, your decks are private. You can share them with friends or the community if you want.",
          },
          {
            label: "How to use shared decks?",
            content:
              "Once you've found a shared deck, you can add it to your collection and use it as you wish.",
          },
        ],
        contact: {
          title: "Contact",
          github: "memoire is an open-source project, available on",
          discord: "You can also join the",
          discord_community:
            "Studoby, a community server dedicated to computing, education, and more.",
        },
        credits: {
          developed_by: "Developed with 💙 by",
        },
      },
      login: {
        connect: "Log in to access your account",
      },
      utils: {
        login: "Login",
        loginWith: "Login with {provider}",
        logout: "Logout",
        profile: "Profile",
        logout_confirm: "Are you sure you want to log out?",
        logout_name: "Logout",
        cancel: "Cancel",
        search: "Search",
        lastUpdate: "Last update",
        edit: "Edit",
        finished: "finished",
        close: "Close",
        help: "Help",
        resume: "Resume",
        create: "Create",
        or: "or",
        delete: "Delete",
        import: "Import",
      },
      pages: {
        flashcards: {
          title: "Flashcards",
          myDecks: "My decks",
          dashboards: "Dashboards",
        },
        dashboards: {
          title: "Dashboards",
        },
        explore: {
          title: "Explore",
        },
        profile: {
          title: "Profile",
        },
      },
      decks: {
        public: "Public decks",
        weekly: "Weekly decks",
        weeklyDesc: "Decks created this week",
        number: "Number of total public decks",
        search: "Search for a deck",
        share: "Share this deck",
        import: "Import this deck",
        importVariant: "Import a deck",
        createVariant: "Create a deck",
        originalCreator: "Original creator",
        nbCards: "Number of cards",
        nbRevisions: "Number of revisions",
        privatize: "Privatize",
        privatize_confirm: "Are you sure you want to privatize this deck?",
        publicize: "Publicize",
        publicize_confirm: "Are you sure you want to publicize this deck?",
        isPublic: "This deck is public",
        isPrivate: "This deck is private",
        duplicate: "Duplicate",
        delete: "Delete",
        delete_confirm: "Are you sure you want to delete this deck?",
        edit: "Edit",
        newRevision: "New revision",
        title: "Title",
        titlePlaceholder: "My super deck",
        code: "Deck code",
        tagsCreation1: "Press",
        tagsCreation2: "to create a tag",
        empty: "No cards in this deck",
      },
      flashcards: {
        createCard: "Create a card",
        question: "Question",
        answer: "Answer",
        placeholder: "What is the color of Henri IV's white horse?",
        deleteConfirm: "Are you sure you want to delete this card?",
        delete: "Delete the card",
      },
      revision: {
        seeResponse: "See the answer",
        seeQuestion: "See the question",
        evaluation: "Evaluation",
        criterias: {
          again: "Again",
          hard: "Hard",
          good: "Good",
          easy: "Easy",
        },
        how: {
          title: "How does it work?",
          desc: "If you answer with",
          descNext: "the card won't be played again in the same session.",
          descAgain:
            "the card will be played again in the same session, later.",
          moreInformation: "More information on",
        },
        congrats: "Congrats !",
        finished: "You have finished the revision",
        again: "Study again",
        backToDeck: "Back to the deck",
      },
      notifications: {
        decks: {
          importedSuccess: "Deck imported successfully",
          importedError: "An error occurred while importing the deck",
          deletedSuccess: "Deck deleted successfully",
          privatizedSuccess: "Deck privatized successfully",
          publicizedSuccess: "Deck publicized successfully",
          duplicatedSuccess: "Deck duplicated successfully",
        },
        flashcards: {
          createdSuccess: "Card created successfully",
          updatedSuccess: "Card updated successfully",
          deletedSuccess: "Card deleted successfully",
        },
        misc: {
          searchError: "An error occurred while searching",
          navigateError: "An error occurred while navigating",
          copyCode: "Code copied : ",
        },
      },
      dashboards: {
        totalDecks: {
          title: "Total number of decks",
          desc: "with {count} public decks",
        },
        totalCards: {
          title: "Total number of cards",
          desc: "or an average of {count} cards / deck",
        },
        totalRevisions: {
          title: "Total number of revisions",
          desc: "or an average of {count} revisions / deck",
        },
        monthlyRevisions: {
          title: "Monthly revisions",
        },
        revisionsBySubject: {
          title: "Revisions by subject",
        },
      },
    },
    fr: {
      landing: {
        welcome: "Rejoins l'aventure dès maintenant",
        study: "Révise efficacement grâce aux flashcards",
        subtitle:
          "Crée des decks de cartes, entraine-toi et découvre d'autres decks créés par la communauté",
        create: "Créer un deck",
        why: "Pourquoi utiliser",
        features: [
          {
            title: "Crée ton deck de cartes",
            content: "🔖 D'un côté la question, de l'autre la réponse",
          },
          {
            title: "Révise efficacement",
            content: "📚 Révise tes cours de manière efficace et ludique",
          },
          {
            title: "Partage tes decks",
            content:
              "😎 Partage tes decks avec tes amis et toute la communauté",
          },
          {
            title: "Consulte tes statistiques",
            content: "📊 Consulte tes statistiques pour voir ta progression",
          },
          {
            title: "Des nouveautés à découvrir",
            content: "✨ De belles choses vont arriver, reste connecté",
          },
        ],
        questions_frequent: "Questions fréquentes",
        questions: [
          {
            label: "Comment créer un deck ?",
            content:
              "Il suffit de se connecter et de cliquer sur le bouton 'Créer un deck'.",
          },
          {
            label: "Mes decks sont-ils accessibles par tout le monde ?",
            content:
              "Non. Par défaut, vos decks sont privés. Vous pouvez les partager avec vos amis ou la communauté si vous le souhaitez.",
          },
          {
            label: "Comment utiliser les decks partagés ?",
            content:
              "Une fois que vous avez trouvé un deck partagé, vous pouvez l'ajouter à votre collection et l'utiliser comme bon vous semble.",
          },
        ],
        contact: {
          title: "Contact",
          github: "memoire est un projet open-source, disponible sur",
          discord: "Tu peux également rejoindre le",
          discord_community:
            "Studoby qui est un serveur communautaire dédié à l'informatique, l'éducation et plein d'autres choses.",
        },
        credits: {
          developed_by: "Développé avec 💙 par",
        },
      },
      login: {
        connect: "Connectez-vous pour accéder à votre compte",
      },
      utils: {
        login: "Se connecter",
        loginWith: "Se connecter avec {provider}",
        logout: "Se déconnecter",
        profile: "Profil",
        logout_confirm: "Êtes-vous sûr de vouloir vous déconnecter ?",
        logout_name: "Déconnexion",
        cancel: "Annuler",
        search: "Rechercher",
        lastUpdate: "Dernière mise à jour",
        edit: "Modifier",
        finished: "terminée(s)",
        close: "Fermer",
        help: "Aide",
        resume: "Reprendre",
        create: "Créer",
        or: "ou",
        delete: "Supprimer",
        import: "Importer",
      },
      pages: {
        flashcards: {
          title: "Flashcards",
          myDecks: "Mes decks",
          dashboards: "Dashboards",
        },
        dashboards: {
          title: "Dashboards",
        },
        explore: {
          title: "Explorer",
        },
        profile: {
          title: "Profil",
        },
      },
      decks: {
        public: "Decks publics",
        weekly: "Decks hebdomadaires",
        weeklyDesc: "Decks créés cette semaine",
        number: "Nombre total de decks publics",
        search: "Rechercher un deck",
        share: "Partager ce deck",
        import: "Importer ce deck",
        importVariant: "Importer un deck",
        createVariant: "Créer un deck",
        originalCreator: "Créateur original",
        nbCards: "Nombre de cartes",
        nbRevisions: "Nombre de révisions",
        privatize: "Privatiser",
        privatize_confirm: "Êtes-vous sûr de vouloir rendre ce deck privé ?",
        publicize: "Publier",
        publicize_confirm: "Êtes-vous sûr de vouloir rendre ce deck public ?",
        isPublic: "Ce deck est public",
        isPrivate: "Ce deck est privé",
        duplicate: "Dupliquer",
        delete: "Supprimer",
        delete_confirm: "Êtes-vous sûr de vouloir supprimer ce deck ?",
        edit: "Modifier",
        newRevision: "Nouvelle révision",
        title: "Titre du deck",
        titlePlaceholder: "Mon super deck",
        code: "Code du deck",
        tagsCreation1: "Appyuyez sur",
        tagsCreation2: "pour créer un tag",
        empty: "Aucune carte dans ce deck",
      },
      flashcards: {
        createCard: "Créer une carte",
        question: "Question",
        answer: "Réponse",
        placeholder: "Quelle est la couleur du cheval blanc de Henri IV ?",
        deleteConfirm: "Êtes-vous sûr de vouloir supprimer cette carte ?",
        delete: "Supprimer la carte",
      },
      revision: {
        seeResponse: "Voir la réponse",
        seeQuestion: "Voir la question",
        evaluation: "Évaluation",
        criterias: {
          again: "À revoir",
          hard: "Difficile",
          good: "Bien",
          easy: "Facile",
        },
        how: {
          title: "Comment ça fonctionne ?",
          desc: "Si tu réponds avec",
          descNext: "la carte ne sera plus jouée dans la même session.",
          descAgain: "la carte sera rejouée plus tard dans la même session.",
          moreInformation: "Plus d'informations sur",
        },
        congrats: "Bravo !",
        finished: "Tu as terminé la révision de ce deck",
        again: "Réviser à nouveau",
        backToDeck: "Retour au deck",
      },
      notifications: {
        decks: {
          importedSuccess: "Deck importé avec succès",
          importedError:
            "Une erreur est survenue lors de l'importation du deck",
          deletedSuccess: "Deck supprimé avec succès",
          privatizedSuccess: "Deck rendu privé avec succès",
          publicizedSuccess: "Deck rendu public avec succès",
          duplicatedSuccess: "Deck dupliqué avec succès",
          editedSuccess: "Deck modifié avec succès",
        },
        flashcards: {
          createdSuccess: "Carte créée avec succès",
          updatedSuccess: "Carte mise à jour avec succès",
          deletedSuccess: "Carte supprimée avec succès",
        },
        misc: {
          searchError: "Une erreur est survenue lors de la recherche",
          navigateError: "Une erreur est survenue lors de la navigation",
          copyCode: "Code copié : ",
        },
      },
      dashboards: {
        totalDecks: {
          title: "Nombre total de decks",
          desc: "avec {count} decks publics",
        },
        totalCards: {
          title: "Nombre total de cartes",
          desc: "soit en moyenne {count} cartes / deck",
        },
        totalRevisions: {
          title: "Nombre total de révisions",
          desc: "soit en moyenne {count} révisions / deck",
        },
        monthlyRevisions: {
          title: "Révisions mensuelles",
        },
        revisionsBySubject: {
          title: "Révisions par matière",
        },
      },
    },
  },
}));
