import { UserFactory } from '#database/factories/user_factory'
import { DeckFactory } from '#database/factories/deck_factory'
import User from '#models/user'
import { test } from '@japa/runner'
import { FlashcardFactory } from '#database/factories/flashcard_factory'
import RevisionsService from '../../../service/revisions_service.js'
import RevisionsFlashcardsService from '../../../service/revisions_flashcards_service.js'
import db from '@adonisjs/lucid/services/db'

let user: User

test.group('Create revisions', (group) => {
  // Create a user, 3 decks with 3 flashcards each
  group.setup(async () => {
    user = await UserFactory.create()
    const decks = await DeckFactory.createMany(3)
    await user.related('decks').createMany(decks)

    for (const deck of decks) {
      const randomFlashcardsNumber = Math.floor(Math.random() * 10) + 1
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
    assert.isNotNull(revision!.completedAt)
  })

  test('A user can only have one active revision / deck at a time', async ({ assert }) => {
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

    // Create a revision for a different deck
    const newDeck = decks[1]
    const newRevision = await revisionService.createRevision(user.id, newDeck.code)

    // Assert that the new revision was successfully created
    assert.isNotNull(newRevision)

    // Assert that the previous revision has not been completed
    assert.isUndefined(revision!.completedAt)

    // Assert that the new revision is active
    assert.isUndefined(newRevision!.completedAt)
  })

  // TODO: needs to change when the flashcard algorithm is implemented
  test('A revision should be terminated when all flashcards associated have been worked on', async ({
    assert,
  }) => {
    // Fetch the user's decks
    const decks = await user.related('decks').query()
    assert.equal(decks.length, 3)

    // Select a deck to create a revision for
    const deck = decks[0]
    const revisionService = new RevisionsService()
    const revisionFlashcardsService = new RevisionsFlashcardsService()

    // Create a revision and await the result
    const revision = await revisionService.createRevision(user.id, deck.code)

    // Assert that the revision was successfully created
    assert.isNotNull(revision)

    // Fetch the flashcards associated with the deck
    const flashcards = await deck.related('flashcards').query()

    assert.isAbove(flashcards.length, 0)

    let messages = []

    // Work on all the flashcards
    for (const flashcard of flashcards) {
      messages.push(
        await revisionFlashcardsService.createRevisionFlashcard(revision!.id, flashcard.id, 'good')
      )
    }

    // Last messages should be 'FINISHED'
    assert.equal(messages[messages.length - 1].message, 'FINISHED')

    // Should return null
    const updatedRevision = await revisionService.getCurrentRevision(user.id, deck.code)

    // Assert that the revision has been completed (can't get the current revision)
    assert.isNull(updatedRevision)
  })

  test('A revision should not be terminated when not all flashcards associated have been worked on', async ({
    assert,
  }) => {
    // Fetch the user's decks
    const decks = await user.related('decks').query()
    assert.equal(decks.length, 3)

    // Select a deck to create a revision for
    const deck = decks[0]
    const revisionService = new RevisionsService()
    const revisionFlashcardsService = new RevisionsFlashcardsService()

    // Create a revision and await the result
    const revision = await revisionService.createRevision(user.id, deck.code)

    // Assert that the revision was successfully created
    assert.isNotNull(revision)

    // Fetch the flashcards associated with the deck
    const flashcards = await deck.related('flashcards').query()

    assert.isAbove(flashcards.length, 0)

    // Work on the first flashcard
    const message = await revisionFlashcardsService.createRevisionFlashcard(
      revision!.id,
      flashcards[0].id,
      'good'
    )

    // Last message should be 'OK' if flashcards.length > 1
    if (flashcards.length > 1) {
      assert.equal(message.message, 'OK')

      // Should return the revision
      const updatedRevision = await revisionService.getCurrentRevision(user.id, deck.code)

      // Assert that the revision has not been completed
      assert.isNotNull(updatedRevision)
    } else {
      assert.equal(message.message, 'FINISHED')

      // Should return null
      const updatedRevision = await revisionService.getCurrentRevision(user.id, deck.code)

      // Assert that the revision has not been completed
      assert.isNull(updatedRevision)
    }
  })

  test('Not terminated if there is a "again" in RetentionType for current revision', async ({
    assert,
  }) => {
    // Fetch the user's decks
    const decks = await user.related('decks').query()
    assert.equal(decks.length, 3)

    // Select a deck to create a revision for
    const deck = decks[0]
    const revisionService = new RevisionsService()
    const revisionFlashcardsService = new RevisionsFlashcardsService()

    // Create a revision and await the result
    const revision = await revisionService.createRevision(user.id, deck.code)

    // Assert that the revision was successfully created
    assert.isNotNull(revision)

    // Fetch the flashcards associated with the deck
    const flashcards = await deck.related('flashcards').query()

    assert.isAbove(flashcards.length, 0)

    // Work on every flashcards (except one)
    for (let i = 0; i < flashcards.length - 1; i++) {
      await revisionFlashcardsService.createRevisionFlashcard(
        revision!.id,
        flashcards[i].id,
        'good'
      )
    }

    // Mark the last flashcard as 'again'
    const message = await revisionFlashcardsService.createRevisionFlashcard(
      revision!.id,
      flashcards[flashcards.length - 1].id,
      'again'
    )

    // Assert all flashcards have been revised once
    // Check that the number of distinct flashcards revised is equal to the number of flashcards in the deck
    const flashcardsRevised = await db
      .from('revisions_flashcards')
      .where('revision_id', revision!.id)
      .countDistinct('flashcard_id as count')

    assert.equal(Number(flashcardsRevised[0].count), flashcards.length)

    // Last message should be 'OK' since it's an 'again' and not finished
    assert.equal(message.message, 'OK')

    // Should return the revision
    const updatedRevision = await revisionService.getCurrentRevision(user.id, deck.code)

    // Assert that the revision has not been completed
    assert.isNotNull(updatedRevision)
  })
})
