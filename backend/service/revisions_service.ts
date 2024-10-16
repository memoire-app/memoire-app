import Deck from '#models/deck'
import Revision from '#models/revision'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'

@inject()
export default class RevisionsService {
  async createRevision(userId: number, code: string) {
    // Find the deck based on the code and the authenticated user
    const deck = await Deck.query()
      .where('code', code)
      .andWhere('user_id', userId) // Filter by the logged-in user
      .first()

    if (!deck) {
      return null // Deck not found
    }

    // If there is a current revision for this deck and user, mark it as completed and create a new one
    const revision = await Revision.query()
      .where('user_id', userId)
      .andWhere('deck_id', deck.id)
      .andWhereNull('completed_at')
      .first()

    if (revision) {
      await revision.merge({ completedAt: DateTime.local() }).save()
    }

    // Create a new revision
    return await Revision.create({
      userId,
      deckId: deck.id,
    })
  }

  async getCurrentRevision(userId: number, code: string) {
    // Find the deck based on the code and the authenticated user
    const deck = await Deck.query()
      .where('code', code)
      .andWhere('user_id', userId) // Filter by the logged-in user
      .first()

    if (!deck) {
      return null // Deck not found
    }

    // Check if a current revision exists for this deck and user
    return await Revision.query()
      .where('user_id', userId)
      .andWhere('deck_id', deck.id)
      .andWhereNull('completed_at')
      .first()
  }
}
