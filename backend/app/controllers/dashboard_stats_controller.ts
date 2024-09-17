// import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import ApiBuilderService from '../../service/api_builder_service.js'
import LoggerService from '../../service/logger_service.js'
import Deck from '#models/deck'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DashboardStatsController {
  constructor(
    protected apiBuilderService: ApiBuilderService,
    protected loggerService: LoggerService
  ) {}

  async getAll({ auth, request }: HttpContext) {
    this.loggerService.default(request, 'get_all_dashboard_stats', { userId: auth.user?.id })
    const deckList = await Deck.query()
      .withCount('flashcards')
      .preload('revisions')
      .where('userId', auth.user!.id)

    return this.apiBuilderService.buildDashboardStats(deckList)
  }
}
