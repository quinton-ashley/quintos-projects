// your code goes here! below this line

const hangman = [
	`






=========`,
	`


      |
      |
      |
      |
=========`,
	`
      +
      |
      |
      |
      |
      |
=========`,
	`
    --+
      |
      |
      |
      |
      |
=========`,
	`
  +---+
      |
      |
      |
      |
      |
=========`,
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

// words that are easier to spell
let wordLists = {
	easy: 'I cool know over these about down large please they after drink learn put think again each little red this ago everything live right those all face location run three also far make same to always fast man sea together am father many seven try an find may shop turn and first meaning sit under any five men six until are fly mother sleep us as foot much small use from must smile want ask give never some we at go no sorry well away green not star what because has now stay when bed here ocean stop where black his of store which blue how old strong why bring in on tell will call into one thank with clean is only that yellow cold it or the yes color just our you come kind out there',
	medium:
		"above coming hoof pleasure sugar abscess correct hooves plunger summers already corsage houses plural sure ancient couldn't inch poem surgeon angel county's inches poems swap another couple insects poets talk answer courage instead police ten anything cousin iron ponies terror armies danger jealous pony thief's army diamond journey potato thieves' ax diamonds lady's potatoes three axes discover language poultry to baby's does laugh priest today beach dollar laughter priests tomorrow beaches dollars learn promise touch beauty dungeon leisure pull treasure beige early lettuce puppies trouble believe earnest life puppy trucks bench earth lilies quiet two benches echo lily quotient typists blood eight linger rabbis uncles boss elf lives range union bosses elves loss ranger valley brother enough losses ready valleys built extra machine reindeer view bullet farmers man's relief village bureau feather measure remove villages bushel finger men's rhythm warm butcher five mercies rural was calf flood mercy says wash camel floor mice's scarf watch camels for minute scarves water canaries four mirror schedule welcome canary freight mother school wife candies front mouse's scissors winters candy glass navy's search witches canoe glasses niece serious wives canoes glories nine seven wolf's caravan glory ocean shield wolves carry greater oceans should woman's chalk guard once shoulder woman cheese guess one shovel women's cheeses guide other six wonder child gypsies outdoor ski word chimney half oven someone workman chimneys harbors ox's source worth chorus haste oxen's squad wrong choruses health period squat yacht circuit healthy pierce statue yield cities heaven pint stomach zero comfort heavy plague stranger",
	hard: 'abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buzzard buzzing buzzwords cobweb croquet crypt cycle disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled funny gabby galaxy galvanize gazebo gizmo glow glyph gnarly gnostic gossip grogginess haiku haphazard hyphen icebox injury ivory ivy jackpot jawbreaker jaywalk jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole kilobyte kiosk kitsch kiwifruit klutz knapsack lengths lucky luxury marquee matrix megahertz microwave mnemonic mystify nightclub nowadays oxidize oxygen pajama phlegm pixel pizazz polka psyche puppy puzzling quartz queue quip quiz quizzes razzmatazz rhythm scratch snazzy squawk staff strength stretch stronghold stymie subway swivel syndrome thrift thumb topaz transcript transgress transplant twelfth unknown unzip vaporize voodoo vortex walkway waltz wave wavy waxy well whomever witch wizard wristwatch xylophone yacht youthful yummy zigzag zilch zipper zodiac zombie'
};

for (let listName in wordLists) {
	wordLists[listName] = wordLists[listName].split(' ');
}

/* PART A0: split the words string into an array, choose a random word */
let words, word, lines, incorrectLetters, wrong, mode;

async function gameLoop() {
	// generate random number between 0 and the number of words in the words array
	let rand = Math.floor(Math.random() * words.length);
	word = words[rand]; // get word from words array
	words.splice(rand, 1);
	log(word); // log the word in the console for testing

	/* PART A1: make an array with a line for each letter in the word */
	// Example word: 'quiz'
	// lines -> ['_', '_', '_', '_']
	lines = '_'.repeat(word.length).split('');

	wrong = 0;
	incorrectLetters = [];

	/* PART A3: make the game loop, don't use the hangman until part B */
	while (lines.includes('_') && wrong < hangman.length) {
		/* PART B: display the hangman in the prompt */
		let msg = hangman[wrong] + '\n\n' + lines.join(' ');

		if (incorrectLetters.length > 0) {
			msg += '\n\n' + incorrectLetters.join(', ');
		}

		// guess is the letter or word the user entered
		let guess = await prompt(msg);
		if (guess == null) {
			selectScreen();
			return;
		}
		guess = guess.toLowerCase();
		let isCorrect = false;

		// test if the guess is a whole word, not just one letter
		if (guess == word.toLowerCase()) {
			break; // if guess matches word the user won, end loop
		}

		let i = 0;
		while (i < lines.length) {
			// the next letter in the word
			let letter = word[i];
			if (letter.toLowerCase() == guess) {
				lines[i] = letter;
				isCorrect = true;
			}
			i++;
		}

		if (!isCorrect) {
			if (guess.length == 1) incorrectLetters.push(guess);
			wrong++;
		}
	}

	if (wrong < hangman.length) {
		await alert('You got it! The word was "' + word + '"');
	} else {
		await alert('You ran out of attempts. The word was "' + word + '"');
	}

	if (words.length > 0) {
		gameLoop();
	} else {
		await alert("That's all the words in this list! Thanks for playing!");
		selectScreen();
	}
}

async function selectScreen() {
	await erase();

	let description = 'Save the hangman by guessing which letters occur in a word!';
	await text(description, 2, 2, 36);

	await text('*'.repeat(38), 5, 1);

	await text('Select a words list:', 7, 2);

	{
		let i = 0;
		for (let listName in wordLists) {
			let wordList = wordLists[listName];
			let sel = '  ' + wordList.length.toString().padStart(4, '0') + ' ' + listName;
			button(sel.padEnd(38), 9 + i, 1, async () => {
				await erase();
				startGame(listName);
			});
			i++;
		}
	}

	await text('*'.repeat(38), 19, 1);

	upload('  Upload a word list!'.padEnd(38), 21, 1, 'text', loadWordList);
}

function loadWordList(file) {
	let name = file.name.split('.')[0];
	wordLists[name] = file.data.split(' ');
	selectScreen();
}

async function startGame(listName) {
	words = [...wordLists[listName]];
	await alert('You selected the ' + listName + ' words list.\n\nGood luck!');
	gameLoop();
}

selectScreen();
