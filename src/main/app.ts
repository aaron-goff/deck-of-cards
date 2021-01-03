import {
  Card,
  cardShort,
  createNewShuffledDeck,
  drawFive,
  formatSuit,
  getTopScoringHand,
  Hands,
  sentenceCase,
} from "./index";

// variables
var deckId: string;

async function getNewDeck(count: number = 1) {
  const response = await createNewShuffledDeck(count);
  deckId = response.data.deck_id;
}

async function getNewHand() {
  if (deckId == null) {
    console.log("Getting a freshly shuffled deck...");
    await getNewDeck();
  }

  const response = await drawFive(deckId);
  const cards = response.data.cards as Card[];

  console.log("Your cards are:");
  for (const card of cards) {
    console.log(`${cardShort(card)} of ${formatSuit(card)}`);
  }

  const bestHand = getTopScoringHand(cards);
  var highCardString = `, with high card: ${sentenceCase(
    bestHand.highCard.value
  )}`;
  var matchString = "";
  if (
    bestHand.hand == Hands.ONE_PAIR ||
    bestHand.hand == Hands.THREE_OF_A_KIND ||
    bestHand.hand == Hands.FOUR_OF_A_KIND ||
    bestHand.hand == Hands.TWO_PAIR
  ) {
    matchString = `, with matches on ${sentenceCase(bestHand.match)}`;
  } else if (bestHand.hand == Hands.FULL_HOUSE) {
    matchString = `, with three of a kind ${sentenceCase(
      bestHand.triple
    )}s and a pair of ${sentenceCase(bestHand.pair)}s`;
  }

  console.log(
    `Your best hand is: ${bestHand.hand}${matchString}${highCardString}`
  );
}

getNewHand();
