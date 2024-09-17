import factory from '@adonisjs/lucid/factories'
import Deck from '#models/deck'

export const DeckFactory = factory
  .define(Deck, async ({ faker }) => {
    return {
      title: faker.lorem.words(3),
      tags: faker.lorem.words({ min: 0, max: 5 }),
      isPublic: faker.datatype.boolean(),
      code: Math.random().toString(36).substring(2, 8),
      original: true,
    }
  })
  .build()
