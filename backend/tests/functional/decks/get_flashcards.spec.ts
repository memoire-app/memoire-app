import { UserFactory } from '#database/factories/user_factory'
import { DeckFactory } from '#database/factories/deck_factory'
import User from '#models/user'
import { test } from '@japa/runner'
import { FlashcardFactory } from '#database/factories/flashcard_factory'

let user: User

test.group('Create / Get / Delete flashcards', (group) => {
  // Create a user and flashcards for the decks
  group.setup(async () => {
    user = await UserFactory.create()
    const decks = await DeckFactory.createMany(3)
    await user.related('decks').createMany(decks)
  })

  // Clean up the flashcards and the user
  group.teardown(async () => {
    await user.related('decks').query().delete()
    await user.delete()
  })

  test('Create flashcards for a deck', async ({ assert }) => {
    const deck = await user.related('decks').query().first()
    const flashcards = await FlashcardFactory.createMany(3)

    if (!deck) {
      return assert.fail('Deck not found')
    }
    const flashcardList = await deck.related('flashcards').createMany(flashcards)

    assert.equal(flashcardList.length, 3)
  })

  test('Get all flashcards for a deck', async ({ assert }) => {
    const deck = await user.related('decks').query().first()
    const flashcards = await FlashcardFactory.createMany(3)
    const flashcardList = await deck?.related('flashcards').createMany(flashcards)

    if (!flashcardList || flashcardList.length === 0) {
      return assert.fail('Flashcards not found')
    }

    // Make sure the flashcards are the same
    flashcardList.forEach((flashcard, index) => {
      assert.equal(flashcard.front, flashcards[index].front)
    })
  })
})
