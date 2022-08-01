let loading = true;

let board = [];
let levelNum = 0;
let inGame = false;
let didWin = false;

let moves = [];

let levelSet;

async function loadMenu() {
	player.steps = 0;
	resetBoard();
	displayLevel();
	levelNum = await prompt('Select level (0-110): ', 9, 7, 26);
	if (!levelNum) levelNum = 0;
	moves = [levelSet.levels[levelNum]];
	loadLevel(levelSet.levels[levelNum]);
	displayLevel();
	displaySteps();
}

async function loadGame() {
	levelSet = await (await fetch(QuintOS.dir + '/levels.json')).json();
	loadMenu();
}

loadGame();

function undo() {
	if (moves.length <= 1) {
		return;
	}
	player.steps--;
	resetBoard();
	moves.pop();
	loadLevel(moves[moves.length - 1], true); // load it again
}

function reset() {
	player.steps = 0;
	moves = [levelSet.levels[levelNum]];
	resetBoard();
	loadLevel(levelSet.levels[levelNum], true); // load it again
}

button('Undo', 2, 24, undo);

button('Reset', 2, 29, reset);

button('Menu', 2, 35, loadMenu);

function displayLevel() {
	text('level ' + ('' + levelNum).padStart(3, '0'), 2, 0);
}

function displaySteps() {
	text('steps ' + ('' + player.steps).padStart(3, '0'), 2, 10);
}

let objects = [];

function loadLevel(level, doReset) {
	level = level.slice(0, -1).split('\n');
	for (let row = 0; row < level.length; row++) {
		board.push(level[row].split(''));
	}

	let objectNum = 0;
	if (!doReset) objects = [];

	for (let y = 0; y < board.length; y++) {
		for (let x = 0; x < board[y].length; x++) {
			let t = board[y][x];
			if (t == '#') {
				let img = 'wall-up';

				if (x == 0 && y == 0) {
					img = 'wall-topleft';
				} else if (x == 0 && y == board.length - 1) {
					img = 'wall-bottomleft';
				} else if (x == board[y].length - 1 && y == 0) {
					img = 'wall-topright';
				} else if (x == board[y].length - 1 && y == board.length - 1) {
					img = 'wall-bottomright';
				} else if (x == 0) {
					img = 'wall-left';
				} else if (x == board[y].length - 1) {
					img = 'wall-right';
				} else if (y == board.length - 1) {
					img = 'wall-down';
				} else if (y == 0) {
					img = 'wall-up';
				} else if (doReset) {
					img = objects[objectNum];
					objectNum++;
				} else {
					let num = Math.floor(Math.random() * 15);
					img = 'furniture-' + num;
					objects.push(img);
				}
				new walls.Sprite(img, x, y);
			}
			if (t == '$' || t == '*') {
				new boxes.Sprite('box', x, y);
				// box.setCollider('rectangle', 0, 0, box.height * 0.5, box.height * 0.5);
			}
			if (t == '.' || t == '*' || t == '+') {
				new goals.Sprite('goal', x, y);
			}
			if (t == '@' || t == '+') {
				player.x = x;
				player.y = y;
			}
		}
	}

	inGame = true;
}

function resetBoard() {
	displaySteps();
	walls.removeSprites();
	boxes.removeSprites();
	goals.removeSprites();
	board = [];
}

function keyPressed() {
	if (player.isMoving) return;

	if (key == 'u') {
		undo();
	} else if (key == 'r') {
		reset();
	} else if (key == 'm') {
		loadMenu();
	} else if (key === 'ArrowUp') {
		player.walk('up');
	} else if (key === 'ArrowDown') {
		player.walk('down');
	} else if (key === 'ArrowLeft') {
		player.walk('left');
	} else if (key === 'ArrowRight') {
		player.walk('right');
	}
}

function displayBoard() {
	let str = '';
	for (let row = 0; row < board.length; row++) {
		str += board[row].join('') + '\n';
	}
	log(str);
	return str;
}

function moveOnBoard(row, col) {
	board[row][col] = '@';

	// if the player is on any goal tile, make it a + sign
	// to indicate that
	for (let i = 0; i < goals.length; i++) {
		let goal = goals[i];
		if (goal.y == row && goal.x == col) {
			board[row][col] = '+';
		}
	}
}

function moveBox(r1, c1, r2, c2) {
	if (board[r1][c1] != '$' && board[r1][c1] != '*') {
		return null; // there is no box to move
	} else if (board[r2][c2] != '#' && board[r2][c2] != '$' && board[r2][c2] != '*') {
		board[r2][c2] = '$';
		for (let i = 0; i < goals.length; i++) {
			let goal = goals[i];
			if (goal.y == r2 && goal.x == c2) {
				board[r2][c2] = '*';
			}
		}
		return true; // box can be moved
	}
	return false; // the player is not able to push the box
}

player.walk = async function (direction) {
	let r = player.y;
	let c = player.x;

	let aniName = 'walk-' + direction;
	if (direction == 'left' || direction == 'right') {
		aniName = 'walk-lr';
	}

	let canMoveBox;
	if (inGame) {
		// prevent player from moving if they try to move into a wall
		if (direction == 'up') {
			if (board[r - 1][c] == '#') return;
			canMoveBox = moveBox(r - 1, c, r - 2, c);
		} else if (direction == 'down') {
			if (board[r + 1][c] == '#') return;
			canMoveBox = moveBox(r + 1, c, r + 2, c);
		} else if (direction == 'left') {
			if (board[r][c - 1] == '#') return;
			canMoveBox = moveBox(r, c - 1, r, c - 2);
		} else if (direction == 'right') {
			if (board[r][c + 1] == '#') return;
			canMoveBox = moveBox(r, c + 1, r, c + 2);
		}
		if (canMoveBox == false) return;

		if (canMoveBox) aniName = 'push' + aniName.slice(4);

		if (board[player.y][player.x] == '+') {
			board[player.y][player.x] = '.';
		} else {
			board[player.y][player.x] = ' ';
		}
		if (direction == 'up') {
			moveOnBoard(player.y - 1, player.x);
		} else if (direction == 'down') {
			moveOnBoard(player.y + 1, player.x);
		} else if (direction == 'left') {
			moveOnBoard(player.y, player.x - 1);
		} else if (direction == 'right') {
			moveOnBoard(player.y, player.x + 1);
		}
		moves.push(displayBoard());

		player.steps++;
		displaySteps();
	}

	// the name of the current animation being used
	let cur = player.getAnimationLabel();

	// player is already walking that way or turning
	// no need to change animation
	if (cur == aniName || cur == 'idle-turn') return;

	if (direction != 'up') {
		player.layer = 1;
		player.ani = aniName;
	} else {
		player.layer = 2;
		// have the player turn before walking upwards
		await player.changeAni('idle-turn');
		player.ani = 'walk-up';
	}

	if (direction == 'left') {
		player.mirrorX = true; // flip the character left
	} else {
		player.mirrorX = false;
	}

	await player.move(direction, 0.05);
	if (inGame && checkWin()) {
		didWin = true;
		player.ani = 'dance';
		await alert('You win!!', 10, 27, 12);
		didWin = false;
		levelNum++;
		displayLevel();
		player.steps = 0;
		displaySteps();
		resetBoard();
		loadLevel(levelSet.levels[levelNum]);
	}
};

player.idle = function () {
	// switch between idle animations
	// some have a higher probability of occurring than others
	async function _idle() {
		let chance = Math.random();

		if (chance > 0.4) {
			await player.changeAni('idle-stand');
		} else if (chance > 0.2) {
			await player.changeAni('idle-blink');
		} else if (chance > 0.1) {
			await player.changeAni('idle-think');
		} else if (chance > 0.05) {
			await player.changeAni('idle-scratch');
		} else {
			await player.changeAni('idle-yawn');
		}
		_idle();
	}

	// the name of the current animation being used
	let cur = this.getAnimationLabel();

	if (cur == 'walk-up' || cur == 'push-up') {
		this.ani = 'idle-turn';
		this.animation.changeFrame(2);
		this.animation.goToFrame(0);
		this.animation.onComplete = () => {
			this.ani = 'idle-stand';
			this.animation.onComplete = _idle;
		};
	} else if (!cur.includes('idle')) {
		this.ani = 'idle-stand';
		this.animation.onComplete = _idle;
	}
};

function checkWin() {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			if (board[i][j] == '.' || board[i][j] == '+') {
				return false;
			}
		}
	}
	return true;
}

loading = false;

function draw() {
	if (loading) return;
	background('#19142b');

	if (!player.isMoving && !didWin) player.idle();

	boxes.snap(player);

	allSprites.debug = mouseIsPressed;
}
