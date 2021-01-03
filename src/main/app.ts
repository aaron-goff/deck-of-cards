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

// Function to call the API for a new deck
async function getNewDeck(count: number = 1) {
  const deck = await createNewShuffledDeck(count);
  deckId = deck.deck_id;
}

// Function to draw a new hand
async function getNewHand() {
  // Retrieve the deckId -- currently always will be null when run,
  // but theoretically could change this in the future
  if (deckId == null) {
    console.log("Getting a freshly shuffled deck...");
    await getNewDeck();
  }

  // Get the cards as typed Cards
  const cards = await drawFive(deckId);

  // Print out Cards that are drawn
  console.log("Your cards are:");
  for (const card of cards) {
    console.log(`${cardShort(card)} of ${formatSuit(card)}`);
  }

  // Determine top scoring hand and stylize strings
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

  // Print out the stylized string
  console.log(
    `Your best hand is: ${bestHand.hand}${matchString}${highCardString}`
  );
}

// Run the function to print out cards and the highest scoring hand
getNewHand();
