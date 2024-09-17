import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo, hasMany, computed } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Flashcard from '#models/flashcard'
import Revision from '#models/revision'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare title: string

  @column()
  declare tags: string | null // Separated by ; (e.g. "tag1;tag2;tag3")

  @column()
  declare original: boolean

  @column()
  declare code: string

  @column()
  declare originalCode: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare isPublic: boolean

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Flashcard)
  declare flashcards: HasMany<typeof Flashcard>

  @hasMany(() => Revision)
  declare revisions: HasMany<typeof Revision>

  @computed()
  get tagArray(): string[] {
    return this.tags?.split(';').filter((tag) => tag.length > 0) || []
  }
}
