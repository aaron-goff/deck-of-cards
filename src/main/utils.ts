import { Card } from "./index";

// Function to change the Suit from `SUIT` to `Suit` (CLUBS -> Clubs)
export function formatSuit(card: Card) {
  return sentenceCase(card.suit.toString());
}

// Function to change string from ALL CAPS to Sentence case (HELLO -> Hello)
export function sentenceCase(word: string) {
  return word.charAt(0) + word.substring(1).toLowerCase();
}

// Function to get the shorthand name for a card (ACE -> A)
export function cardShort(card: Card) {
  return isNaN(parseFloat(card.value)) ? card.value.charAt(0) : card.value;
}
