import type {
  DashboardStats,
  DeckAPI,
  FlashcardAPI,
  FlashCardListApi,
  FlashcardRevisionStats,
  PublicDeckAPI,
  RevisionAPI,
  UserAPI,
} from '../models/index.js'
import Flashcard from '#models/flashcard'
import Deck from '#models/deck'
import Revision from '#models/revision'
import User from '#models/user'

export default class ApiBuilderService {
  buildDashboardStats(deckList: Deck[]): DashboardStats {
    if (!deckList) {
      return {
        nbDecks: 0,
        nbDecksPublic: 0,
        nbFlashcards: 0,
        revisions: [],
      }
    }
    const revisionList = deckList.map((deck) => deck.$preloaded.revisions as Revision).flat()

    return {
      nbDecks: deckList.length,
      nbDecksPublic: deckList.filter((deck) => deck.isPublic).length,
      nbFlashcards: deckList.reduce((acc, deck) => acc + Number(deck.$extras.flashcards_count), 0),
      revisions: revisionList.map((revision) => {
        return {
          updatedAt: revision.updatedAt!.toJSDate(),
          deckTitle: deckList.find((deck) => deck.id === revision.deckId)!.title,
          deckId: revision.deckId,
        }
      }),
    }
  }
  buildFlashCardApi(deckTitle: string, flashcard: Flashcard): FlashcardAPI {
    return {
      id: flashcard.id,
      deckId: flashcard.deckId,
      front: flashcard.front,
      deckTitle: deckTitle,
      back: flashcard.back,
      createdAt: flashcard.createdAt.toJSDate(),
      updatedAt: flashcard.updatedAt ? flashcard.updatedAt.toJSDate() : null,
    }
  }

  /**
   * Build the FlashCardListApi response.
   * @param deck
   * @param revisionData
   * @returns
   */
  buildFlashCardListApi(
    deck: Deck,
    revisionData: {
      hasCurrentRevision: boolean
      flashcardsNotDone?: Flashcard[]
      revisionStats: FlashcardRevisionStats
    }
  ): FlashCardListApi {
    const { hasCurrentRevision, flashcardsNotDone, revisionStats } = revisionData

    // Map all flashcards in the deck to FlashcardAPI format.
    const flashcards: FlashcardAPI[] = deck.flashcards.map((flashcard) =>
      this.buildFlashCardApi(deck.title, flashcard)
    )

    // Prepare the base API response.
    const response: FlashCardListApi = {
      deckTitle: deck.title,
      flashcards,
      deckTags: deck.tagArray,
      revisionStats,
      deckIsPublic: deck.isPublic,
    }

    // Include currentRevision if applicable.
    if (hasCurrentRevision && flashcardsNotDone) {
      response.currentRevision = {
        flashcards: flashcardsNotDone.map((flashcard) =>
          this.buildFlashCardApi(deck.title, flashcard)
        ),
      }
    }

    return response
  }

  buildRevisionApi(revision: Revision): RevisionAPI {
    return {
      id: revision.id,
      userId: revision.userId,
      deckId: revision.deckId,
      createdAt: revision.createdAt.toJSDate(),
      updatedAt: revision.updatedAt ? revision.updatedAt.toJSDate() : null,
    }
  }

  buildUserApi(user: User): UserAPI {
    return {
      id: user.id,
      username: user.username,
      memoireUsername: user.memoireUsername,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt.toJSDate(),
      updatedAt: user.updatedAt ? user.updatedAt.toJSDate() : null,
    }
  }

  buildDeckApi(deck: Deck): DeckAPI {
    return {
      id: deck.id,
      userId: deck.userId,
      title: deck.title,
      tagArray: deck.tagArray,
      original: deck.original,
      code: deck.code,
      createdAt: deck.createdAt.toJSDate(),
      updatedAt: deck.updatedAt ? deck.updatedAt.toJSDate() : null,
      nbRevisions: deck.$extras.revisions_count,
      isPublic: deck.isPublic,
      nbFlashcards: deck.$extras.flashcards_count,
    }
  }

  buildPublicDeckApi(deck: Deck, originalAuthorName?: string): PublicDeckAPI {
    return {
      id: deck.id,
      title: deck.title,
      tagArray: deck.tagArray,
      original: deck.original,
      code: deck.code,
      createdAt: deck.createdAt.toJSDate(),
      updatedAt: deck.updatedAt ? deck.updatedAt.toJSDate() : null,
      authorName: deck.user.memoireUsername ?? (deck.user.username as string) ?? 'Unknown',
      originalAuthorName: originalAuthorName,
      flashcards: deck.flashcards.map((flashcard) => {
        return this.buildFlashCardApi(deck.title, flashcard)
      }),
    }
  }
}
