import RevisionsFlashcard from '#models/revisions_flashcard'
import Revision from '#models/revision'
import Flashcard from '#models/flashcard'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import type { RetentionType } from '../models/index.js'

@inject()
export default class RevisionsFlashcardsService {
  async createRevisionFlashcard(
    revisionId: number,
    flashcardId: number,
    retentionType: RetentionType
  ) {
    await RevisionsFlashcard.create({
      revisionId,
      flashcardId,
      retentionType,
    })

    // If the retention type is 'again', no need to check if the revision is finished
    if (retentionType === 'again') {
      return { message: 'OK' }
    }

    // Check if the revision is finished
    const revision = await Revision.findOrFail(revisionId)
    const totalFlashcardsInDeckResult = await Flashcard.query()
      .where('deck_id', revision.deckId)
      .where('is_deleted', false)
      .count('* as total')

    const finishedFlashcardsCountResult = await RevisionsFlashcard.query()
      .where('revision_id', revisionId)
      .where('retention_type', '!=', 'again')
      .count('* as count')

    // Convert counts to numbers
    const totalFlashcardsInDeck = Number.parseInt(totalFlashcardsInDeckResult[0].$extras.total, 10)
    const finishedFlashcardsCount = Number.parseInt(
      finishedFlashcardsCountResult[0].$extras.count,
      10
    )

    // If all flashcards have been revised, mark the revision as completed
    if (finishedFlashcardsCount === totalFlashcardsInDeck) {
      await revision.merge({ completedAt: DateTime.local() }).save()
      return { message: 'FINISHED' }
    }

    return { message: 'OK' }
  }
}
