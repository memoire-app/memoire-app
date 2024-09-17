import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'revisions_flashcards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table
        .integer('revision_id')
        .unsigned()
        .references('id')
        .inTable('revisions')
        .onDelete('CASCADE')
      table
        .integer('flashcard_id')
        .unsigned()
        .references('id')
        .inTable('flashcards')
        .onDelete('CASCADE')
      table.enu('retention_type', ['again', 'hard', 'good', 'easy']).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
