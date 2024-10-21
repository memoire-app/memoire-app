import User from '#models/user'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersService {
  async assignDefaultRole(user: User) {
    // Check if user is already in pivot table
    const userRole = await user.related('roles').query().where('role', 'user').first()

    if (!userRole) {
      await user.related('roles').attach([2])
    }
  }
}
