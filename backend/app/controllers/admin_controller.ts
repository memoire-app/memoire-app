import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import LoggerService from '../../service/logger_service.js'

@inject()
export default class AdminController {
  constructor(protected loggerService: LoggerService) {}
  async getAllDecks({ request, params }: HttpContext) {
    this.loggerService.default(request, 'get_all_decks', { userId: params.userId })
  }
}
