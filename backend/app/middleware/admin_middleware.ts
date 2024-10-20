import User from '#models/user'
import { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    const user = await ctx.auth.authenticateUsing(options.guards)
    // Check user.roles to see if the user has the admin role
    const u = await User.query().where('id', user.id).preload('roles').firstOrFail()
    const isAdmin = u.roles.some((role) => role.name === 'admin')
    if (!isAdmin) {
      return ctx.response.unauthorized({ error: 'Unauthorized access' })
    }

    return next()
  }
}
