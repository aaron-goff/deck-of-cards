import { Card } from "./index";

export function formatSuit(card: Card) {
  return sentenceCase(card.suit.toString());
}

export function sentenceCase(word: string) {
  return word.charAt(0) + word.substring(1).toLowerCase();
}

export function cardShort(card: Card) {
  return isNaN(parseFloat(card.value)) ? card.value.charAt(0) : card.value;
}
