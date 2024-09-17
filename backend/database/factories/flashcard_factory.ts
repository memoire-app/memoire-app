import Flashcard from '#models/flashcard'
import factory from '@adonisjs/lucid/factories'

export const FlashcardFactory = factory
  .define(Flashcard, async ({ faker }) => {
    return {
      front: faker.lorem.words(3),
      back: faker.lorem.words(3),
    }
  })
  .build()
