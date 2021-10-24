// start of wrapper (I will explain how this works later)
(async () => {
	// your code goes here! below this line

	const hangman = [
		`
  +---+
  |   |
      |
      |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
		`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
	];

	let words = `abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buxom buzzard buzzing buzzwords cobweb croquet crypt cycle disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled fuchsia funny gabby galaxy galvanize gazebo gizmo glowworm glyph gnarly gnostic gossip grogginess haiku haphazard hyphen icebox injury ivory ivy jackpot jawbreaker jaywalk jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole kilobyte kiosk kitsch kiwifruit klutz knapsack larynx lengths lucky luxury lymph marquee matrix megahertz microwave mnemonic mystify nightclub nowadays oxidize oxygen pajama phlegm pixel pizazz polka psyche puppy puzzling quartz queue quips quiz quizzes quorum razzmatazz rhubarb rhythm scratch snazzy sphinx squawk staff strength stretch stronghold stymied subway swivel syndrome thrift thumb topaz transcript transgress transplant twelfth triphthong unknown unzip vaporize voodoo vortex walkway waltz wave wavy waxy well whomever witch wizard wristwatch xylophone yacht youthful yummy zigzag zilch zipper zodiac zombie`;

	/* PART A0: split the words string into an array, choose a random word */
	words = words.split(' ');

	// generate random number between 0 and the number of words in the words array
	let rand = Math.random() * words.length;
	rand = Math.floor(rand); // round down
	const word = words[rand]; // get word from words array
	console.log(word); // log the word in the console for testing

	/* PART A1: make an array with a line for each letter in the word */
	// Example word: 'quiz'
	// lines -> ['_', '_', '_', '_']
	let lines = '_'.repeat(word.length).split('');

	let parts = 0;
	/* PART A3: make the game loop, don't use the hangman until part B */
	while (lines.includes('_') || parts > 6) {
		/* PART B: display the hangman in the prompt */
		let msg = hangman[parts] + '\n' + lines.join(' ');

		// guess is the letter or word the user entered
		let guess = await prompt(msg);
		let isCorrect = false;

		// test if the guess is a whole word, not just one letter
		if (guess == word) {
			break; // if guess matches word the user won, end loop
		}

		let i = 0;
		while (i < lines.length) {
			// the next letter in the word
			let letter = word[i];
			if (letter == guess) {
				lines[i] = letter;
				isCorrect = true;
			}
			i++;
		}

		if (isCorrect == false) {
			parts++;
		}
	}

	if (parts <= 6) {
		await alert('You got it! The word is ' + word);
	} else {
		await alert('You ran out of attempts. The word is ' + word);
	}

	exit(); // exits the game
})(); // end
