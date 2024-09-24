import { DeckFactory } from '#database/factories/deck_factory'
import { UserFactory } from '#database/factories/user_factory'
import User from '#models/user'
import { test } from '@japa/runner'
import DeckService from '../../../service/deck_service.js'
import ApiBuilderService from '../../../service/api_builder_service.js'

let user: User

test.group('Users get their decks', (group) => {
  // Create a user
  group.setup(async () => {
    user = await UserFactory.create()
  })

  // Clean up the decks
  group.each.teardown(async () => {
    await user.related('decks').query().delete()
  })

  group.teardown(async () => {
    await user.delete()
  })

  test('Create decks for a user', async ({ assert }) => {
    const decks = await DeckFactory.createMany(3)
    const deck = await user.related('decks').createMany(decks)

    assert.equal(deck.length, 3)
  })

  test('Get all decks for a user', async ({ assert }) => {
    const decks = await DeckFactory.createMany(3)
    await user.related('decks').createMany(decks)

    const userDecks = await user.related('decks').query()

    // Make sure the decks are the same
    assert.equal(userDecks[0].title, decks[0].title)
    assert.equal(userDecks[0].userId, user.id)
  })

  test('Get a single deck for a user', async ({ assert }) => {
    const deck = await DeckFactory.create()
    await user.related('decks').create(deck)

    const userDeck = await user.related('decks').query().first()

    if (!userDeck) {
      return assert.fail('Deck not found')
    }

    // Make sure the deck is the same
    assert.equal(userDeck.title, deck.title)
    assert.equal(userDeck.userId, user.id)
  })

  test('Get a single deck for a user by id', async ({ assert }) => {
    const deck = await DeckFactory.create()
    await user.related('decks').create(deck)

    const userDeck = await user.related('decks').query().first()

    if (!userDeck) {
      return assert.fail('Deck not found')
    }

    const deckById = await user.related('decks').query().where('id', userDeck.id).first()

    // Make sure the deck is the same
    assert.equal(deckById?.title, deck.title)
    assert.equal(deckById?.userId, user.id)
  })

  test('Create a deck and delete it for a user', async ({ assert }) => {
    const deck = await DeckFactory.create()
    const deckService = new DeckService(new ApiBuilderService())
    await user.related('decks').create(deck)

    const userDeck = await user.related('decks').query().first()

    if (!userDeck) {
      return assert.fail('Deck not found')
    }

    await deckService.deleteDeck(user.id, userDeck.code)

    // Make sure the deck is deleted
    const deletedDeck = await user.related('decks').query().where('code', userDeck.code).first()
    assert.isTrue(deletedDeck?.isDeleted)
  })

  test('The number of public decks should match the non-deleted number decks', async ({
    assert,
  }) => {
    const deckService = new DeckService(new ApiBuilderService())
    const decks = await DeckFactory.createMany(3)
    await user.related('decks').createMany(decks)

    const userDecks = await user.related('decks').query()

    assert.equal(userDecks.length, 3)

    // Make them public using for...of to handle async operations correctly
    for (const deck of userDecks) {
      await deckService.publicizeDeck(user.id, deck.code)
    }

    // Fetch the updated deck data after making them public
    let updatedUserDecks = await user.related('decks').query()

    assert.equal(updatedUserDecks.filter((deck) => deck.isPublic).length, 3)
    assert.equal(updatedUserDecks.filter((deck) => !deck.isDeleted).length, 3)
    assert.equal(updatedUserDecks.filter((deck) => deck.isDeleted).length, 0)

    // Delete the first deck
    const res = await deckService.deleteDeck(user.id, updatedUserDecks[0].code)
    assert.isTrue(res)

    // Re-fetch the updated deck data after deletion to reflect the new state
    updatedUserDecks = await user.related('decks').query()

    const publicDecksNotDeleted = updatedUserDecks.filter(
      (deck) => deck.isPublic && !deck.isDeleted
    )

    assert.equal(publicDecksNotDeleted.length, 2)

    const publicDecks = await deckService.getPublicDecks('', 1, 25)

    assert.equal(publicDecks.nbTotalDecks, publicDecksNotDeleted.length)
  })
})
