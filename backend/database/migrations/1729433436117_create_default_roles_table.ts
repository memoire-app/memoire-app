import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected roles = 'roles'
  protected role_user = 'role_user'

  async up() {
    // Add USER and ADMIN roles
    this.defer(async () => {
      const roles = [{ name: 'user' }, { name: 'admin' }]
      await this.db.insertQuery().table(this.roles).multiInsert(roles)
    })

    // Add default USER role to all existing users
    this.defer(async () => {
      await this.db
        .insertQuery()
        .table(this.role_user)
        .multiInsert(
          (await this.db.from('users').select('id')).map(({ id }) => ({
            user_id: id,
            role_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
          }))
        )
    })
  }

  async down() {
    this.db.from(this.role_user).delete()
  }
}
