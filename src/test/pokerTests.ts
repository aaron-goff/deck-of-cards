import {
  Card,
  Suits,
  CardValues,
  getHighCard,
  getMatches,
  getMatchType,
  Hands,
  isHandFlush,
  isHandStraight,
  getCardNumberValue,
  getTopScoringHand,
} from "../main/index";
import { expect } from "chai";
import "mocha";

describe("Poker.ts Tests", () => {
  // Testing Variables
  var hand: Array<Card>;
  const sixOfDiamonds = generateCard(Suits.DIAMONDS, CardValues.SIX);

  // Functions to help with testing
  function generateCard(
    suit: Suits = Suits.CLUBS,
    value: CardValues = CardValues.TWO
  ): Card {
    return {
      // Code and image are irrelevant for testing, so always setting them
      code: "1234",
      image: "http://image",
      suit: suit,
      value: value,
    };
  }

  // Generates a random card value if an index isn't provided
  function generateValue(index?: number): CardValues {
    const values = Object.keys(CardValues);
    if (index == null) {
      index = Math.random() * values.length;
    }
    return CardValues[values[index]];
  }

  // Generates a card that ensures a hand of 5 is not a flush
  function generateNotFlushSuit(index: number) {
    return index == 0 ? Suits.CLUBS : Suits.DIAMONDS;
  }

  // Adds a card to the `hand` variable
  function addCard(suit: Suits, value: CardValues) {
    hand.push(generateCard(suit, value));
  }

  // Function that makes the hand to pass into the tests
  function makeHand(
    expectedHand: Hands,
    highCard: CardValues = CardValues.EIGHT
  ) {
    // Loop to tell the function to keep adding cards
    while (hand.length < 5) {
      // Card suit is determined by the expectedHand type
      const suit =
        expectedHand == Hands.FLUSH || expectedHand == Hands.STRAIGHT_FLUSH
          ? Suits.CLUBS
          : generateNotFlushSuit(hand.length);

      var value: CardValues;
      // Card value is determined by hand.length and hand type
      switch (expectedHand) {
        case Hands.HIGH_CARD:
        case Hands.FLUSH:
          value = hand.length == 0 ? highCard : generateValue(hand.length);
          break;
        case Hands.ONE_PAIR:
          value =
            hand.length <= 1 ? CardValues.TWO : generateValue(hand.length);
          break;
        case Hands.TWO_PAIR:
          if (hand.length <= 1) {
            value = CardValues.TWO;
          } else if (hand.length <= 3) {
            value = CardValues.THREE;
          } else {
            value = CardValues.FOUR;
          }
          break;
        case Hands.THREE_OF_A_KIND:
          value =
            hand.length <= 2 ? CardValues.TWO : generateValue(hand.length);
          break;
        case Hands.FOUR_OF_A_KIND:
          value =
            hand.length <= 3 ? CardValues.TWO : generateValue(hand.length);
          break;
        case Hands.FULL_HOUSE:
          value = hand.length <= 1 ? CardValues.TWO : CardValues.THREE;
          break;
        case Hands.STRAIGHT:
        case Hands.STRAIGHT_FLUSH:
          value = generateValue(hand.length);
      }

      addCard(suit, value);
    }
  }

  beforeEach(() => {
    // Initialize hand before each test
    hand = new Array<Card>(0);
  });

  afterEach(() => {
    // Clear hand after each test
    hand = Array<Card>(0);
  });

  describe("Top Scoring Hand Tests", () => {
    // These tests are probably closer to integration tests
    // They test that given a hand, we receive the correct highest scoring information
    it("Should Return High Card", () => {
      makeHand(Hands.HIGH_CARD);

      const highScoringHand = getTopScoringHand(hand);
      const expectedHighScoringHand = {
        hand: Hands.HIGH_CARD,
        highCard: generateCard(Suits.CLUBS, CardValues.EIGHT),
      };
      expect(highScoringHand).to.eql(expectedHighScoringHand);
    });

    it("Should return Pair", () => {
      makeHand(Hands.ONE_PAIR);
      const highScoringHand = getTopScoringHand(hand);
      const expectedHighScoringHand = {
        hand: Hands.ONE_PAIR,
        match: "2",
        highCard: sixOfDiamonds,
      };
      expect(highScoringHand).to.eql(expectedHighScoringHand);
    });

    it("Should return Two pair", () => {
      makeHand(Hands.TWO_PAIR);
      const highScoringHand = getTopScoringHand(hand);
      const expectedHighScoringHand = {
        hand: Hands.TWO_PAIR,
        match: `2 and 3`,
        highCard: generateCard(Suits.DIAMONDS, CardValues.FOUR),
      };

      expect(highScoringHand).to.eql(expectedHighScoringHand);
    });

    it("Should return Three of a kind", () => {
      makeHand(Hands.THREE_OF_A_KIND);
      const highScoringHand = getTopScoringHand(hand);
      const expectedHighScoringHand = {
        hand: Hands.THREE_OF_A_KIND,
        match: "2",
        highCard: sixOfDiamonds,
      };
      expect(highScoringHand).to.eql(expectedHighScoringHand);
    });

    it("Should return Four of a kind", () => {
      makeHand(Hands.FOUR_OF_A_KIND);
      const highScoringHand = getTopScoringHand(hand);
      const expectedHighScoringHand = {
        hand: Hands.FOUR_OF_A_KIND,
        match: "2",
        highCard: sixOfDiamonds,
      };
      expect(highScoringHand).to.eql(expectedHighScoringHand);
    });

    it("Should return a Full House", () => {
      makeHand(Hands.FULL_HOUSE);
      const highScoringHand = getTopScoringHand(hand);
      const expectedHighScoringHand = {
        hand: Hands.FULL_HOUSE,
        pair: "2",
        triple: "3",
        highCard: generateCard(Suits.DIAMONDS, CardValues.THREE),
      };
      expect(highScoringHand).to.eql(expectedHighScoringHand);
    });

    it("Should return a Flush", () => {
      makeHand(Hands.FLUSH, CardValues.ACE);
      const highScoringHand = getTopScoringHand(hand);
      const expectedHighScoringHand = {
        hand: Hands.FLUSH,
        highCard: generateCard(Suits.CLUBS, CardValues.ACE),
      };
      expect(highScoringHand).to.eql(expectedHighScoringHand);
    });

    it("Should return a Straight", () => {
      makeHand(Hands.STRAIGHT);
      const highScoringHand = getTopScoringHand(hand);
      const expectedHighScoringHand = {
        hand: Hands.STRAIGHT,
        highCard: sixOfDiamonds,
      };
      expect(highScoringHand).to.eql(expectedHighScoringHand);
    });

    it("Should return a Straight Flush", () => {
      makeHand(Hands.STRAIGHT_FLUSH);
      const highScoringHand = getTopScoringHand(hand);
      const expectedHighScoringHand = {
        hand: Hands.STRAIGHT_FLUSH,
        highCard: generateCard(Suits.CLUBS, CardValues.SIX),
      };
      expect(highScoringHand).to.eql(expectedHighScoringHand);
    });
  });

  describe("Flush Tests", () => {
    // These tests validate that the `isHandFlush` method works
    it("Should return Hand is Flush", () => {
      makeHand(Hands.FLUSH);
      const isFlush = isHandFlush(hand);
      expect(isFlush).to.be.true;
    });

    it("Should return Hand is not Flush", () => {
      makeHand(Hands.HIGH_CARD);
      const isFlush = isHandFlush(hand);
      expect(isFlush).to.be.false;
    });
  });

  describe("Straight Tests", () => {
    // These tests validate that the `isHandStraight` function works
    it("Should return Hand is Straight", () => {
      makeHand(Hands.STRAIGHT);
      const isStraight = isHandStraight(hand);
      expect(isStraight).to.be.true;
    });

    it("Should return Hand is Not Straight", () => {
      makeHand(Hands.HIGH_CARD);
      const isStraight = isHandStraight(hand);
      expect(isStraight).to.be.false;
    });
  });

  describe("High Card Tests", () => {
    // Validates that the High Card function works
    // In addition to the card number values test, I have confidence this function works
    it("Should return High Card of Ace", () => {
      makeHand(Hands.HIGH_CARD, CardValues.ACE);

      const highCard = getHighCard(hand);
      expect(highCard.value).to.eql(CardValues.ACE);
    });
  });

  describe("Hand Matches and Match Type Tests", () => {
    // These test validate the match types
    it("Should return One Pair", () => {
      makeHand(Hands.ONE_PAIR);

      const matches = getMatches(hand);
      const matchType = getMatchType(matches);
      const expectedMatches = {
        "2": 2,
      };
      const expectedMatchType = {
        hand: Hands.ONE_PAIR,
        match: "2",
      };
      expect(matches).to.eql(expectedMatches);
      expect(matchType).to.eql(expectedMatchType);
    });

    it("Should return One Three of a Kind", () => {
      makeHand(Hands.THREE_OF_A_KIND);
      const matches = getMatches(hand);
      const matchType = getMatchType(matches);
      const expectedMatches = {
        "2": 3,
      };
      const expectedMatchType = {
        hand: Hands.THREE_OF_A_KIND,
        match: "2",
      };
      expect(matches).to.eql(expectedMatches);
      expect(matchType).to.eql(expectedMatchType);
    });

    it("Should return One Four of a Kind", () => {
      makeHand(Hands.FOUR_OF_A_KIND);
      const matches = getMatches(hand);
      const matchType = getMatchType(matches);
      const expectedMatches = {
        "2": 4,
      };
      const expectedMatchType = {
        hand: Hands.FOUR_OF_A_KIND,
        match: "2",
      };
      expect(matches).to.eql(expectedMatches);
      expect(matchType).to.eql(expectedMatchType);
    });

    it("Should return Two Pairs", () => {
      makeHand(Hands.TWO_PAIR);
      const matches = getMatches(hand);
      const matchType = getMatchType(matches);
      const expectedMatches = {
        "2": 2,
        "3": 2,
      };
      const expectedMatchType = {
        hand: Hands.TWO_PAIR,
        match: `2 and 3`,
      };
      expect(matches).to.eql(expectedMatches);
      expect(matchType).to.eql(expectedMatchType);
    });

    it("Should Return a Full House", () => {
      makeHand(Hands.FULL_HOUSE);
      const matches = getMatches(hand);
      const matchType = getMatchType(matches);
      const expectedMatches = {
        "2": 2,
        "3": 3,
      };
      const expectedMatchType = {
        hand: Hands.FULL_HOUSE,
        pair: "2",
        triple: "3",
      };
      expect(matches).to.eql(expectedMatches);
      expect(matchType).to.eql(expectedMatchType);
    });

    it("Should Return No Matches", () => {
      makeHand(Hands.HIGH_CARD);
      const matches = getMatches(hand);
      const matchType = getMatchType(matches);
      const expectedMatches = {};
      const expectedMatchType = { hand: Hands.HIGH_CARD };
      expect(matches).to.eql(expectedMatches);
      expect(matchType).to.eql(expectedMatchType);
    });
  });

  describe("Card Number Value Tests", () => {
    // Test validates that the card number values are translated correctly
    it("Should return the correct Card Number Values", () => {
      const cardValuesArray = Object.keys(CardValues);
      for (var i = 0; i < cardValuesArray.length; i++) {
        const card = generateCard(Suits.CLUBS, CardValues[cardValuesArray[i]]);
        const numberValue = getCardNumberValue(card);
        expect(numberValue).to.eql(i + 2);
      }
    });
  });
});
