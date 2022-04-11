let dictionary = [];
let words = [];
let board = (' '.repeat(5) + '|').repeat(6).slice(0, -1).split('|');
let turn = 0;
let word;

async function loadGame() {
	let wordsList = await (await fetch(QuintOS.dir + '/words5.txt')).text();
	words = wordsList.split('\n');

	let dict = await (await fetch(QuintOS.dir + '/dictionary5.txt')).text();
	for (let line of dict.split('\n')) {
		dictionary.push(...line.split(' '));
	}

	displayInfo();
	startGame();
}

loadGame();

function displayInfo() {
	let row = 9;
	textRect(row, 19, 3, 3, 'solid');
	text('letter is not found in word', row + 1, 24);
	row += 4;
	textRect(row, 19, 3, 3, 'outline');
	text('letter is in the word', row + 1, 24);
	row += 4;
	textRect(row, 19, 3, 3, 'dashed');
	text('letter is in the correct position in the word', row, 24, 14);
}

function displayBoxes(guess) {
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

	await eraseRect(2, 2, 16, 20);
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
		board[turn] = guess;
		await eraseRect(2, 2, 16, 20);
		displayBoxes(guess);
		if (guess == word) {
			await alert('You won!', 3, 18, 20);
			board = (' '.repeat(5) + '|').repeat(6).slice(0, -1).split('|');
			startGame();
			return;
		}
	}
}
