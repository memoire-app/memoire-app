import Deck from '#models/deck'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import ApiBuilderService from './api_builder_service.js'

@inject()
export default class DeckService {
  constructor(protected apiBuilderService: ApiBuilderService) {}

  async getPublicDecks(search: string, page: number, limit: number) {
    const { searchedDecks, nbTotalSearched } = await this.queryPublicDecks(search, page, limit)
    const totalDecks = search
      ? Number(nbTotalSearched[0].total)
      : await this.countTotalPublicDecks()

    const nbWeeklyDecks = await db
      .from('decks')
      .where('is_public', true)
      .where('created_at', '>', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .count('id as total')

    return {
      nbTotalDecks: await this.countTotalPublicDecks(),
      nbWeeklyDecks: Number(nbWeeklyDecks[0].total),
      nbMatchedDecks: totalDecks,
      decks: searchedDecks
        .all()
        .map((deck) =>
          this.apiBuilderService.buildPublicDeckApi(deck, deck.user.username || 'Anonymous')
        ),
    }
  }

  private async queryPublicDecks(search: string, page: number, limit: number) {
    return {
      searchedDecks: await Deck.query()
        .where('isPublic', true)
        .where((query) => {
          query.where('title', 'ILIKE', `%${search}%`).orWhere('tags', 'ILIKE', `%${search}%`)
        })
        .preload('flashcards')
        .preload('user')
        .orderBy('updated_at', 'desc')
        .paginate(page, limit),
      nbTotalSearched: await db
        .from('decks')
        .where('is_public', true)
        .where((query) => {
          query.where('title', 'ILIKE', `%${search}%`).orWhere('tags', 'ILIKE', `%${search}%`)
        })
        .count('id as total'),
    }
  }

  private async countTotalPublicDecks() {
    const [{ total }] = await db.from('decks').where('is_public', true).count('id as total')
    return Number(total)
  }

  async getUserDecks(userId: number, search: string, page: number, limit: number) {
    const decksWithRevisionCount = await Deck.query()
      .where('user_id', userId)
      .where((query) => {
        query.where('title', 'ILIKE', `%${search}%`).orWhere('tags', 'ILIKE', `%${search}%`)
      })
      .withCount('revisions')
      .withCount('flashcards')
      .orderBy('updated_at', 'desc')
      .paginate(page, limit)

    if (!decksWithRevisionCount) {
      return []
    }

    const nbDecks = await db
      .from('decks')
      .where('user_id', userId)
      .where((query) => {
        query.where('title', 'ILIKE', `%${search}%`).orWhere('tags', 'ILIKE', `%${search}%`)
      })
      .count('id as total')

    if (!nbDecks) {
      return { nbDecks: 0, decks: [] }
    }

    const res = {
      nbDecks: Number(nbDecks[0].total),
      decks: decksWithRevisionCount
        .all()
        .map((deck: Deck) => this.apiBuilderService.buildDeckApi(deck)),
    }
    return res
  }

  async createDeck(userId: number, title: string, tags: string[], isPublic: boolean) {
    const tagsForDb = tags.join(';')
    const code = Math.random().toString(36).substring(2, 8)

    return await Deck.create({
      userId,
      title,
      original: true,
      code,
      tags: tagsForDb,
      isPublic,
    })
  }

  async deleteDeck(userId: number, code: string) {
    const deck = await Deck.query().where('user_id', userId).where('code', code).first()
    if (!deck) {
      return false
    }

    await deck.delete()
    return true
  }

  async importDeckFromCode(userId: number, code: string) {
    const deck = await Deck.query().where('code', code).preload('flashcards').first()

    if (!deck) {
      return null
    }

    const userDeck = await Deck.query()
      .where('user_id', userId)
      .where((query) => query.where('code', code).orWhere('originalCode', code))
      .first()

    if (userDeck) {
      return false
    }

    const newCode = Math.random().toString(36).substring(2, 8)
    const newDeck = await Deck.create({
      userId,
      title: deck.title,
      original: false,
      tags: deck.tags,
      code: newCode,
      originalCode: code,
    })

    const previousFlashcards = await deck.related('flashcards').query()

    if (!previousFlashcards) {
      return null
    }

    for (const flashcard of previousFlashcards) {
      await newDeck.related('flashcards').create({
        front: flashcard.front,
        back: flashcard.back,
      })
    }

    return true
  }

  async privatizeDeck(userId: number, code: string) {
    const deck = await Deck.query().where('user_id', userId).where('code', code).first()
    if (!deck) {
      return false
    }

    deck.isPublic = false
    await deck.save()
    return true
  }

  async publicizeDeck(userId: number, code: string) {
    const deck = await Deck.query().where('user_id', userId).where('code', code).first()
    if (!deck) {
      return false
    }

    deck.isPublic = true
    await deck.save()
    return true
  }

  async editDeck(userId: number, code: string, title: string, tags: string[]) {
    const deck = await Deck.query().where('user_id', userId).where('code', code).first()
    if (!deck) {
      return false
    }

    deck.title = title
    deck.tags = tags.join(';')
    await deck.save()
    return true
  }

  async duplicateDeck(userId: number, code: string) {
    const deck = await Deck.query().where('user_id', userId).where('code', code).first()
    if (!deck) {
      return false
    }

    const newDeck = await this.createDeck(
      userId,
      deck.title,
      deck.tags ? deck.tags.split(';') : [],
      deck.isPublic
    )

    const previousFlashcards = await deck.related('flashcards').query()

    if (!previousFlashcards) {
      return null
    }

    for (const flashcard of previousFlashcards) {
      await newDeck.related('flashcards').create({
        front: flashcard.front,
        back: flashcard.back,
      })
    }

    return true
  }
}
