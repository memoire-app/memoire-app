import { DateTime } from 'luxon'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Deck from '#models/deck'
import Revision from '#models/revision'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import Role from './role.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column()
  declare memoireUsername: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare avatar: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Deck)
  declare decks: HasMany<typeof Deck>

  @hasMany(() => Revision)
  declare revisions: HasMany<typeof Revision>

  @manyToMany(() => Role)
  declare roles: ManyToMany<typeof Role>
}
