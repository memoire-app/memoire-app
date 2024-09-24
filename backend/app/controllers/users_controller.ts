import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import ApiBuilderService from '../../service/api_builder_service.js'
import LoggerService from '../../service/logger_service.js'

@inject()
export default class UsersController {
  constructor(
    protected apiBuilderService: ApiBuilderService,
    protected loggerService: LoggerService
  ) {}
  async redirect({ ally, request, params }: HttpContext) {
    this.loggerService.default(request, 'redirect_users', { provider: params.provider })
    const url = await ally.use(params.provider).getRedirectUrl()
    return {
      url,
    }
  }

  async handleCallback({ ally, auth, params, request, response }: HttpContext) {
    try {
      if (ally.use(params.provider).accessDenied()) {
        return response.redirect(env.get('FRONT_URL'))
      }

      this.loggerService.default(request, 'handle_callback_users', { provider: params.provider })

      const isLoggedIn = await auth.check()
      if (isLoggedIn) {
        return response.redirect(`${env.get('FRONT_URL')}/flashcards`)
      }

      // Login and authenticate the user with the data provided by the provider
      const userData = await ally.use(params.provider).user()

      const user = await User.updateOrCreate(
        { email: userData.email },
        {
          email: userData.email,
          username: userData.name,
          avatar: userData.avatarUrl,
        }
      )

      await auth.use('web').login(user)
      return response.redirect(`${env.get('FRONT_URL')}/flashcards`)
    } catch (error) {
      console.log(error)
    }
  }

  async logout({ auth, request, response }: HttpContext) {
    this.loggerService.default(request, 'logout_user', { userId: auth.user?.id })

    await auth.use('web').logout()
    return response.ok('Logged out successfully')
  }

  async me({ auth, request }: HttpContext) {
    this.loggerService.default(request, 'me_user', { userId: auth.user?.id })

    return this.apiBuilderService.buildUserApi(auth.use('web').user!)
  }
}
