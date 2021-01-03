import { Card, HandWithInfo, Hands, Matches, Suits } from "./index";
import { CardValues } from "./types";

// Function to determine top scoring hand
export function getTopScoringHand(cards: Card[]): HandWithInfo {
  // Get information about the hand
  const isFlush = isHandFlush(cards);
  const isStraight = isHandStraight(cards);
  const matches = getMatches(cards);
  const matchType = getMatchType(matches);
  const highCard = getHighCard(cards);

  if (matchType.hand != Hands.HIGH_CARD) {
    var returnObj = matchType;
    returnObj.highCard = highCard;
    return returnObj;
  } else {
    var hand: Hands;
    if (isFlush && isStraight) {
      hand = Hands.STRAIGHT_FLUSH;
    } else if (isFlush) {
      hand = Hands.FLUSH;
    } else if (isStraight) {
      hand = Hands.STRAIGHT;
    } else {
      hand = Hands.HIGH_CARD;
    }
    return {
      hand: hand,
      highCard: highCard,
    };
  }
}

// Function to determine if the hand is a Flush
export function isHandFlush(cards: Card[]): boolean {
  var prevSuit: Suits;
  for (const card of cards) {
    if (prevSuit == null) {
      prevSuit = card.suit;
    } else if (prevSuit != card.suit) {
      return false;
    }
  }
  return true;
}

// Function to determine if the hand is a Straight
export function isHandStraight(cards: Card[]): boolean {
  // Get the card values
  var cardValues = new Array<number>(0);
  for (const card of cards) {
    cardValues.push(getCardNumberValue(card));
  }
  // Sort the card values and then check if they are a Straight
  cardValues.sort((a, b) => a - b);
  for (var index = 0; index < cardValues.length - 1; index++) {
    var startCard = cardValues[index];
    var nextCard = cardValues[index + 1];
    if (startCard + 1 != nextCard) {
      return false;
    }
  }
  return true;
}

// Get the high card of the hand
export function getHighCard(cards: Card[]): Card {
  var highCard: Card;
  for (var card of cards) {
    if (card.value == CardValues.ACE) {
      return card;
    } else if (
      highCard == null ||
      getCardNumberValue(card) > getCardNumberValue(highCard)
    ) {
      highCard = card;
    }
  }
  return highCard;
}

// Function to determine matches in the hand
export function getMatches(cards: Card[]): Matches {
  var values = {};
  // Iterate over the hand and return a JSONObject
  // key : value == "card value" : number of cards
  // ex. { "2": 3 } means there are 3 cards with value of 2
  for (const card of cards) {
    if (card.value in values) {
      values[card.value] += 1;
    } else {
      values[card.value] = 1;
    }
  }
  // Removes any cards that only appear once
  var matchedValues = {};
  for (const value of Object.keys(values)) {
    if (values[value] > 1) {
      matchedValues[value] = values[value];
    }
  }

  return matchedValues;
}

// Function to determine what the match type is
export function getMatchType(matches: Matches): HandWithInfo {
  const matchKeys = Object.keys(matches);
  const matchLength = matchKeys.length;
  switch (matchLength) {
    case 0:
      // If there are no fields in the object, return the high card
      return { hand: Hands.HIGH_CARD };
    case 1:
      // If there is only one value matched, determine how many are matched
      switch (matches[matchKeys[0]]) {
        case 2:
          return { hand: Hands.ONE_PAIR, match: matchKeys[0] };
        case 3:
          return { hand: Hands.THREE_OF_A_KIND, match: matchKeys[0] };
        case 4:
          return { hand: Hands.FOUR_OF_A_KIND, match: matchKeys[0] };
        default:
          // Theoretically unreachable, but included for completeness
          return { hand: Hands.HIGH_CARD };
      }
    case 2:
      // If there are two matches, determine if it is two pair or full house
      const firstMatch = matches[matchKeys[0]];
      const secondMatch = matches[matchKeys[1]];
      if (firstMatch != secondMatch) {
        // If the match values are not equal (i.e. 2), then we return a full house
        if (matches[matchKeys[0]] == 3) {
          return {
            hand: Hands.FULL_HOUSE,
            pair: matchKeys[1],
            triple: matchKeys[0],
          };
        } else {
          return {
            hand: Hands.FULL_HOUSE,
            pair: matchKeys[0],
            triple: matchKeys[1],
          };
        }
      } else {
        return {
          hand: Hands.TWO_PAIR,
          match: `${matchKeys[0]} and ${matchKeys[1]}`,
        };
      }
    default:
      return { hand: Hands.HIGH_CARD };
  }
}

// Turn the card values into the number value
export function getCardNumberValue(card: Card): number {
  if (!isNaN(Number(card.value))) {
    return Number(card.value);
  } else {
    switch (card.value) {
      case CardValues.JACK:
        return 11;
      case CardValues.QUEEN:
        return 12;
      case CardValues.KING:
        return 13;
      case CardValues.ACE:
        return 14;
    }
  }
}
