import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Deck from '#models/deck'
import RevisionsFlashcard from '#models/revisions_flashcard'

export default class Revision extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare deckId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare completedAt: DateTime | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Deck)
  declare deck: BelongsTo<typeof Deck>

  @hasMany(() => RevisionsFlashcard)
  declare revisionsFlashcards: HasMany<typeof RevisionsFlashcard>
}
