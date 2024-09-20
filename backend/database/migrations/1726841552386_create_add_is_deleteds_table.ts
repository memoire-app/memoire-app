import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected decksTable = 'decks'
  protected flashcardsTable = 'flashcards'

  async up() {
    // Add a column 'is_deleted' to the 'decks' and 'flashcards' tables
    this.schema.table(this.decksTable, (table) => {
      table.boolean('is_deleted').defaultTo(false).notNullable()
    })

    this.schema.table(this.flashcardsTable, (table) => {
      table.boolean('is_deleted').defaultTo(false).notNullable()
    })
  }

  async down() {
    // Drop the 'is_deleted' column from the 'decks' and 'flashcards' tables
    this.schema.table(this.decksTable, (table) => {
      table.dropColumn('is_deleted')
    })

    this.schema.table(this.flashcardsTable, (table) => {
      table.dropColumn('is_deleted')
    })
  }
}
