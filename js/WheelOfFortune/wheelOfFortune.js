let categories = {
	'Fun & Games':
		'Competitive Shuffleboard|Neighborhood Get-Together|Skateboards & Rollerblades|Snowshoeing & Snowboarding|Ice-Carving Competition|Snowbiking & Airboarding|City-Center Horseraces|Hamletscenen Festival|Lion-Dance Competition|Snowboarding & Sledding|Traditional Macaroons|Building Sandcastles|Festive Celebrations|Fingerprints Drawing|RC Airplane Racing|Alpine Snowboarding|Contestant Searches|Festive Celebration|Freestyle Wrestling|Interactive Puzzles|Mini-Golf Tournament|Playing Racquetball|Back-Road Bicycling|Complicated Puzzle|Fast-Pitch Softball|Freshwater Fishing|Outdoor Recreation|Playing Backgammon|Playing Pictionary|Water Balloon Fight|Weeklong Festivals|Chess Competition|Crossword Puzzles|Equestrian Sports|Football & Baseball|Going Parasailing|Halloween Hayride|Indoor Volleyball|Juggling Beanbags|Medieval Festival|Playing Asteroids|Playing Hopscotch|Playing Solitaire|Pothole Exploring|Softball & Baseball|Two-Story Carousel|Wheelbarrow Races|Adventure Racing|Ballroom Dancing|Beach Volleyball|Childhood Heroes|Christmas Crafts|Demolition Derby|Doing Handstands|Dungeons & Dragons|Fraternity Prank|Fun Brainteasers|Gorgeous Fishing|Habanos Festival|Hula Competition|Indoor Go-Carting|Inflatable Slide|Japanese Archery|Knock-Knock Jokes|Narrated Cruises|Ping-Pong Paddles|Playing Dominoes|Playing Jeopardy!|Playing Lacrosse|Playing Peekaboo|Playing Scrabble|Potato-Sack Races|Riding Piggyback|Spitting Contest|Street Carnivals|Twenty Questions|Urban Spelunking|Wheelbarrow Race|Amazing History|Anderlecht Fair|Big-Wave Surfing|Boggle & Scrabble|Burping Contest|Community Chest|Country Dancing|Croquet Mallets|Downhill Skiing|Dragon-Boat Race|Family Cookouts|Gaelic Football'.split(
			'|'
		)
};

let board = [];
let score = 0;
let emptyBoxes, phrase, words, buzzed, phrases;

let bigBuzzer = `
|⎺|__  _   _ ___________ _ __
| '_ \\| | | |_  /_  / _ \\ '__|
| |_) | |_| |/ / / /  __/ |
|_.__/ \\__,_/___/___\\___|_|`.slice(1);

function displayScore() {
	txt('Score: ' + score, 23, 14);
}

async function pickNewPhrase() {
	await erase();

	displayScore();

	let category = selectedCategory;

	if (selectedCategory == 'Shuffle!') {
		let cats = Object.keys(categories);
		category = cats[Math.floor(Math.random() * cats.length)];
	}

	txt('The category is ' + category, 2, 2);

	let phrases = categories[category];
	phrase = phrases[Math.floor(Math.random() * phrases.length)];
	words = phrase.split(' ');
	log(words);

	board = [];

	emptyBoxes = 0;
	/* Display all the boxes */
	for (let i = 0; i < words.length; i++) {
		let word = words[i];
		board.push([]);
		for (let j = 0; j < word.length; j++) {
			let character = word[j];
			if (character != '-' && character != '&') {
				board[i].push(' ');
				emptyBoxes++;
			} else {
				board[i].push(character);
				txt(character, 5 + i * 3, 3 + j * 3);
			}
			txtRect(4 + i * 3, 2 + j * 3, 3, 3);
		}
	}

	/* Create the buzzer button */
	buzzed = false;
	button(bigBuzzer, 24, 12, buzz);
	addLetter();
}

async function buzz() {
	buzzed = true;
	let guess = await prompt('Guess the phrase:', 24);

	if (typeof guess == 'string' && guess.toLowerCase() == phrase.toLowerCase()) {
		score += emptyBoxes;
		displayScore();
		await alert('Correct!', 24);
		pickNewPhrase();
	} else {
		score -= 3;
		displayScore();
		await alert('Wrong! Try again.', 24);
		buzzed = false;
		button(bigBuzzer, 24, 5, buzz);
		addLetter();
	}
}

async function gameOver() {
	score -= 3;
	displayScore();
	await alert('Out of time! The phrase was "' + phrase + '"', 23);
	pickNewPhrase();
}

/* Add a letter to a random empty box */
async function addLetter() {
	if (emptyBoxes <= 0) {
		gameOver();
		return;
	}

	if (buzzed) return;

	let rand = Math.ceil(Math.random() * emptyBoxes);
	let emptyBoxCount = 0;

	for (let i = 0; i < words.length; i++) {
		let word = words[i];
		for (let j = 0; j < word.length; j++) {
			if (board[i][j] == ' ') {
				emptyBoxCount++;
				if (emptyBoxCount != rand) continue;

				board[i][j] = words[i][j];
				txt(words[i][j], 5 + i * 3, 3 + j * 3);
				emptyBoxes--;
				await delay(1250);
				addLetter();
				return;
			}
		}
	}
}

async function selectScreen() {
	await erase();

	let description = 'Guess the phrase as quick as you can! Select a Category:';
	await txt(description, 2, 2);

	let cats = Object.keys(categories);
	cats.push('Shuffle!');
	let w = 25;
	let rows = 12;
	for (let i = 0; i < cats.length; i++) {
		let categoryName = cats[i];
		button(categoryName.padEnd(w - 1), 4 + (i % rows) * 2, 2 + w * floor(i / rows), async () => {
			await erase();
			selectedCategory = categoryName;
			await alert('You selected "' + selectedCategory + '".\n\nGood luck!');
			pickNewPhrase();
		});
	}
}

async function setup() {
	// source: https://gist.github.com/michaelmotzkus/de82e06c8538399909103108049788b9
	Object.assign(categories, await (await fetch(QuintOS.dir + '/categories.json')).json());
	selectScreen();
}
