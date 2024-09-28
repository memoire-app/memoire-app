import Flashcard from '#models/flashcard'
import Deck from '#models/deck'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class FlashcardSeeder extends BaseSeeder {
  public async run() {
    // Fetch all existing decks
    const decks = await Deck.query().select('id')

    // Ensure there are decks to add flashcards to
    if (decks.length === 0) {
      console.warn('No decks found, make sure to seed decks before seeding flashcards.')
      return
    }

    const flashcards = decks.flatMap((deck) => {
      const numberOfCards = faker.number.int({ min: 1, max: 15 })

      return Array.from({ length: numberOfCards }, () => ({
        deckId: deck.id,
        front: faker.lorem.sentence(),
        back: faker.lorem.sentence(),
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        isDeleted: faker.datatype.boolean(),
      }))
    })

    // Insert all generated flashcards into the database
    await Flashcard.createMany(flashcards)
  }
}
