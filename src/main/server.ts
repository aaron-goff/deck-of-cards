import { Card, Deck } from "./index";
import Axios from "axios";

export async function createNewShuffledDeck(count: number = 1): Promise<Deck> {
  const response = await Axios.get(
    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${count}`
  );
  return response.data as Deck;
}

export async function drawFive(deckId: string): Promise<Card[]> {
  const response = await Axios.get(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`
  );
  return response.data.cards as Card[];
}
