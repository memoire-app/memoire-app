import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import FlashcardsService from '../../service/flashcards_service.js'
import LoggerService from '../../service/logger_service.js'

@inject()
export default class FlashcardsController {
  constructor(
    protected flashcardsService: FlashcardsService,
    protected loggerService: LoggerService
  ) {}

  async getByDeckCode({ auth, params, request }: HttpContext) {
    const code = params.code
    const userId = auth.user?.id

    this.loggerService.default(request, 'get_flashcards_by_deck_code', {
      code,
      userId,
    })

    const result = await this.flashcardsService.getFlashcardsByDeckCode(userId!, code)

    return result
  }

  async create({ auth, params, request, response }: HttpContext) {
    const code = params.code
    const { front, back } = request.all()
    const userId = auth.user?.id

    this.loggerService.default(request, 'create_flashcard', {
      code,
      userId,
    })

    const result = await this.flashcardsService.createFlashcard(userId!, code, front, back)

    if (!result.deck) {
      return response.status(404).send('Deck not found')
    }

    return result.flashcard
  }

  async update({ auth, params, request, response }: HttpContext) {
    const id = params.id
    const { front, back } = request.all()
    const userId = auth.user?.id

    this.loggerService.default(request, 'update_flashcard', {
      flashcardId: id,
      userId,
    })

    const result = await this.flashcardsService.updateFlashcard(userId!, id, front, back)

    if (!result.flashcard) {
      return response.status(404).send('Flashcard not found')
    }

    return response.status(200)
  }

  async delete({ auth, params, request, response }: HttpContext) {
    const id = params.id
    const userId = auth.user?.id

    this.loggerService.default(request, 'delete_flashcard', {
      flashcardId: id,
      userId,
    })

    try {
      await this.flashcardsService.deleteFlashcard(userId!, id)
      return response.status(200)
    } catch (error) {
      return response.status(404).send('Flashcard not found')
    }
  }
}
