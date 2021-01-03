import Axios, { AxiosResponse } from "axios";

export async function createNewShuffledDeck(
  count: number = 1
): Promise<AxiosResponse> {
  return Axios.get(
    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${count}`
  );
}

export async function drawFive(deckId: string): Promise<AxiosResponse> {
  return Axios.get(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`
  );
}
