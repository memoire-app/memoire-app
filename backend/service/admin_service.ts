import Deck from '#models/deck'
import Flashcard from '#models/flashcard'
import { inject } from '@adonisjs/core'

@inject()
export default class AdminService {
  async deleteDeck(deckId: number) {
    const deck = await Deck.query().preload('flashcards').where('id', deckId).first()
    if (!deck) {
      return false
    }

    // Delete all flashcards in the deck
    await deck.related('flashcards').saveMany(
      deck.flashcards.map((flashcard) => {
        flashcard.isDeleted = true
        return flashcard
      })
    )
    // Delete the deck
    deck.isDeleted = true
    await deck.save()
  }

  async deleteFlashcard(flashcardId: number) {
    const flashcard = await Flashcard.find(flashcardId)
    if (!flashcard) {
      return false
    }

    flashcard.isDeleted = true
    await flashcard.save()
  }
}
