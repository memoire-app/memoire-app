import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'revisions_flashcards'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.timestamp('updated_at')
    })

    // Populate updated_at with created_at values
    this.defer(async (db) => {
      const rf = await db.from(this.tableName).select('*')
      await Promise.all(
        rf.map(async (r) => {
          return db.from(this.tableName).where('id', r.id).update({ updated_at: r.created_at })
        })
      )
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('updated_at')
    })
  }
}
