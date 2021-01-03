# How to run

## Required Installs

- Node -> Developed using v12.13.1, probably can be run on lower versions but not sure on absolute lowest supported versions
  - As best as I can tell, I'm not using any prototype or recently introduced functionality, so I'd guess you could go a decent ways back

## Install Project Dependencies

- `npm install` will pull down all `node_modules` required.

## Run the app

- `npm run poker` will run the app
  - First, it compiles the code to generate the `dist/` folder, using the `tsc` command
  - Second, it runs the main file, `app.js` from the `dist/` folder.

## Run the tests

- `npm test` will run the tests

# Assumptions

- Only one deck will be played at a time
- No Wildcards (so five of a kind is not feasible)
- Based on the above two assumptions, there can only be one of the eight types of "best hands" within a hand.
  - If this assumption were changed, this library would need to be re-written.
  - For example, if you had three decks, you could have a Flush and a Full House in the same hand. (Two Two of Clubs and Three Three of Clubs)
- A new deck is used each time the app is run
  - This is to keep you from counting cards (or simplicity sake)
