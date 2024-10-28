import { BaseSchema } from '@adonisjs/lucid/schema'
export default class RolesSchema extends BaseSchema {
  protected tableName = 'roles'
  protected pivotTable = 'users_roles'
  protected roles = ['admin', 'user']
  async up() {
    // Create roles table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('role').notNullable().unique()
    })
    // Insert predefined roles into the roles table
    this.defer(async (db) => {
      await db.table(this.tableName).insert(this.roles.map((role) => ({ role })))
    })
    // Create users_roles pivot table
    this.schema.createTable(this.pivotTable, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName)
        .onDelete('CASCADE')
        .defaultTo(2) // Default to 'user' role
      table.unique(['user_id', 'role_id']) // Ensure uniqueness for user-role pairs
    })
    // Initialize the pivot table with default 'user' role for all users
    this.defer(async (db) => {
      const users = await db.from('users').select('id')
      const userRole = await db.from(this.tableName).select('id').where('role', 'user').first()
      if (userRole) {
        await Promise.all(
          users.map(async (user) => {
            await db.table(this.pivotTable).insert({ user_id: user.id, role_id: userRole.id })
          })
        )
      }
    })
  }
  async down() {
    this.schema.dropTableIfExists(this.pivotTable)
    this.schema.dropTableIfExists(this.tableName)
  }
}
