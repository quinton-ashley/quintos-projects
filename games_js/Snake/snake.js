// screen size: 160x144 pixels
// text rows: 18 cols: 20

let score = 0; // number of apples eaten
let speed = 0.3; // snake speed

let isGameOver = false;
let reverseMode = false;

let tailIndex = 2;
let curves = [];
let inputDirection = 'up';
let egg;

text('SCORE: ' + score, 17, 6);

world.resize();

for (let i = 0; i < 15; i++) {
	for (let j = 0; j < 20; j++) {
		let rand = Math.floor(Math.random() * 9);
		bg.createSprite('grass' + rand, j, i);
	}
}

function draw() {}

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

function selectMode() {
	icons.createSprite('Normal', 2, 3);
	button('Normal mode', 5, 4, () => {
		startGame();
	});

	icons.createSprite('Reverse', 2, 11);
	button('Reverse mode', 13, 4, () => {
		reverseMode = true;
		startGame();
	});
}
selectMode();

// function startGame() {
// 	erase();
// 	icons.removeSprites();
// 	snake.createSprite('head-up', 11, 2).direction = 'up';
// 	snake.createSprite('body-up', 12, 2).direction = 'up';
// 	snake.createSprite('tail-up', 13, 2).direction = 'up';

// 	egg = bg.createSprite('egg', 5, 10, 'static');
// 	egg.layer = 2;

// 	moveSnake();
// }

// function changeSnakeAni(s, type, direction) {
// 	if (direction == 'up') {
// 		s.ani(type + '-up');
// 		s.mirrorX = false;
// 		s.mirrorY = false;
// 	} else if (direction == 'down') {
// 		s.ani(type + '-up');
// 		s.mirrorX = false;
// 		s.mirrorY = true;
// 	} else if (direction == 'left') {
// 		s.ani(type + '-left');
// 		s.mirrorX = false;
// 		s.mirrorY = false;
// 	} else {
// 		s.ani(type + '-left');
// 		s.mirrorX = true;
// 		s.mirrorY = false;
// 	}
// }

// function placeEgg() {
// 	let avail = [];
// 	for (let row = 1; row < 14; row++) {
// 		for (let col = 1; col < 19; col++) {
// 			let snakeSpace = false;
// 			for (let i = 0; i < snake.length; i++) {
// 				if (snake[i].row == row && snake[i].col == col) {
// 					snakeSpace = true;
// 				}
// 			}
// 			if (snakeSpace == false) {
// 				avail.push([row, col]);
// 			}
// 		}
// 	}
// 	let idx = Math.floor(Math.random() * avail.length);
// 	let coord = avail[idx];
// 	egg.row = coord[0];
// 	egg.col = coord[1];
// }

// async function snakeBlink() {
// 	for (let i = 0; i < snake.length; i++) {
// 		snake[i].visible = !snake[i].visible;
// 	}
// 	await delay(250);
// 	if (isGameOver) snakeBlink();
// }

// async function gameOver() {
// 	isGameOver = true;
// 	snakeBlink();
// 	await alert('Game Over');
// 	isGameOver = false;

// 	snake.removeSprites();

// 	let head = snake.createSprite('head-up', 11, 2);
// 	head.layer = 3;
// 	head.direction = 'up';
// 	snake.createSprite('body-up', 12, 2).direction = 'up';
// 	snake.createSprite('tail-up', 13, 2).direction = 'up';

// 	inputDirection = 'up';
// 	curves = [];
// 	tailIndex = 2;
// 	score = 0;
// 	speed = 0.3;

// 	moveSnake();
// }

// async function moveSnake() {
// 	if (isGameOver) {
// 		gameOver();
// 		return;
// 	}
// 	let movements = [];

// 	let prevDir = snake[0].direction;
// 	let nextDir = inputDirection;

// 	// create the curve
// 	if (prevDir != nextDir) {
// 		let s = snake.createSprite('curve', snake[0].row, snake[0].col, 2);
// 		if ((prevDir == 'up' && nextDir == 'right') || (prevDir == 'left' && nextDir == 'down')) {
// 			s.mirrorX = false;
// 			s.mirrorY = true;
// 		} else if ((prevDir == 'up' && nextDir == 'left') || (prevDir == 'right' && nextDir == 'down')) {
// 			s.mirrorX = true;
// 			s.mirrorY = true;
// 		} else if ((prevDir == 'down' && nextDir == 'right') || (prevDir == 'left' && nextDir == 'up')) {
// 			s.mirrorX = false;
// 			s.mirrorY = false;
// 		} else {
// 			s.mirrorX = true;
// 			s.mirrorY = false;
// 		}
// 		curves.push(s);
// 	}

// 	if (tailIndex >= 3) {
// 		let h = snake[0];
// 		for (let i = 3; i < tailIndex; i++) {
// 			let s = snake[i];
// 			if (
// 				(inputDirection == 'up' && s.col == h.col && s.row == h.row - 1) ||
// 				(inputDirection == 'down' && s.col == h.col && s.row == h.row + 1) ||
// 				(inputDirection == 'left' && s.col == h.col - 1 && s.row == h.row) ||
// 				(inputDirection == 'right' && s.col == h.col + 1 && s.row == h.row)
// 			) {
// 				isGameOver = true;
// 			}
// 		}
// 	}

// 	if (snake[0].row == egg.row && snake[0].col == egg.col) {
// 		log(speed);
// 		if (speed < 0.5) {
// 			speed += 0.1;
// 		} else if (speed < 0.6) {
// 			speed += 0.05;
// 		} else {
// 			speed += 0.01;
// 		}

// 		if (reverseMode == true) {
// 			let newDirections = [];
// 			for (let i = 0, j = tailIndex; i <= tailIndex; i++, j--) {
// 				let si = snake[i];
// 				let sj = snake[j];

// 				if (i <= Math.floor(tailIndex / 2)) {
// 					let siRow = si.row;
// 					let siCol = si.col;
// 					si.row = sj.row;
// 					si.col = sj.col;
// 					sj.row = siRow;
// 					sj.col = siCol;
// 				}

// 				if (sj.direction == 'up') {
// 					newDirections.push('down');
// 				} else if (sj.direction == 'down') {
// 					newDirections.push('up');
// 				} else if (sj.direction == 'left') {
// 					newDirections.push('right');
// 				} else if (sj.direction == 'right') {
// 					newDirections.push('left');
// 				}
// 			}

// 			for (let i = 0; i < tailIndex; i++) {
// 				let s = snake[i];
// 				let type = s.animation.name.split('-')[0];
// 				s.direction = newDirections[i + 1];
// 				changeSnakeAni(s, type, s.direction);
// 			}

// 			inputDirection = newDirections[0];
// 		}

// 		snake.createSprite(snake[1].animation.name, snake[1].row, snake[1].col, 2);
// 		tailIndex += 1;
// 		snake.splice(1, 0, snake.pop());
// 		snake[1].direction = snake[0].direction;

// 		movements.push(snake[1].move(snake[1].direction, speed));
// 		snake[0].direction = inputDirection;
// 		movements.push(snake[0].move(snake[0].direction, speed));
// 		await Promise.all(movements);
// 		score += 1;
// 		text('SCORE: ' + score, 17, 6);
// 		placeEgg();
// 		moveSnake();
// 		return;
// 	}

// 	if (
// 		(inputDirection == 'up' && snake[0].row == 1) ||
// 		(inputDirection == 'down' && snake[0].row == 13) ||
// 		(inputDirection == 'left' && snake[0].col == 1) ||
// 		(inputDirection == 'right' && snake[0].col == 18)
// 	) {
// 		gameOver();
// 		return;
// 	}

// 	for (let i = tailIndex; i >= 0; i--) {
// 		let s = snake[i];

// 		// move the snake
// 		let type = s.animation.name.split('-')[0];
// 		if (type == 'head' || type == 'eat') {
// 			if (s.row >= egg.row - 2 && s.row <= egg.row + 2 && s.col >= egg.col - 2 && s.col <= egg.col + 2) {
// 				type = 'eat';
// 			} else {
// 				type = 'head';
// 			}

// 			s.direction = inputDirection;
// 		} else {
// 			s.direction = snake[i - 1].direction;
// 		}

// 		if (type == 'body' || type == 'bodyhalf') {
// 			let prevDir = snake[i].direction;
// 			let nextDir = snake[i].direction;

// 			if (prevDir != nextDir) {
// 				type = 'bodyhalf';
// 			} else {
// 				type = 'body';
// 			}
// 		}

// 		if (type == 'tail' && curves.length) {
// 			let lastCurve = curves[0];
// 			if (s.row == lastCurve.row && s.col == lastCurve.col) {
// 				curves.shift();
// 				lastCurve.remove();
// 			}
// 		}

// 		changeSnakeAni(s, type, s.direction);

// 		if (type == 'head' || type == 'eat') {
// 			movements.push(s.move(s.direction, speed));
// 		} else {
// 			movements.push(s.move(s.direction, speed));
// 		}
// 	}
// 	await Promise.all(movements);
// 	moveSnake();
// }

// function draw() {
// 	background(colorPal(2));
// }

// function keyPressed() {
// 	if (key == 'ArrowUp' && snake[0].direction != 'down') {
// 		inputDirection = 'up';
// 	} else if (key == 'ArrowDown' && snake[0].direction != 'up') {
// 		inputDirection = 'down';
// 	} else if (key == 'ArrowLeft' && snake[0].direction != 'right') {
// 		inputDirection = 'left';
// 	} else if (key == 'ArrowRight' && snake[0].direction != 'left') {
// 		inputDirection = 'right';
// 	}

// 	log(inputDirection);
// }
