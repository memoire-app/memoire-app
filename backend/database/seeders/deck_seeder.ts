import Deck from '#models/deck'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class DeckSeeder extends BaseSeeder {
  public async run() {
    // Fetch all user IDs to associate decks with existing users
    const userIds = await User.query().select('id')

    // Ensure there are users to associate with
    if (userIds.length === 0) {
      console.warn('No users found, make sure to seed users before seeding decks.')
      return
    }

    const decks = Array.from({ length: 500 }, () => {
      return {
        userId: faker.helpers.arrayElement(userIds).id,
        title: faker.lorem.words(3),
        tags: faker.lorem.words(3).split(' ').join(';'),
        original: true,
        code: faker.string.alphanumeric(6),
        originalCode: '',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        isPublic: faker.datatype.boolean(),
        isDeleted: faker.datatype.boolean(),
      }
    })

    await Deck.createMany(decks)
  }
}
