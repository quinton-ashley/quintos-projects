// screen size: 160x144 pixels
// text rows: 18 cols: 20

let score = 0; // number of apples eaten
let speed = 0.05; // snake speed

let isGameOver = false;
let reverseMode = false;

let tailIndex = 2;
let curves = [];
let inputDirection = 'up';
let egg;

function setup() {
	for (let i = 0; i < 15; i++) {
		for (let j = 0; j < 20; j++) {
			let rand = Math.floor(Math.random() * 9);
			new bg.Sprite('grass' + rand, j, i);
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
	icons.removeSprites();
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
		s.mirrorX = false;
		s.mirrorY = false;
	} else if (heading == 'down') {
		s.ani = type + '-up';
		s.mirrorX = false;
		s.mirrorY = true;
	} else if (heading == 'left') {
		s.ani = type + '-left';
		s.mirrorX = false;
		s.mirrorY = false;
	} else {
		s.ani = type + '-left';
		s.mirrorX = true;
		s.mirrorY = false;
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

	snake.removeSprites();
	eggs.removeSprites();

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
			s.mirrorX = false;
			s.mirrorY = true;
		} else if ((prevDir == 'up' && nextDir == 'left') || (prevDir == 'right' && nextDir == 'down')) {
			s.mirrorX = true;
			s.mirrorY = true;
		} else if ((prevDir == 'down' && nextDir == 'right') || (prevDir == 'left' && nextDir == 'up')) {
			s.mirrorX = false;
			s.mirrorY = false;
		} else {
			s.mirrorX = true;
			s.mirrorY = false;
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
	background(colorPal(2));
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
