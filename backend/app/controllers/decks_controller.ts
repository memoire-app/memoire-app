import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ApiBuilderService from '../../service/api_builder_service.js'
import DeckService from '../../service/deck_service.js'
import LoggerService from '../../service/logger_service.js'

@inject()
export default class DecksController {
  constructor(
    protected apiBuilderService: ApiBuilderService,
    protected deckService: DeckService,
    protected loggerService: LoggerService
  ) {}

  async getAll({ auth, request }: HttpContext) {
    const { public: isPublic, search = '', page = 1, limit = 25 } = request.qs()
    const userId = auth.user?.id

    this.loggerService.default(
      request,
      isPublic === 'true' ? 'get_all_public_decks' : 'get_all_user_decks',
      {
        userId,
      }
    )

    if (isPublic === 'true') {
      return this.deckService.getPublicDecks(search, page, limit)
    } else {
      return this.deckService.getUserDecks(userId!, search, page, limit)
    }
  }

  async create({ auth, request }: HttpContext) {
    const userId = auth.user?.id
    this.loggerService.default(request, 'create_deck', { userId })

    const { title, tags, isPublic } = request.all()
    return this.deckService.createDeck(userId!, title, tags, isPublic)
  }

  async delete({ auth, params, request, response }: HttpContext) {
    const userId = auth.user?.id
    this.loggerService.default(request, 'delete_deck', { userId, code: params.code })

    const result = await this.deckService.deleteDeck(userId!, params.code)
    if (!result) {
      return response.status(404).send('Deck not found')
    }
    return response.status(204)
  }

  async importDeckFromCode({ auth, params, request, response }: HttpContext) {
    const userId = auth.user?.id
    this.loggerService.default(request, 'import_deck_from_code', { code: params.code, userId })

    const result = await this.deckService.importDeckFromCode(userId!, params.code)
    if (!result) {
      return response.status(404).send('Deck not found or already imported')
    }
    return response.status(201).send('Deck imported')
  }

  async privatize({ auth, params, request, response }: HttpContext) {
    const userId = auth.user?.id
    this.loggerService.default(request, 'privatize_deck', { code: params.code, userId })

    const result = await this.deckService.privatizeDeck(userId!, params.code)
    if (!result) {
      return response.status(404).send('Deck not found')
    }
  }

  async publicize({ auth, params, request, response }: HttpContext) {
    const userId = auth.user?.id
    this.loggerService.default(request, 'publicize_deck', { code: params.code, userId })

    const result = await this.deckService.publicizeDeck(userId!, params.code)
    if (!result) {
      return response.status(404).send('Deck not found')
    }
  }

  async editDeck({ auth, params, request, response }: HttpContext) {
    const userId = auth.user?.id
    const { title, tags } = request.all()

    this.loggerService.default(request, 'edit_deck', { code: params.code, userId })

    const result = await this.deckService.editDeck(userId!, params.code, title, tags)
    if (!result) {
      return response.status(404).send('Deck not found')
    }
  }

  async duplicate({ auth, params, request, response }: HttpContext) {
    const userId = auth.user?.id
    this.loggerService.default(request, 'duplicate_deck', { code: params.code, userId })

    const result = await this.deckService.duplicateDeck(userId!, params.code)
    if (!result) {
      return response.status(404).send('Deck not found')
    }
  }
}
