let dictionary = [];
let words = [];
let turn = 0;
let board, word;
let score = 0;
let total = 0;
let distribution = [0, 0, 0, 0, 0, 0];

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
	let row = 10;
	textRect(row, 20, 3, 3, 'solid');
	text('letter is not found in word', row, 24);
	row += 3;
	textRect(row, 20, 3, 3, 'outline');
	text('letter is in the word', row, 24);
	row += 3;
	textRect(row, 20, 3, 3, 'dashed');
	text('letter is in the correct position', row, 24, 14);
}

function displayBoxes(guess) {
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 5; j++) {
			let row = 2 + i * 3;
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

function displayScore() {
	str = '|' + score + '/' + total;
	for (let i = 0; i < 6; i++) {
		str += `|${i + 1}:${distribution[i]}`;
	}
	text(str + '|', 21, 2);
}

async function startGame() {
	displayScore();
	board = (' '.repeat(5) + '|').repeat(6).slice(0, -1).split('|');
	/* pick new random word */
	let rand = Math.floor(Math.random() * words.length);

	word = words.splice(rand, 1)[0];
	total++;

	await eraseRect(2, 2, 16, 18);
	displayBoxes('');

	for (let turn = 0; turn < 6; turn++) {
		let guess = await prompt('Guess the word!', 2, 18, 20);
		guess = guess.toUpperCase();
		if (guess.length != 5 || !dictionary.includes(guess)) {
			await alert('Must be a five letter word!', 3, 18, 20);
			turn--;
			continue;
		}
		board[turn] = guess;
		await eraseRect(2, 2, 16, 18);
		displayBoxes(guess);
		if (guess == word) {
			await alert('You won!', 3, 18, 20);
			score++;
			distribution[turn]++;
			startGame();
			return;
		}
	}
	await alert('You lost! The word was ' + word, 3, 18, 20);
	startGame();
}
