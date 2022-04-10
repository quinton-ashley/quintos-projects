let dictionary = [];
let words = [];
let board = [
	[' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ']
];
let turn = 0;
let word;

async function loadGame() {
	let wordsList = await (await fetch(QuintOS.dir + '/words5.txt')).text();
	words = wordsList.split('\n');

	let dict = await (await fetch(QuintOS.dir + '/dictionary5.txt')).text();
	for (let line of dict.split('\n')) {
		dictionary.push(...line.split(' '));
	}

	startGame();
}

loadGame();

function displayBoxes(guess) {
	erase();
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 5; j++) {
			let row = 3 + i * 3;
			let col = 2 + j * 3;

			let letter = board[i][j];
			let style = 'solid';

			if (word[j] == letter) {
				style = 'dashed';
			} else if (word.includes(letter)) {
				style = 'outline';
			}

			textRect(row, col, 3, 3, style);
			text(letter, row + 1, col + 1);
		}
	}
}

async function startGame() {
	/* pick new random word */
	let rand = Math.floor(Math.random() * words.length);

	word = words.splice(rand, 1)[0];

	displayBoxes('');

	for (let turn = 0; turn < 6; turn++) {
		let msg = 'Guess the word!';
		let guess = await prompt(msg, 3, 18, 20);
		guess = guess.toUpperCase();
		if (guess.length != 5 || dictionary.indexOf(guess) == -1) {
			await alert('Your guess must be a five letter word!', 3, 18, 20);
			turn--;
			continue;
		}
		board[turn] = guess.split('');
		displayBoxes(guess);
		if (guess == word) {
			await alert('You won!', 3, 18, 20);
			board = [];
			for (let i = 0; i < 6; i++) {
				board[i] = ' '.repeat(5).split('');
			}
			startGame();
			return;
		}
	}
}
