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

const gridRow = 3;
const gridCol = 26;

// board stores the game data
// in a two dimensional array of spaces
let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' ']
];

let scoreX = 0;
let scoreO = 0;
let turnX, preventMoves;

function displayTurn() {
	if (turnX) text("X's turn!", 4, 55);
	else text("O's turn!", 4, 55);
}

function displayScore() {
	text("Player X's Score: " + scoreX, 6, 55);
	text("Player O's Score: " + scoreO, 8, 55);
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

async function takeTurn(row, col) {
	log('You clicked button ' + row + ' ' + col);

	if (board[row][col] != ' ') {
		preventMoves = true;
		await alert('That space is already taken!\n\nYou must choose another.', 18, 55, 23);
		preventMoves = false;
		return;
	}
	if (preventMoves) return;

	let r = gridRow + row * 8;
	let c = gridCol + col * 9;

	let mark;
	if (turnX) {
		text(bigX, r, c);
		mark = 'X';
	} else {
		text(bigO, r, c);
		mark = 'O';
	}
	board[row][col] = mark;
	log(board[0] + '\n' + board[1] + '\n' + board[2]);

	if (checkWinner(mark)) {
		if (turnX) {
			scoreX++;
		} else {
			scoreO++;
		}
		displayScore();
		preventMoves = true;
		await alert('You won Player ' + mark + '!', 20, 55, 23);
		turnX = !turnX;
		displayTurn();
		await startNewGame();
		return;
	}
	if (checkDraw()) {
		preventMoves = true;
		await alert('Draw.', 20, 55, 23);
		turnX = Math.random() < 0.5;
		displayTurn();
		await startNewGame();
		return;
	}

	turnX = !turnX;
	displayTurn();
}

async function startNewGame() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			board[row][col] = ' ';
			let r = gridRow + row * 8;
			let c = gridCol + col * 9;
			await text(bigSpace, r, c);
		}
	}
	preventMoves = false;
}

async function startGame() {
	text(title, 6, 6);

	/* PART A: finish the grid of 9x8 spaces */
	text('─'.repeat(26), gridRow + 7, gridCol);
	text('─'.repeat(26), gridRow + 15, gridCol); // draw another horizontal line

	for (let row = gridRow; row < gridRow + 23; row++) {
		text('│', row, gridCol + 8);
		text('│', row, gridCol + 17); // draw another vertical line
	}

	/* PART A: Make the buttons in the grid */
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			button(bigSpace, gridRow + row * 8, gridCol + col * 9, () => {
				takeTurn(row, col);
			});
		}
	}

	displayTurn();
	displayScore();
	preventMoves = false;
}

startGame();
