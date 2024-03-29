/**
 * @type Sprite
 */
let player;

/**
 * @type Group
 */
let walls;

/**
 * @type Group
 */
let boxes;

/**
 * @type Group
 */
let goals;

let board = [];
let levelNum = 0;
let inGame = false;
let didWin = false;

let moves = [];

let levelSet;

function preload() {
	world.origin.x = 104;
	world.origin.y = 48;

	allSprites.tileSize = 16;
	allSprites.pixelPerfect = true;
	allSprites.rotationLock = true;
	allSprites.spriteSheet = loadImage('/img/bitBoi/world16.png');
	allSprites.resetAnimationsOnChange = true;

	walls = new Group();
	walls.collider = 'static';
	let atlases = {
		'wall-up': [1, 0],
		'wall-down': [1, 2],
		'wall-left': [0, 1],
		'wall-right': [2, 1],
		'wall-topleft': [0, 0],
		'wall-topright': [2, 0],
		'wall-bottomleft': [0, 2],
		'wall-bottomright': [2, 2],
		fire: { pos: [2, 19], frames: 2, delay: 10 },
		'creature-16': [4, 22],
		'creature-17': [5, 22],
		'creature-18': [6, 22],
		'creature-19': [7, 22],
		'creature-20': { pos: [0, 22], frames: 4, delay: 20 }
	};

	for (let i = 0; i < 16; i++) {
		atlases['creature-' + i] = [i, 10];
	}

	{
		let i = 0;

		for (let x = 13; x < 16; x++) {
			for (let y = 16; y < 21; y++) {
				atlases['furniture-' + i] = [x, y];
				i++;
			}
		}
	}

	walls.addAnis(atlases);

	boxes = new Group();
	boxes.layer = 1;
	boxes.snap = function (o, dist) {
		if (o.isMoving || o.x != o._dest.x || o.y != o._dest.y || !this.isMoving) return;
		dist ??= 1 || this.tileSize * 0.1;
		if (Math.abs(this.x) % 1 >= dist || Math.abs(this.y) % 1 >= dist) {
			return;
		}
		this.vel.x = 0;
		this.vel.y = 0;
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
	};
	// loads the animation for the tile representing the box
	// at row 5, column 0 in the tile sheet
	boxes.addAni('box', [0, 5]);

	/* PART A: Choose a tile to represent the box goal positions on the floor */
	goals = new Group();
	goals.collider = 'none';
	goals.layer = 0;
	goals.addAni('goal', [1, 15]);

	/* PLAYER */

	player = new Sprite();
	player.layer = 1;
	player.spriteSheet = loadImage('/img/bitBoi/bitBoi16.png');

	player.addAnis({
		'idle-stand': { line: 0, frames: 4, delay: 20 },
		'idle-blink': { line: 1, frames: 4, delay: 10 },
		'idle-think': { line: 20, frames: 8, delay: 20 },
		'idle-scratch': { line: 21, frames: 14, delay: 10 },
		'idle-yawn': { line: 22, frames: 2, delay: 60 },
		'idle-turn': { line: 17, frames: 3 },
		'walk-lr': { line: 3, frames: 5, delay: 5 },
		'walk-up': { line: 18, frames: 6 },
		'walk-down': { line: 16, frames: 6 },
		'push-lr': { line: 13, frames: 5 },
		'push-up': { line: 15, frames: 6 },
		'push-down': { line: 14, frames: 6 },
		dance: { line: 2, frames: 4, delay: 6 }
	});
	player.ani = 'idle-stand';

	player.steps = 0;
}

async function loadMenu() {
	levelSet ??= await (await fetch(QuintOS.dir + '/levels.json')).json();

	player.steps = 0;
	player.x = 0;
	player.y = 0;
	resetBoard();
	displayLevel();
	levelNum = await prompt('Select level (0-110): ', 9, 7, 26);
	if (!levelNum) levelNum = 0;
	moves = [levelSet.levels[levelNum]];
	loadLevel(levelSet.levels[levelNum]);
	displayLevel();
	displaySteps();
}

function setup() {
	boxes.w = 0.5;
	boxes.h = 0.5;

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

		// player is already walking that way or turning
		// no need to change animation
		if (player.ani == aniName || player.ani == 'idle-turn') return;

		if (direction != 'up') {
			player.layer = 1;
			player.ani = aniName;
		} else {
			player.layer = 2;
			// have the player turn before walking upwards
			player.ani = 'idle-turn';
			await player.ani.play();
			player.ani = 'walk-up';
		}

		if (direction == 'left') {
			player.mirror.x = true; // flip the character left
		} else {
			player.mirror.x = false;
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
			let chance = random();

			if (chance > 0.4) {
				player.ani = 'idle-stand';
			} else if (chance > 0.2) {
				player.ani = 'idle-blink';
			} else if (chance > 0.1) {
				player.ani = 'idle-think';
			} else if (chance > 0.05) {
				player.ani = 'idle-scratch';
			} else {
				player.ani = 'idle-yawn';
			}
			await player.ani.play();
			_idle();
		}

		if (player.ani == 'walk-up' || player.ani == 'push-up') {
			player.ani = 'idle-turn';
			player.ani.frame = 2;
			player.ani.rewind();
			player.ani.onComplete = () => {
				player.ani = 'idle-stand';
				player.ani.onComplete = _idle;
			};
		} else if (!player.ani.name.includes('idle')) {
			player.ani = 'idle-stand';
			player.ani.onComplete = _idle;
		}
	};

	button('Undo', 2, 24, undo);

	button('Reset', 2, 29, reset);

	button('Menu', 2, 35, loadMenu);

	loadMenu();
}

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

function displayLevel() {
	txt('level ' + ('' + levelNum).padStart(3, '0'), 2, 0);
}

function displaySteps() {
	txt('steps ' + ('' + player.steps).padStart(3, '0'), 2, 10);
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
				new boxes.Sprite(x, y);
			}
			if (t == '.' || t == '*' || t == '+') {
				new goals.Sprite(x, y);
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
	walls.removeAll();
	boxes.removeAll();
	goals.removeAll();
	board = [];
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

function draw() {
	background('#19142b');

	if (!player.isMoving && !didWin) player.idle();

	for (let box of boxes) {
		box.snap(player);
	}

	if (player.isMoving) return;

	if (kb.presses('u')) {
		undo();
	} else if (kb.presses('r')) {
		reset();
	} else if (kb.presses('m')) {
		loadMenu();
	} else if (kb.presses('up')) {
		player.walk('up');
	} else if (kb.presses('down')) {
		player.walk('down');
	} else if (kb.presses('left')) {
		player.walk('left');
	} else if (kb.presses('right')) {
		player.walk('right');
	}
}
