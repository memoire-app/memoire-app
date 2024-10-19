export type RetentionType = "again" | "hard" | "good" | "easy";

export type DeckAPI = {
  id: number;
  userId: number;
  title: string;
  tagArray: string[];
  original: boolean;
  code: string;
  createdAt: Date;
  updatedAt: Date | null;
  nbRevisions: number;
  isPublic: boolean;
  nbFlashcards: number;
};

export type DashboardStats = {
  nbDecks: number;
  nbDecksPublic: number;
  nbFlashcards: number;
  revisions: {
    updatedAt: Date;
    deckTitle: string;
    deckId: number;
  }[];
};

export type DeckListAPI = {
  nbDecks: number;
  decks: DeckAPI[];
};

export type PublicDeckListAPI = {
  nbMatchedDecks: number;
  nbTotalDecks: number;
  nbWeeklyDecks: number;
  decks: PublicDeckAPI[];
};

export type PublicDeckAPI = {
  id: number;
  title: string;
  tagArray: string[];
  original: boolean;
  code: string;
  createdAt: Date;
  updatedAt: Date | null;
  authorName: string;
  originalAuthorName?: string;
  flashcards: FlashcardAPI[];
};

export type FlashCardListApi = {
  deckTitle: string;
  deckTags: string[];
  deckIsPublic: boolean;
  flashcards: FlashcardAPI[];
  nbRevisions: number;
  currentRevision?: {
    flashcards: FlashcardAPI[];
  };
};

export type FlashcardAPI = {
  id: number;
  deckId: number;
  deckTitle: string;
  front: string;
  back: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type RevisionAPI = {
  id: number;
  userId: number;
  deckId: number;
  createdAt: Date;
  updatedAt: Date | null;
  revisionsFlashcards?: RevisionsFlashcardAPI[];
};

export type RevisionsFlashcardAPI = {
  id: number;
  revisionId: number;
  flashcardId: number;
  retentionType: RetentionType;
  createdAt: Date;
};

export type UserAPI = {
  id: number;
  username: string | null;
  memoireUsername: string | null;
  email: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  decks?: DeckAPI[];
  revisions?: RevisionAPI[];
};
