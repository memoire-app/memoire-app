import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo } from '@adonisjs/lucid/orm'
import Revision from '#models/revision'
import Flashcard from '#models/flashcard'
import { type RetentionType } from '../../models/index.js'

export default class RevisionsFlashcard extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare revisionId: number

  @column()
  declare flashcardId: number

  @column()
  declare retentionType: RetentionType

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Revision)
  declare revision: BelongsTo<typeof Revision>

  @belongsTo(() => Flashcard)
  declare flashcard: BelongsTo<typeof Flashcard>
}
