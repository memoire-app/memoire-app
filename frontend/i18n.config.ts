export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      landing: {
        nav: {
          features: "Features",
          contact: "Contact",
        },
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
          title: "Copyright",
        },
        links: {
          title: "Links",
        },
      },
      login: {
        title: "Login",
        description: "Log in to access your account",
        invalid: "Incorrect email or password",
      },
      register: {
        title: "Register",
        description: "Register to access your account",
        confirmPassword: "Confirm password",
        passwordMismatch: "Passwords do not match",
      },
      utils: {
        usernameUpdated: "Username updated",
        usernameUnique: "This username is already taken",
        save: "Save",
        username: "Username",
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
        email: "Email",
        password: "Password",
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
        stats: {
          overview: "Evaluation distribution",
          noData: "No data",
          daysStreak: "Study streak",
        },
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
        tagsPlaceholder: "Biology, History, Maths",
        empty: "No cards in this deck",
        nbDecks: "deck(s)",
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
          desc: "with {count} public deck(s)",
        },
        totalCards: {
          title: "Total number of cards",
          desc: "or an average of {count} card(s) / deck",
        },
        totalRevisions: {
          title: "Total number of revisions",
          desc: "or an average of {count} revision(s) / deck",
        },
        monthlyRevisions: {
          title: "Monthly revisions",
        },
        revisionsByDeck: {
          title: "Revisions by deck",
        },
      },
    },
    fr: {
      landing: {
        nav: {
          features: "Features",
          contact: "Contact",
        },
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
          title: "Copyright",
        },
        links: {
          title: "Liens utiles",
        },
      },
      login: {
        title: "Se connecter",
        description: "Connectez-vous pour accéder à votre compte",
        invalid: "Email ou mot de passe incorrect",
      },
      register: {
        title: "S'inscrire",
        description: "Inscrivez-vous pour accéder à votre compte",
        confirmPassword: "Confirmer le mot de passe",
        passwordMismatch: "Les mots de passe ne correspondent pas",
      },
      utils: {
        usernameUpdated: "Nom d'utilisateur mis à jour",
        usernameUnique: "Ce nom d'utilisateur est déjà pris",
        save: "Enregistrer",
        username: "Nom d'utilisateur",
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
        email: "Email",
        password: "Mot de passe",
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
        stats: {
          overview: "Répartition des évaluations",
          noData: "Pas de données",
          daysStreak: "Série de révisions",
        },
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
        tagsPlaceholder: "SVT, Histoire, Maths",
        empty: "Aucune carte dans ce deck",
        nbDecks: "deck(s)",
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
          desc: "avec {count} deck(s) public(s)",
        },
        totalCards: {
          title: "Nombre total de cartes",
          desc: "soit en moyenne {count} carte(s) / deck",
        },
        totalRevisions: {
          title: "Nombre total de révisions",
          desc: "soit en moyenne {count} révision(s) / deck",
        },
        monthlyRevisions: {
          title: "Révisions mensuelles",
        },
        revisionsByDeck: {
          title: "Révisions par deck",
        },
      },
    },
    kr: {
      landing: {
        nav: {
          features: "기능",
          contact: "연락처",
        },
        welcome: "지금 모험에 참여하세요",
        study: "플래시 카드로 효율적으로 공부하세요",
        subtitle: "덱을 만들고 연습하고 커뮤니티에서 만든 덱을 발견하세요",
        create: "덱 만들기",
        why: "왜 사용하나요",
        features: [
          {
            title: "덱 만들기",
            content: "🔖 한쪽에 질문, 다른 한쪽에 답변",
          },
          {
            title: "효율적으로 공부하기",
            content: "📚 효율적이고 재미있게 공부하세요",
          },
          {
            title: "덱 공유하기",
            content: "😎 친구들과 커뮤니티와 덱을 공유하세요",
          },
          {
            title: "통계 확인하기",
            content: "📊 통계를 확인하여 진행 상황을 추적하세요",
          },
          {
            title: "발견할 새로운 기능",
            content: "✨ 멋진 기능들이 준비되어 있습니다. 기대해주세요",
          },
        ],
        questions_frequent: "자주 묻는 질문",
        questions: [
          {
            label: "덱을 어떻게 만들나요?",
            content: "'덱 만들기' 버튼을 클릭하면 됩니다.",
          },
          {
            label: "내 덱은 모두에게 공개되나요?",
            content:
              "아니요. 기본적으로 덱은 비공개입니다. 원한다면 친구나 커뮤니티와 공유할 수 있습니다.",
          },
          {
            label: "공유된 덱을 어떻게 사용하나요?",
            content:
              "공유된 덱을 찾으면 컬렉션에 추가하고 원하는대로 사용할 수 있습니다.",
          },
        ],
        contact: {
          title: "연락처",
          github: "memoire는 오픈소스 프로젝트로, 여기에서 사용할 수 있습니다",
          discord: "또한",
          discord_community:
            "Studoby에 가입하여 컴퓨터, 교육 및 기타 주제에 대해 이야기 나눌 수 있습니다.",
        },
        credits: {
          developed_by: "💙로 개발되었습니다",
          title: "저작권",
        },
        links: {
          title: "링크",
        },
      },
      login: {
        title: "로그인",
        description: "계정에 액세스하려면 로그인하세요",
        invalid: "이메일 또는 비밀번호가 잘못되었습니다",
      },
      register: {
        title: "등록",
        description: "계정에 액세스하려면 등록하세요",
        confirmPassword: "비밀번호 확인",
        passwordMismatch: "비밀번호가 일치하지 않습니다",
      },
      utils: {
        usernameUpdated: "사용자 이름이 업데이트되었습니다",
        usernameUnique: "이 사용자 이름은 이미 사용 중입니다",
        save: "저장",
        username: "사용자 이름",
        loginWith: "{provider}로 로그인",
        logout: "로그아웃",
        profile: "프로필",
        logout_confirm: "로그아웃 하시겠습니까?",
        logout_name: "로그아웃",
        cancel: "취소",
        search: "검색",
        lastUpdate: "마지막 업데이트",
        edit: "편집",
        finished: "완료",
        close: "닫기",
        help: "도움말",
        resume: "재개",
        create: "생성",
        or: "또는",
        delete: "삭제",
        import: "가져오기",
        email: "이메일",
        password: "비밀번호",
      },
      pages: {
        flashcards: {
          title: "플래시 카드",
          myDecks: "내 덱",
          dashboards: "대시보드",
        },
        dashboards: {
          title: "대시보드",
        },
        explore: {
          title: "탐색",
        },
        profile: {
          title: "프로필",
        },
      },
      decks: {
        stats: {
          overview: "평가 분포",
          noData: "데이터 없음",
          daysStreak: "공부 스트릭",
        },
        public: "공개 덱",
        weekly: "주간 덱",
        weeklyDesc: "이번 주에 만들어진 덱",
        number: "총 공개 덱 수",
        search: "덱 검색",
        share: "이 덱 공유하기",
        import: "이 덱 가져오기",
        importVariant: "덱 가져오기",
        createVariant: "덱 만들기",
        originalCreator: "원래 만든 사람",
        nbCards: "카드 수",
        nbRevisions: "수정 수",
        privatize: "비공개로 전환",
        privatize_confirm: "이 덱을 비공개로 전환하시겠습니까?",
        publicize: "공개로 전환",
        publicize_confirm: "이 덱을 공개로 전환하시겠습니까?",
        isPublic: "이 덱은 공개 상태입니다",
        isPrivate: "이 덱은 비공개 상태입니다",
        duplicate: "복제",
        delete: "삭제",
        delete_confirm: "이 덱을 삭제하시겠습니까?",
        edit: "편집",
        newRevision: "새 수정",
        title: "제목",
        titlePlaceholder: "내 슈퍼 덱",
        code: "덱 코드",
        tagsCreation1: "누르세요",
        tagsCreation2: "태그를 만들기 위해",
        tagsPlaceholder: "생물학, 역사, 수학",
        empty: "이 덱에 카드가 없습니다",
        nbDecks: "덱",
      },
      flashcards: {
        createCard: "카드 만들기",
        question: "질문",
        answer: "답변",
        placeholder: "앙리 4세의 흰 말의 색깔은 무엇인가요?",
        deleteConfirm: "이 카드를 삭제하시겠습니까?",
        delete: "카드 삭제",
      },
      revision: {
        seeResponse: "답변 보기",
        seeQuestion: "질문 보기",
        evaluation: "평가",
        criterias: {
          again: "다시",
          hard: "어려움",
          good: "좋음",
          easy: "쉬움",
        },
        how: {
          title: "어떻게 작동하나요?",
          desc: "다음과 같이 대답하면",
          descNext: "같은 세션에서 카드가 다시 나오지 않습니다.",
          descAgain: "같은 세션에서 나중에 다시 나옵니다.",
          moreInformation: "자세한 정보는",
        },
        congrats: "축하합니다!",
        finished: "리비전을 완료했습니다",
        again: "다시 공부하기",
        backToDeck: "덱으로 돌아가기",
      },
      notifications: {
        decks: {
          importedSuccess: "덱이 성공적으로 가져와졌습니다",
          importedError: "덱을 가져오는 중 오류가 발생했습니다",
          deletedSuccess: "덱이 성공적으로 삭제되었습니다",
          privatizedSuccess: "덱이 성공적으로 비공개로 전환되었습니다",
          publicizedSuccess: "덱이 성공적으로 공개로 전환되었습니다",
          duplicatedSuccess: "덱이 성공적으로 복제되었습니다",
        },
        flashcards: {
          createdSuccess: "카드가 성공적으로 만들어졌습니다",
          updatedSuccess: "카드가 성공적으로 업데이트되었습니다",
          deletedSuccess: "카드가 성공적으로 삭제되었습니다",
        },
        misc: {
          searchError: "검색하는 중 오류가 발생했습니다",
          navigateError: "탐색하는 중 오류가 발생했습니다",
          copyCode: "코드가 복사되었습니다 : ",
        },
      },
      dashboards: {
        totalDecks: {
          title: "총 덱 수",
          desc: "공개 덱 {count}개",
        },
        totalCards: {
          title: "총 카드 수",
          desc: "평균 {count}개의 카드 / 덱",
        },
        totalRevisions: {
          title: "총 수정 수",
          desc: "평균 {count}개의 수정 / 덱",
        },
        monthlyRevisions: {
          title: "월간 수정",
        },
        revisionsByDeck: {
          title: "덱별 수정",
        },
      },
    },
    es: {
      landing: {
        nav: {
          features: "Características",
          contact: "Contacto",
        },
        welcome: "Únete a la aventura ahora",
        study: "Estudia eficientemente con flashcards",
        subtitle:
          "Crea mazos, practica y descubre mazos creados por la comunidad",
        create: "Crear un mazo",
        why: "Por qué usar",
        features: [
          {
            title: "Crea tu mazo",
            content: "🔖 En un lado la pregunta, en el otro la respuesta",
          },
          {
            title: "Estudia eficazmente",
            content: "📚 Estudia tus cursos de manera eficiente y lúdica",
          },
          {
            title: "Comparte tus mazos",
            content: "😎 Comparte tus mazos con tus amigos y la comunidad",
          },
          {
            title: "Consulta tus estadísticas",
            content: "📊 Consulta tus estadísticas para seguir tu progreso",
          },
          {
            title: "Nuevas funciones por descubrir",
            content: "✨ Grandes cosas están por venir, mantente atento",
          },
        ],
        questions_frequent: "Preguntas frecuentes",
        questions: [
          {
            label: "¿Cómo crear un mazo?",
            content:
              "Solo tienes que iniciar sesión y hacer clic en el botón 'Crear un mazo'.",
          },
          {
            label: "¿Están accesibles mis mazos para todos?",
            content:
              "No. Por defecto, tus mazos son privados. Puedes compartirlos con amigos o la comunidad si lo deseas.",
          },
          {
            label: "¿Cómo usar mazos compartidos?",
            content:
              "Una vez que hayas encontrado un mazo compartido, puedes agregarlo a tu colección y usarlo como desees.",
          },
        ],
        contact: {
          title: "Contacto",
          github: "memoire es un proyecto de código abierto, disponible en",
          discord: "También puedes unirte al",
          discord_community:
            "Studoby, un servidor comunitario dedicado a la informática, la educación y más.",
        },
        credits: {
          developed_by: "Desarrollado con 💙 por",
          title: "Derechos de autor",
        },
        links: {
          title: "Enlaces",
        },
      },
      login: {
        description: "Inicia sesión para acceder a tu cuenta",
        title: "Iniciar sesión",
        invalid: "Email o contraseña incorrectos",
      },
      register: {
        description: "Regístrate para acceder a tu cuenta",
        title: "Registrarse",
        confirmPassword: "Confirmar contraseña",
        passwordMismatch: "Las contraseñas no coinciden",
      },
      utils: {
        usernameUpdated: "Nombre de usuario actualizado",
        usernameUnique: "Este nombre de usuario ya está en uso",
        save: "Guardar",
        username: "Nombre de usuario",
        loginWith: "Iniciar sesión con {provider}",
        logout: "Cerrar sesión",
        profile: "Perfil",
        logout_confirm: "¿Estás seguro de que quieres cerrar la sesión?",
        logout_name: "Cerrar sesión",
        cancel: "Cancelar",
        search: "Buscar",
        lastUpdate: "Última actualización",
        edit: "Editar",
        finished: "terminado(s)",
        close: "Cerrar",
        help: "Ayuda",
        resume: "Reanudar",
        create: "Crear",
        or: "o",
        delete: "Eliminar",
        import: "Importar",
        email: "Email",
        password: "Contraseña",
      },
      pages: {
        flashcards: {
          title: "Flashcards",
          myDecks: "Mis mazos",
          dashboards: "Tableros",
        },
        dashboards: {
          title: "Tableros",
        },
        explore: {
          title: "Explorar",
        },
        profile: {
          title: "Perfil",
        },
      },
      decks: {
        stats: {
          overview: "Distribución de evaluaciones",
          noData: "Sin datos",
          daysStreak: "Racha de estudio",
        },
        public: "Mazos públicos",
        weekly: "Mazos semanales",
        weeklyDesc: "Mazos creados esta semana",
        number: "Número total de mazos públicos",
        search: "Buscar un mazo",
        share: "Compartir este mazo",
        import: "Importar este mazo",
        importVariant: "Importar un mazo",
        createVariant: "Crear un mazo",
        originalCreator: "Creador original",
        nbCards: "Número de flashcards",
        nbRevisions: "Número de revisiones",
        privatize: "Privatizar",
        privatize_confirm: "¿Estás seguro de que quieres privatizar este mazo?",
        publicize: "Publicar",
        publicize_confirm: "¿Estás seguro de que quieres publicar este mazo?",
        isPublic: "Este mazo es público",
        isPrivate: "Este mazo es privado",
        duplicate: "Duplicar",
        delete: "Eliminar",
        delete_confirm: "¿Estás seguro de que quieres eliminar este mazo?",
        edit: "Editar",
        newRevision: "Nueva revisión",
        title: "Título",
        titlePlaceholder: "Mi super mazo",
        code: "Código del mazo",
        tagsCreation1: "Presiona",
        tagsCreation2: "para crear una etiqueta",
        tagsPlaceholder: "Biología, Historia, Matemáticas",
        empty: "No hay flashcards en este mazo",
        nbDecks: "mazo(s)",
      },
      flashcards: {
        createCard: "Crear una tarjeta",
        question: "Pregunta",
        answer: "Respuesta",
        placeholder: "¿Cuál es el color del caballo blanco de Enrique IV?",
        deleteConfirm: "¿Estás seguro de que quieres eliminar esta tarjeta?",
        delete: "Eliminar la tarjeta",
      },
      revision: {
        seeResponse: "Ver la respuesta",
        seeQuestion: "Ver la pregunta",
        evaluation: "Evaluación",
        criterias: {
          again: "Otra vez",
          hard: "Difícil",
          good: "Bien",
          easy: "Fácil",
        },
        how: {
          title: "¿Cómo funciona?",
          desc: "Si respondes con",
          descNext: "la tarjeta no se volverá a jugar en la misma sesión.",
          descAgain:
            "la tarjeta se volverá a jugar más tarde en la misma sesión.",
          moreInformation: "Más información en",
        },
        congrats: "¡Enhorabuena!",
        finished: "Has terminado la revisión",
        again: "Estudiar de nuevo",
        backToDeck: "Volver al mazo",
      },
      notifications: {
        decks: {
          importedSuccess: "Mazo importado con éxito",
          importedError: "Se produjo un error al importar el mazo",
          deletedSuccess: "Mazo eliminado con éxito",
          privatizedSuccess: "Mazo privatizado con éxito",
          publicizedSuccess: "Mazo publicado con éxito",
          duplicatedSuccess: "Mazo duplicado con éxito",
        },
        flashcards: {
          createdSuccess: "Tarjeta creada con éxito",
          updatedSuccess: "Tarjeta actualizada con éxito",
          deletedSuccess: "Tarjeta eliminada con éxito",
        },
        misc: {
          searchError: "Se produjo un error al buscar",
          navigateError: "Se produjo un error al navegar",
          copyCode: "Código copiado : ",
        },
      },
      dashboards: {
        totalDecks: {
          title: "Número total de mazos",
          desc: "con {count} mazos público(s)",
        },
        totalCards: {
          title: "Número total de flashcards",
          desc: "o un promedio de {count} flashcard(s) / mazo",
        },
        totalRevisions: {
          title: "Número total de revisiones",
          desc: "o un promedio de {count} revisione(s) / mazo",
        },
        monthlyRevisions: {
          title: "Revisiones mensuales",
        },
        revisionsByDeck: {
          title: "Revisiones por mazo",
        },
      },
    },
  },
}));
