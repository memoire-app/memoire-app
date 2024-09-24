import { UserFactory } from '#database/factories/user_factory'
import { DeckFactory } from '#database/factories/deck_factory'
import User from '#models/user'
import { test } from '@japa/runner'
import { FlashcardFactory } from '#database/factories/flashcard_factory'
import RevisionsService from '../../../service/revisions_service.js'

let user: User

test.group('Create revisions', (group) => {
  // Create a user, 3 decks with 3 flashcards each
  group.setup(async () => {
    user = await UserFactory.create()
    const decks = await DeckFactory.createMany(3)
    await user.related('decks').createMany(decks)

    for (const deck of decks) {
      const randomFlashcardsNumber = Math.floor(Math.random() * 3) + 1
      const flashcards = await FlashcardFactory.createMany(randomFlashcardsNumber)
      await deck.related('flashcards').createMany(flashcards)
    }
  })

  // Clean up the flashcards and the user
  group.teardown(async () => {
    await user.related('decks').query().delete()
    await user.delete()
  })

  test('Create a revision', async ({ assert }) => {
    // Fetch the user's decks
    const decks = await user.related('decks').query()
    assert.equal(decks.length, 3)

    // Select a deck to create a revision for
    const deck = decks[0]
    const revisionService = new RevisionsService()

    // Create a revision and await the result
    const revision = await revisionService.createRevision(user.id, deck.code)

    // Assert that the revision was successfully created
    assert.isNotNull(revision)
  })

  test('Create a revision for a deck that does not exist', async ({ assert }) => {
    const revisionService = new RevisionsService()

    // Create a revision for a deck that does not exist
    const revision = await revisionService.createRevision(user.id, 'invalid_code')

    // Assert that the revision was not created
    assert.isNull(revision)
  })

  test('Create a revision for a deck with an existing revision', async ({ assert }) => {
    // Fetch the user's decks
    const decks = await user.related('decks').query()
    assert.equal(decks.length, 3)

    // Select a deck to create a revision for
    const deck = decks[0]
    const revisionService = new RevisionsService()

    // Create a revision and await the result
    const revision = await revisionService.createRevision(user.id, deck.code)

    // Assert that the revision was successfully created
    assert.isNotNull(revision)

    // Create a revision for the same deck
    const newRevision = await revisionService.createRevision(user.id, deck.code)

    // Assert that the new revision was successfully created
    assert.isNotNull(newRevision)

    // Assert that the previous revision was completed
    assert.isNotNull(revision?.completedAt)
  })
})
