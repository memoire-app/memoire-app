import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import LoggerService from '../../service/logger_service.js'
import RevisionsFlashcardsService from '../../service/revisions_flashcards_service.js'

@inject()
export default class RevisionsFlashcardsController {
  constructor(
    protected revisionsFlashcardsService: RevisionsFlashcardsService,
    protected loggerService: LoggerService
  ) {}

  async create({ auth, params, request, response }: HttpContext) {
    const revisionId = params.revisionId
    const flashcardId = params.flashcardId
    const { retentionType } = request.all()
    const userId = auth.user?.id

    this.loggerService.default(request, 'create_revision_flashcard', {
      revisionId,
      flashcardId,
      userId,
    })

    const result = await this.revisionsFlashcardsService.createRevisionFlashcard(
      revisionId,
      flashcardId,
      retentionType
    )

    if (result.message === 'FINISHED') {
      return response.status(201).json({ message: 'FINISHED' })
    }

    return response.status(201).json({ message: 'OK' })
  }
}
