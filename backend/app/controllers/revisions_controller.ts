import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ApiBuilderService from '../../service/api_builder_service.js'
import LoggerService from '../../service/logger_service.js'
import RevisionService from '../../service/revisions_service.js'

@inject()
export default class RevisionsController {
  constructor(
    protected apiBuilderService: ApiBuilderService,
    protected loggerService: LoggerService,
    protected revisionService: RevisionService
  ) {}

  async create({ auth, params, request, response }: HttpContext) {
    const code = params.code
    if (!auth.user) {
      return response.status(401).send('Unauthorized')
    }
    const userId = auth.user.id
    this.loggerService.default(request, 'create_revision', {
      code,
      userId,
    })

    const revision = await this.revisionService.createRevision(userId, code)

    if (!revision) {
      return response.status(404).send('Deck not found')
    }

    return this.apiBuilderService.buildRevisionApi(revision)
  }

  async getCurrent({ auth, params, request, response }: HttpContext) {
    const code = params.code

    if (!auth.user) {
      return response.status(401).send('Unauthorized')
    }
    const userId = auth.user.id

    this.loggerService.default(request, 'get_current_revision', {
      code,
      userId,
    })

    const revision = await this.revisionService.getCurrentRevision(userId, code)

    if (revision) {
      return this.apiBuilderService.buildRevisionApi(revision)
    }
  }
}
