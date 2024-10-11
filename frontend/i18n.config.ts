import { connect } from "http2";

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
      },
      pages: {
        flashcards: {
          title: "Flashcards",
        },
        explore: {
          title: "Explore",
        },
        profile: {
          title: "Profile",
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
      },
      pages: {
        flashcards: {
          title: "Flashcards",
        },
        explore: {
          title: "Explorer",
        },
        profile: {
          title: "Profil",
        },
      },
    },
  },
}));
