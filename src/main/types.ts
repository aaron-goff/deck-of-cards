// Based on response from API
export type Deck = {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
};

// Based on response from API
// Code and Image are unused in this app, but included for completeness
export type Card = {
  code: string;
  image: string;
  value: CardValues;
  suit: Suits;
};

// Custom type to hold matches
export type Matches = {
  [key: string]: number;
};

// List of possible suits of cards
export enum Suits {
  SPADES,
  HEARTS,
  DIAMONDS,
  CLUBS,
}

// List of possible card values
export enum CardValues {
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "10",
  JACK = "Jack",
  QUEEN = "Queen",
  KING = "King",
  ACE = "Ace",
}

// Potential hand types
export enum Hands {
  STRAIGHT_FLUSH = "Straight Flush",
  FOUR_OF_A_KIND = "Four of a Kind",
  FULL_HOUSE = "Full House",
  FLUSH = "Flush",
  STRAIGHT = "Straight",
  THREE_OF_A_KIND = "Three of a Kind",
  TWO_PAIR = "Two Pair",
  ONE_PAIR = "One Pair",
  HIGH_CARD = "High Card",
}

// Custom type that combines the hand type with information about the hand
export type HandWithInfo = {
  hand: Hands;
  pair?: string;
  triple?: string;
  match?: string;
  highCard?: Card;
  suit?: Suits;
};
