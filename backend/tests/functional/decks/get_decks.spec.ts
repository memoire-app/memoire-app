import { DeckFactory } from '#database/factories/deck_factory'
import { UserFactory } from '#database/factories/user_factory'
import User from '#models/user'
import { test } from '@japa/runner'

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
})
