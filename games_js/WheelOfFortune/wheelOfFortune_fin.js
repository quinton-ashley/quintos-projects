// the category is "Fun and Games"
let phrases =
	'Competitive Shuffleboard|Neighborhood Get-Together|Photography & Scrapbooking|Skateboards & Rollerblades|Snowshoeing & Snowboarding|Skateboard & Rollerblades|Afterschool Activities|Ice-Carving Competition|Mixologist Competition|Snowbiking & Airboarding|Big-Ticket Attractions|City-Center Horseraces|Halloween Festivities|Hamletscenen Festival|Lion-Dance Competition|Snowboarding & Sledding|Spontaneous Nightlife|Traditional Macaroons|Battleship Destroyer|Building Sandcastles|Carnival Attractions|Festive Celebrations|Fingerprint Drawings|Fingerprints Drawing|Handball & Racquetball|Hurling Championship|Renaissance Festival|Alpine Snowboarding|Charades & Pictionary|Contestant Searches|Festive Celebration|Five-Gallon Stockpot|Freestyle Wrestling|Frisbee Competition|Interactive Puzzles|Marshmallow Animals|Mini-Golf Tournament|Playing Racquetball|Rhythmic Gymnastics|Sled-Pulling Contest|Yuletide Activities|Back-Road Bicycling|Balance-Beam Tricks|Complicated Puzzle|Computer Solitaire|Fast-Pitch Softball|Festive Activities|Freshwater Fishing|Gymnastics Routine|Outdoor Recreation|Playful Activities|Playing Backgammon|Playing Horseshoes|Playing Pictionary|Table Shuffleboard|Weeklong Festivals|Baseball & Softball|Chess Competition|Collectible Dolls|Crossword Puzzles|Cultural Festival|Equestrian Sports|Filmmaking Genius|Football & Baseball|Football Practice|Going Parasailing|Goldfish Scooping|Halloween Hayride|Hot-Air Ballooning|Indoor Volleyball|Jovial Sing-Alongs|Juggling Beanbags|Late-Night Hayride|Medieval Festival|Miniature Golfing|Playing Asteroids|Playing Badminton|Playing Hopscotch|Playing Paintball|Playing Solitaire|Playing Tic-Tac-Toe|Pothole Exploring|Riverside Camping|Softball & Baseball|Tag-Team Wrestling|Two-Story Carousel|Wheelbarrow Races|Writing Limericks|Adventure Racing|Alphabet Magnets|Ballroom Dancing|Barbeque Bonanza|Beach Volleyball|Biggie Boardings|Childhood Heroes|Chinese Checkers|Christmas Crafts|Crossword Puzzle|Demolition Derby|Disappearing Ink|Doing Handstands|Double-Coin Trick|Dungeons & Dragons|Fantasy Football|Fraternity Prank|Freestyle Skiing|Fun Brainteasers|Going Spelunking|Gorgeous Fishing|Gorgeous Golfing|Habanos Festival|Headband Antlers|Hula Competition|Hula-Hoop Contest|Indoor Go-Carting|Indoor Go-Karting|Inflatable Slide|Interactive Toys|Japanese Archery|Juggling Oranges|Knock-Knock Jokes|Masquerade Balls|Narrated Cruises|Paper Snowflakes|Ping-Pong Paddles|Playing Checkers|Playing Dominoes|Playing Jeopardy|Playing Jeopardy!|Playing Kickball|Playing Lacrosse|Playing Monopoly|Playing Peekaboo|Playing Ping-Pong|Playing Scrabble|Popcorn Garlands|Potato-Sack Races|Renaissance Fair|Riding Piggyback|Shooting Marbles|Spitting Contest|Sprint-Car Racing|Street Carnivals|Swim-Up Blackjack|Twenty Questions|Ultimate Frisbee|Urban Spelunking|Volleyball Match|Wheelbarrow Race|Winter Carnivals|Amazing History|Amusement Rides|Anderlecht Fair|Balloon Animals|Big-Wave Surfing|Board-Game Night|Boggle & Scrabble|Boogie Boarding|Burping Contest|Classic Yahtzee|Community Chest|Confetti Cannon|Country Dancing|Cricket & Croquet|Croquet Mallets|Deep-Sea Fishing|Downhill Skiing|Downhill Slalom|Dragon-Boat Race|Exciting Rounds|Family Cookouts|Finger Painting|Gaelic Football';

phrases = phrases.split('|');

// generate random number between 0 and the length of the the words array
let random = Math.floor(Math.random() * phrases.length);
// our chooosen word
let phrase = phrases[random];
phrase = phrase.split(' ');
log(phrase); // don't look! no cheating! jk ;P

// Example phrase: ['Community', 'Chest']
// board -> [
//   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
//   [' ', ' ', ' ', ' ', ' ']
// ]

let board = [];

// word.length is the number of letters in the word
for (let i = 0; i < phrase.length; i++) {
	let word = phrase[i];
	board.push([]);
	for (let j = 0; j < word.length; j++) {
		board[i].push(' '); // add something to array
	}
}

/* PART C: make a function to display the boxes */
function displayBoxes() {
	for (let i = 0; i < phrase.length; i++) {
		let word = phrase[i];
		for (let j = 0; j < word.length; j++) {
			textRect(2 + i * 3, 2 + j * 3, 3, 3);
			text(board[i][j], 3 + i * 3, 3 + j * 3);
		}
	}
}

let bigBuzzer = `
|⎺|__  _   _ ___________ _ __
| '_ \\| | | |_  /_  / _ \\ '__|
| |_) | |_| |/ / / /  __/ |
|_.__/ \\__,_/___/___\\___|_|`.slice(1);

async function buzz() {
	buzzed = true;
	// guess is the letter the user entered
	// or a guess of the full word
	let guess = await prompt('', 2, 18);

	// see if the guess matches the phrase
	if (guess == phrase) {
		return;
	}

	buzzed = false;
	button(bigBuzzer, 5, 18, buzz);
	addLetter();
}

button(bigBuzzer, 18, 5, buzz);

let buzzed = false;

/* PART C: add a letter to a random empty box */
async function addLetter() {
	let avail = [];
	for (let i = 0; i < phrase.length; i++) {
		for (let j = 0; j < phrase[i].length; j++) {
			if (board[i][j] == ' ') {
				avail.push([i, j]);
			}
		}
	}

	let rand = Math.floor(Math.random() * avail.length);
	let pick = avail[rand];
	let wordIdx = pick[0];
	let letterIdx = pick[1];
	let letter = phrase[wordIdx][letterIdx];
	board[wordIdx][letterIdx] = letter;
	log(letter);

	displayBoxes();

	await delay(1000);

	if (!buzzed) addLetter();
}

addLetter();
