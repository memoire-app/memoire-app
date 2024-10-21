import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import ApiBuilderService from '../../service/api_builder_service.js'
import LoggerService from '../../service/logger_service.js'
import UsersService from '../../service/user_service.js'

@inject()
export default class UsersController {
  constructor(
    protected apiBuilderService: ApiBuilderService,
    protected loggerService: LoggerService,
    protected userService: UsersService
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
        // Log out the current user
        await auth.use('web').logout()
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

      await this.userService.assignDefaultRole(user)

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

  async register({ auth, request }: HttpContext) {
    this.loggerService.default(request, 'register_user')

    const { email, password } = request.only(['email', 'password'])

    const user = await User.updateOrCreate(
      { email },
      {
        password,
        memoireUsername: email.split('@')[0],
      }
    )

    await this.userService.assignDefaultRole(user)

    await auth.use('web').login(user)

    return this.apiBuilderService.buildUserApi(user)
  }

  async login({ auth, request }: HttpContext) {
    this.loggerService.default(request, 'login_user')

    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return this.apiBuilderService.buildUserApi(user)
  }

  async update({ auth, request, response }: HttpContext) {
    this.loggerService.default(request, 'update_user', { userId: auth.user?.id })

    const { memoireUsername } = request.all()

    const existingUser = await User.findBy('memoireUsername', memoireUsername)
    if (existingUser && existingUser.id !== auth.user?.id) {
      return response.badRequest('Username already taken')
    }

    const user = await User.findOrFail(auth.user?.id)
    user.memoireUsername = memoireUsername
    await user.save()

    return this.apiBuilderService.buildUserApi(user)
  }
}
