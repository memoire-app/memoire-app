import { Logger } from '@adonisjs/core/logger'
import { inject } from '@adonisjs/core'

@inject()
export default class LoggerService {
  private logger: Logger
  constructor(protected l: Logger) {
    this.logger = l
  }

  // Request type is not found... so we use any
  default(request: any, action: string, custom: Object = {}) {
    this.logger.info('%o', {
      action: action,
      httpMethod: request.method(),
      path: request.url(),
      ...custom,
    })
  }
}
