// screen size: 160x144 pixels
// tile size: 8x8 pixels
// text rows: 18 cols: 20

function preload() {
	eatSound = loadSound(QuintOS.dir + '/sounds/retro_collect_pickup_item_20.wav');
	eatSound.setVolume(0.3);

	crashSound = loadSound(QuintOS.dir + '/sounds/retro_crash_damage_01.wav');
	crashSound.setVolume(0.3);

	moveSounds = [];

	for (let i = 1; i < 10; i++) {
		sound = loadSound(QuintOS.dir + '/sounds/Footstep1__00' + i + '.wav');
		sound.setVolume(0.3);
		moveSounds[i] = sound;
	}

	world.offset.y = 16;

	allSprites.tileSize = 8;
	allSprites.spriteSheet = loadImage(QuintOS.dir + '/img/world.png');

	grass = new Group();
	grass.layer = 0;
	grass.collider = 'none';

	for (let i = 0; i < 10; i++) {
		grass.addAni('grass' + i, [i, 1]);
	}

	eggs = new Group();
	eggs.layer = 2;
	eggs.addAni('egg', [0, 0]);

	pipes = new Group();
	pipes.layer = 1;
	pipes.collider = 'none';
	pipes.addAnis({
		'+': [0, 2],
		'├': [1, 2],
		'-': [2, 2],
		'┤': [3, 2],
		'┬': { pos: [1, 2], rotation: 90 },
		'|': { pos: [2, 2], rotation: 90 },
		'┴': { pos: [3, 2], rotation: 90 },
		'┌': [4, 2],
		'┐': [5, 2],
		'└': [6, 2],
		'┘': [7, 2]
	});

	snake = new Group();
	snake.layer = 3;
	snake.collider = 'none';
	snake.heading = 'up';
	snake.spriteSheet = loadImage(QuintOS.dir + '/img/snakes.png');

	snake.addAnis({
		'head-up': [0, 0],
		'blink-up': [1, 0],
		'head-left': [6, 0],
		'blink-left': [7, 0],
		'eat-up': { pos: [0, 1], frames: 5 },
		'eat-left': { pos: [5, 1], frames: 5 },
		'body-up': { pos: [2, 0], frames: 2, delay: 40 },
		'tail-up': { pos: [4, 0], frames: 2, delay: 40 },
		'body-left': { pos: [8, 0], frames: 2, delay: 40 },
		'tail-left': { pos: [10, 0], frames: 2, delay: 40 },
		curve: { pos: [10, 1], frames: 2, delay: 40 },
		'bodyhalf-up': { pos: [12, 0], frames: 2, delay: 40 },
		'bodyhalf-left': { pos: [12, 1], frames: 2, delay: 40 }
	});

	icons = new Group();
	icons.layer = 1;
	icons.collider = 'none';
	icons.tileSize = 16;
	icons.spriteSheet = loadImage(QuintOS.dir + '/img/icons.png');

	icons.addAnis({
		Normal: [0, 0],
		Reverse: [1, 0]
	});
}

let score = 0; // number of apples eaten
let speed = 0.05; // snake speed

let isGameOver = false;
let reverseMode = false;

let tailIndex = 2;
let curves = [];
let inputDirection = 'up';
let egg;

function setup() {
	icons.tileSize = 8;

	for (let i = 0; i < 15; i++) {
		for (let j = 0; j < 20; j++) {
			let rand = Math.floor(Math.random() * 9);
			new grass.Sprite('grass' + rand, j, i);
		}
	}

	createTiles([
		'┌├----------------┤┐',
		'┬                  ┬',
		'|                  |',
		'|                  |',
		'|                  |',
		'|                  |',
		'|                  |',
		'|                  |',
		'|                  |',
		'|                  |',
		'|                  |',
		'|                  |',
		'|                  |',
		'┴                  ┴',
		'└├----------------┤┘'
	]);
	selectMode();
}

function selectMode() {
	new icons.Sprite('Normal', 2, 3);
	button('Normal mode', 5, 4, () => {
		exitMenu();
		startGame();
	});

	new icons.Sprite('Reverse', 2, 11);
	button('Reverse mode', 13, 4, () => {
		reverseMode = true;
		exitMenu();
		startGame();
	});
}

function exitMenu() {
	erase();
	icons.remove();
}

function startGame() {
	text('SCORE: ' + score, 17, 6);

	new snake.Sprite('head-up', 2, 11).layer = 4;
	new snake.Sprite('body-up', 2, 12);
	new snake.Sprite('tail-up', 2, 13);

	egg = new eggs.Sprite('egg', 10, 5, 'static');

	inputDirection = 'up';
	curves = [];
	tailIndex = 2;
	score = 0;
	speed = 0.05;

	moveSnake();
}

function changeSnakeAni(s, type, heading) {
	if (heading == 'up') {
		s.ani = type + '-up';
		s.mirror.x = false;
		s.mirror.y = false;
	} else if (heading == 'down') {
		s.ani = type + '-up';
		s.mirror.x = false;
		s.mirror.y = true;
	} else if (heading == 'left') {
		s.ani = type + '-left';
		s.mirror.x = false;
		s.mirror.y = false;
	} else {
		s.ani = type + '-left';
		s.mirror.x = true;
		s.mirror.y = false;
	}
}

function placeEgg() {
	let avail = [];
	for (let y = 1; y < 14; y++) {
		for (let x = 1; x < 19; x++) {
			let snakeSpace = false;
			for (let i = 0; i < snake.length; i++) {
				if (snake[i].y == y && snake[i].x == x) {
					snakeSpace = true;
				}
			}
			if (snakeSpace == false) {
				avail.push([y, x]);
			}
		}
	}
	let idx = Math.floor(Math.random() * avail.length);
	let coord = avail[idx];
	egg.y = coord[0];
	egg.x = coord[1];
}

async function snakeBlink() {
	for (let i = 0; i < snake.length; i++) {
		snake[i].visible = !snake[i].visible;
	}
	await delay(250);
	if (isGameOver) snakeBlink();
}

async function gameOver() {
	isGameOver = true;
	snakeBlink();
	await alert('Game Over');
	isGameOver = false;

	snake.remove();
	eggs.remove();

	startGame();
}

async function moveSnake() {
	if (isGameOver) {
		gameOver();
		return;
	}
	let movements = [];

	let prevDir = snake[0].heading;
	let nextDir = inputDirection;

	// create the curve
	if (prevDir != nextDir) {
		let s = new snake.Sprite('curve', snake[0].x, snake[0].y);
		if ((prevDir == 'up' && nextDir == 'right') || (prevDir == 'left' && nextDir == 'down')) {
			s.mirror.x = false;
			s.mirror.y = true;
		} else if ((prevDir == 'up' && nextDir == 'left') || (prevDir == 'right' && nextDir == 'down')) {
			s.mirror.x = true;
			s.mirror.y = true;
		} else if ((prevDir == 'down' && nextDir == 'right') || (prevDir == 'left' && nextDir == 'up')) {
			s.mirror.x = false;
			s.mirror.y = false;
		} else {
			s.mirror.x = true;
			s.mirror.y = false;
		}
		curves.push(s);
	}

	if (tailIndex >= 3) {
		let h = snake[0];
		for (let i = 3; i < tailIndex; i++) {
			let s = snake[i];
			if (
				(inputDirection == 'up' && s.x == h.x && s.y == h.y - 1) ||
				(inputDirection == 'down' && s.x == h.x && s.y == h.y + 1) ||
				(inputDirection == 'left' && s.x == h.x - 1 && s.y == h.y) ||
				(inputDirection == 'right' && s.x == h.x + 1 && s.y == h.y)
			) {
				isGameOver = true;
			}
		}
	}

	if (snake[0].y == egg.y && snake[0].x == egg.x) {
		if (speed < 0.075) {
			speed += 0.01;
		} else if (speed < 0.12) {
			speed += 0.005;
		} else {
			speed += 0.001;
		}
		log(speed);

		if (reverseMode == true) {
			let newDirections = [];
			for (let i = 0, j = tailIndex; i <= tailIndex; i++, j--) {
				let si = snake[i];
				let sj = snake[j];

				if (i <= Math.floor(tailIndex / 2)) {
					let siY = si.y;
					let siX = si.x;
					si.y = sj.y;
					si.x = sj.x;
					sj.y = siY;
					sj.x = siX;
				}

				if (sj.heading == 'up') {
					newDirections.push('down');
				} else if (sj.heading == 'down') {
					newDirections.push('up');
				} else if (sj.heading == 'left') {
					newDirections.push('right');
				} else if (sj.heading == 'right') {
					newDirections.push('left');
				}
			}

			for (let i = 0; i < tailIndex; i++) {
				let s = snake[i];
				let type = s.animation.name.split('-')[0];
				s.heading = newDirections[i + 1];
				changeSnakeAni(s, type, s.heading);
			}

			inputDirection = newDirections[0];
		}

		new snake.Sprite(snake[1].animation.name, snake[1].x, snake[1].y);
		tailIndex += 1;
		snake.splice(1, 0, snake.pop());
		snake[1].heading = snake[0].heading;

		movements.push(snake[1].move(snake[1].heading, speed));
		snake[0].heading = inputDirection;
		movements.push(snake[0].move(snake[0].heading, speed));
		await Promise.all(movements);
		score += 1;
		text('SCORE: ' + score, 17, 6);
		placeEgg();
		moveSnake();
		return;
	}

	if (
		(inputDirection == 'up' && snake[0].y == 1) ||
		(inputDirection == 'down' && snake[0].y == 13) ||
		(inputDirection == 'left' && snake[0].x == 1) ||
		(inputDirection == 'right' && snake[0].x == 18)
	) {
		gameOver();
		return;
	}

	for (let i = tailIndex; i >= 0; i--) {
		let s = snake[i];

		// move the snake
		let type = s.animation.name.split('-')[0];
		if (type == 'head' || type == 'eat') {
			if (s.y >= egg.y - 2 && s.y <= egg.y + 2 && s.x >= egg.x - 2 && s.x <= egg.x + 2) {
				type = 'eat';
			} else {
				type = 'head';
			}

			s.heading = inputDirection;
		} else {
			s.heading = snake[i - 1].heading;
		}

		if (type == 'body' || type == 'bodyhalf') {
			let prevDir = snake[i].heading;
			let nextDir = snake[i].heading;

			if (prevDir != nextDir) {
				type = 'bodyhalf';
			} else {
				type = 'body';
			}
		}

		if (type == 'tail' && curves.length) {
			let lastCurve = curves[0];
			if (s.y == lastCurve.y && s.x == lastCurve.x) {
				curves.shift();
				lastCurve.remove();
			}
		}

		changeSnakeAni(s, type, s.heading);

		if (type == 'head' || type == 'eat') {
			movements.push(s.move(s.heading, speed));
		} else {
			movements.push(s.move(s.heading, speed));
		}
	}
	await Promise.all(movements);
	moveSnake();
}

function draw() {
	background(2);
}

function keyPressed() {
	if (key == 'ArrowUp' && snake[0].heading != 'down') {
		inputDirection = 'up';
	} else if (key == 'ArrowDown' && snake[0].heading != 'up') {
		inputDirection = 'down';
	} else if (key == 'ArrowLeft' && snake[0].heading != 'right') {
		inputDirection = 'left';
	} else if (key == 'ArrowRight' && snake[0].heading != 'left') {
		inputDirection = 'right';
	}

	log(inputDirection);
}
