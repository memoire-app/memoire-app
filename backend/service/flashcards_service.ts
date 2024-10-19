import Deck from '#models/deck'
import Flashcard from '#models/flashcard'
import { inject } from '@adonisjs/core'
import ApiBuilderService from './api_builder_service.js'
import Revision from '#models/revision'
import { FlashcardRevisionStats, RetentionType } from '../models/index.js'

@inject()
export default class FlashcardsService {
  constructor(protected apiBuilderService: ApiBuilderService) {}

  /**
   * Get flashcards by deck code
   * @param userId
   * @param code
   * @returns FlashCardListApi
   */
  async getFlashcardsByDeckCode(userId: number, code: string) {
    // Find the deck based on the code and the authenticated user
    const deck = await Deck.query()
      .where('code', code)
      .where('is_deleted', false)
      .andWhere('user_id', userId)
      .preload('flashcards', (query) => {
        query.where('is_deleted', false)
      })
      .preload('revisions', (query) => {
        query.where('user_id', userId).preload('revisionsFlashcards')
      })
      .orderBy('created_at', 'asc')
      .first()

    if (!deck) {
      return { deck: null, revisions: null }
    }

    // Find the current revision and count the total number of revisions
    const currentRevision = deck.revisions.find((revision) => !revision.completedAt)
    const flashcardsNotDone = currentRevision
      ? await this.getFlashcardsNotDone(deck, currentRevision)
      : undefined

    // Build revision stats using a helper function.
    const revisionStats = this.buildRevisionStats(deck.revisions)

    return this.apiBuilderService.buildFlashCardListApi(deck, {
      hasCurrentRevision: !!currentRevision,
      flashcardsNotDone,
      revisionStats,
    })
  }

  /**
   * Build revision stats based on the revisions
   * @param revisions
   * @returns
   */
  private buildRevisionStats(revisions: Revision[]): FlashcardRevisionStats {
    const revisionStats = {
      nbTotal: revisions.length,
      revisions: revisions.map((revision) => {
        // Use a map to collect flashcard results by flashcardId.
        const flashcardResultsMap = new Map<number, RetentionType[]>()

        // Iterate over each revision's flashcards to collect results.
        revision.revisionsFlashcards.forEach((revFlashcard) => {
          const { flashcardId, retentionType } = revFlashcard

          // If the flashcard already exists in the map, push the new result.
          if (flashcardResultsMap.has(flashcardId)) {
            flashcardResultsMap.get(flashcardId)!.push(retentionType)
          } else {
            flashcardResultsMap.set(flashcardId, [retentionType])
          }
        })

        const flashcards = Array.from(flashcardResultsMap.entries()).map(([id, result]) => ({
          id,
          result,
        }))

        return {
          date: revision.updatedAt,
          flashcards,
        }
      }),
    }

    return revisionStats
  }

  /**
   * Get flashcards that are not done for the current revision
   * @param deck
   * @param currentRevision
   * @returns
   */
  private async getFlashcardsNotDone(deck: Deck, currentRevision: Revision) {
    return await deck
      .related('flashcards')
      .query()
      .where('is_deleted', false)
      .whereNotExists((query) => {
        query
          .from('revisions_flashcards')
          .where('revision_id', currentRevision.id)
          .whereColumn('flashcard_id', 'flashcards.id')
          .where('retention_type', '!=', 'again')
      })
  }

  /**
   * Create a flashcard for a deck
   * @param userId
   * @param code
   * @param front
   * @param back
   * @returns {deck, flashcard}
   */
  async createFlashcard(userId: number, code: string, front: string, back: string) {
    const deck = await Deck.query()
      .where('code', code)
      .andWhere('user_id', userId) // Filter by the logged-in user
      .first()

    if (!deck) {
      return { deck: null }
    }

    const flashcard = await deck.related('flashcards').create({ front, back })
    return { deck, flashcard: this.apiBuilderService.buildFlashCardApi(deck.title, flashcard) }
  }

  async updateFlashcard(userId: number, id: number, front: string, back: string) {
    const flashcard = await Flashcard.query()
      .where('id', id)
      .andWhereHas('deck', (query) => {
        query.where('user_id', userId) // Filter by the logged-in user
      })
      .first()

    if (!flashcard) {
      return { flashcard: null }
    }

    flashcard.front = front
    flashcard.back = back
    await flashcard.save()

    return { flashcard }
  }

  async deleteFlashcard(userId: number, id: number) {
    const flashcard = await Flashcard.query()
      .where('id', id)
      .andWhereHas('deck', (query) => {
        query.where('user_id', userId) // Filter by the logged-in user
      })
      .first()

    if (flashcard) {
      flashcard.isDeleted = true
      await flashcard.save()
    }
  }
}
