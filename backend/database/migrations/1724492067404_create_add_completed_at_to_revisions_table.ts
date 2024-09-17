import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'revisions'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.dateTime('completed_at').nullable()
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('completed_at')
    })
  }
}
