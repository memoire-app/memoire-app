import Deck from '#models/deck'
import Flashcard from '#models/flashcard'
import { inject } from '@adonisjs/core'
import ApiBuilderService from './api_builder_service.js'

@inject()
export default class FlashcardsService {
  constructor(protected apiBuilderService: ApiBuilderService) {}

  async getFlashcardsByDeckCode(userId: number, code: string) {
    // Find the deck based on the code and the authenticated user
    const deck = await Deck.query()
      .where('code', code)
      .andWhere('user_id', userId) // Filter by the logged-in user
      .preload('flashcards') // Preload the related flashcards
      .orderBy('created_at', 'asc')
      .first()

    if (!deck) {
      return { deck: null, revisions: null }
    }

    // Check if there is a revision in progress for this deck
    const currentRevision = await deck
      .related('revisions')
      .query()
      .where('user_id', userId)
      .andWhereNull('completed_at')
      .first()

    // Get the number of revisions for this deck
    const revisions = await Deck.query().where('id', deck.id).withCount('revisions').exec()

    if (!revisions) {
      return { deck, revisions: null }
    }

    const nbRevision = revisions[0].$extras.revisions_count

    if (currentRevision) {
      // Get all flashcards not done yet (the flashcards not present in revisions_flashcards for the current revision_id and flashcard_id + with retention_type != 'again')
      const flashcardsNotDone = await deck
        .related('flashcards')
        .query()
        .whereNotExists((query) => {
          query
            .from('revisions_flashcards')
            .where('revision_id', currentRevision.id)
            .whereColumn('flashcard_id', 'flashcards.id')
            .where('retention_type', '!=', 'again')
        })

      return this.apiBuilderService.buildFlashCardListApi(
        deck.title,
        deck.flashcards,
        true,
        deck,
        nbRevision,
        flashcardsNotDone
      )
    } else {
      return {
        deckTitle: deck.title,
        flashcards: deck.flashcards,
        deckTags: deck.tagArray,
        nbRevisions: nbRevision,
        deckIsPublic: deck.isPublic,
      }
    }
  }

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

    if (!flashcard) {
      return { flashcard: null }
    }

    await flashcard.delete()
    return { flashcard }
  }
}
