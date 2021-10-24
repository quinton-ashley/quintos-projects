const title = `
TTTTT IIIII   CCC
  T     I    C
  T     I    C
  T     I    C
  T   IIIII   CCC

TTTTT  AAA    CCC
  T   A   A  C
  T   AAAAA  C
  T   A   A  C
  T   A   A   CCC

TTTTT  OOO   EEEE
  T   O   O  E
  T   O   O  EEE
  T   O   O  E
  T    OOO   EEEE`.slice(1);

pc.text(title, 5, 6);

const bigSpace = '        \n'.repeat(7);

const bigO = `
 OOOOOO
OO    OO
OO    OO
OO    OO
OO    OO
OO    OO
 OOOOOO`.slice(1); // slice off the first newline character

const bigX = `
XX    XX
 XX  XX
  XXXX
   XX
  XXXX
 XX  XX
XX    XX`.slice(1);

const gridX = 26;
const gridY = 3;

/* PART A: finish the grid of 9x8 spaces */
pc.text('─'.repeat(26), gridX, gridY + 7);
pc.text('─'.repeat(26), gridX, gridY + 15); // draw another horizontal line

for (let y = gridY; y < gridY + 23; y++) {
	pc.text('│', gridX + 8, y);
	pc.text('│', gridX + 17, y); // draw another vertical line
}

// board stores the game data
// in a two dimensional array of spaces
let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' ']
];

let turnX = true;
let scoreX = 0;
let scoreO = 0;
let gameMode;
let aiLevel = 0;
let challengeMode = false;

function displayAiLevel() {
	if (aiLevel == 0) {
		pc.text('AI Level: Easy', 55, 10);
	} else if (aiLevel == 1) {
		pc.text('AI Level: Medium', 55, 10);
	} else {
		pc.text('AI Level: Hard  ', 55, 10);
	}
}

function displayTurn() {
	if (turnX) {
		pc.text("X's turn!", 55, 4);
	} else {
		pc.text("O's turn!", 55, 4);
	}
}

function displayScore() {
	pc.text("Player X's Score: " + scoreX, 55, 6);
	pc.text("Player O's Score: " + scoreO, 55, 8);
}

function checkWinner(mark) {
	// checks all horizontal rows and vertical columns
	for (let i = 0; i < 3; i++) {
		if (board[i][0] == mark && board[i][1] == mark && board[i][2] == mark) {
			return true;
		}

		if (board[0][i] == mark && board[1][i] == mark && board[2][i] == mark) {
			return true;
		}
	}
	// check diagonals
	if (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
		return true;
	}
	if (board[0][2] == mark && board[1][1] == mark && board[2][0] == mark) {
		return true;
	}
	// no winner found
	return false;
}

function checkDraw() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] == ' ') {
				return false;
			}
		}
	}
	return true;
}

async function startNewGame() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			board[row][col] = ' ';
			let x = gridX + col * 9;
			let y = gridY + row * 8;
			await pc.text(bigSpace, x, y);
		}
	}
}

function aiTurn() {
	if (aiLevel == 2) {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				if (board[row][col] == ' ') {
					// offense, if o would win, o should go there
					board[row][col] = 'O';
					if (checkWinner('O') == true) {
						board[row][col] = ' ';
						takeTurn(row, col);
						return;
					} else {
						board[row][col] = ' ';
					}

					// defense, if x would win, o should go there
					board[row][col] = 'X';
					if (checkWinner('X') == true) {
						board[row][col] = ' ';
						takeTurn(row, col);
						return;
					} else {
						board[row][col] = ' ';
					}
				}
			}
		}
	}

	if (aiLevel >= 1) {
		let avail = [];
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				if (board[row][col] == ' ') {
					avail.push([row, col]);
				}
			}
		}
		log(avail);
		let idx = Math.floor(Math.random() * avail.length);
		let coord = avail[idx];
		takeTurn(coord[0], coord[1]);
		return;
	}

	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] == ' ') {
				takeTurn(row, col);
				return;
			}
		}
	}
}

async function takeTurn(row, col) {
	console.log('You clicked button ' + row + ' ' + col);

	if (board[row][col] != ' ') {
		await pc.alert('Occupied space', 55, 20, 23);
	} else {
		let x = gridX + col * 9;
		let y = gridY + row * 8;

		let mark;
		if (turnX == true) {
			pc.text(bigX, x, y);
			mark = 'X';
		} else {
			pc.text(bigO, x, y);
			mark = 'O';
		}
		board[row][col] = mark;
		console.log(board[0] + '\n' + board[1] + '\n' + board[2]);

		if (checkWinner(mark) == true) {
			await pc.alert('You won Player ' + mark + '!', 55, 20, 23);
			if (turnX == true) {
				scoreX++;
				if (challengeMode == true) {
					aiLevel++;
					displayAiLevel();
				}
			} else {
				scoreO++;
			}
			displayScore();
			await startNewGame();
		}
		if (checkDraw() == true) {
			await pc.alert('Draw.', 55, 20, 23);
			await startNewGame();
		}
		turnX = !turnX;

		displayTurn();

		if (gameMode == 'AI' && turnX == false) {
			aiTurn();
		}
	}
}

async function startGame() {
	await pc.eraseRect(55, 11, 10, 15);

	/* PART A: Make the buttons in the grid */
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			pc.button(bigSpace, gridX + col * 9, gridY + row * 8, () => {
				takeTurn(row, col);
			});
		}
	}

	displayAiLevel();
	displayScore();

	turnX = Math.random() < 0.5;

	if (gameMode == 'AI' && turnX == false) {
		aiTurn();
	}
}

pc.button('One Player Start', 55, 13, async () => {
	await pc.eraseRect(55, 13, 1, 3);
	gameMode = 'AI';
	pc.button('Easy', 55, 11, () => {
		aiLevel = 0;
		startGame();
	});
	pc.button('Medium', 55, 13, () => {
		aiLevel = 1;
		startGame();
	});
	pc.button('Hard', 55, 15, () => {
		aiLevel = 2;
		startGame();
	});
	pc.button('Challenge Mode', 55, 17, () => {
		challengeMode = true;
		aiLevel = 0;
		startGame();
	});
});

pc.button('Two Player Start', 55, 15, () => {
	gameMode = 'Person';
	startGame();
});
