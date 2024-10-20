import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import LoggerService from '../../service/logger_service.js'
import db from '@adonisjs/lucid/services/db'
import Deck from '#models/deck'

@inject()
export default class AdminController {
  constructor(protected loggerService: LoggerService) {}

  async me({ auth, request }: HttpContext) {
    this.loggerService.default(request, 'me_user', { userId: auth.user?.id })

    return auth.user
  }

  async getBasicStats({ request, params }: HttpContext) {
    this.loggerService.default(request, 'get_basic_stats', { userId: params.userId })

    // Get the number of Users, Decks, Flashcards, and Revisions

    const nbUsers = await db.from('users').count('* as count')
    const nbDecks = await db.from('decks').count('* as count')
    const nbFlashcards = await db.from('flashcards').count('* as count')
    const nbRevisions = await db.from('revisions').count('* as count')

    return {
      nbUsers: nbUsers[0].count,
      nbDecks: nbDecks[0].count,
      nbFlashcards: nbFlashcards[0].count,
      nbRevisions: nbRevisions[0].count,
    }
  }

  async getModeration({ request, params }: HttpContext) {
    this.loggerService.default(request, 'get_moderation_stats', { userId: params.userId })

    const { page } = request.qs()
    // Get all the public decks
    return await Deck.query()
      .where('isPublic', true)
      .where('isDeleted', false)
      .preload('flashcards')
      .orderBy('updatedAt', 'desc')
      .paginate(page, 50)
  }
}
