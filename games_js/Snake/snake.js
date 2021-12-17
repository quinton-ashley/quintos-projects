// screen size: 160x144 pixels
// text rows: 18 cols: 20

let score = 0; // number of apples eaten
let speed = 1; // snake speed

text('SCORE: ' + score, 17, 0);
text('SPEED: ' + score, 17, 11);

let egg = world.createSprite('egg', 5, 10, 1);

for (let i = 0; i < 15; i++) {
	for (let j = 0; j < 20; j++) {
		let rand = Math.floor(Math.random() * 9);
		world.createSprite('grass' + rand, i, j);
	}
}

for (let i = 0; i < 18; i++) {
	let pipeType = 'pipe-middle';
	if (i == 0) {
		pipeType = 'pipe-start';
	} else if (i == 17) {
		pipeType = 'pipe-end';
	}
	pipes.createSprite(pipeType, 0, i + 1, 1);
	pipes.createSprite(pipeType, 14, i + 1, 1);
}

for (let i = 0; i < 13; i++) {
	let pipeType = 'pipe-middle';
	if (i == 0) {
		pipeType = 'pipe-start';
	} else if (i == 12) {
		pipeType = 'pipe-end';
	}
	let pipe = pipes.createSprite(pipeType, i + 1, 0, 1);
	pipe.rotation = 90;
	let pipe2 = pipes.createSprite(pipeType, i + 1, 19, 1);
	pipe2.rotation = 90;
}

pipes.createSprite('pipe-topLeft', 0, 0, 1);
pipes.createSprite('pipe-topRight', 0, 19, 1);
pipes.createSprite('pipe-bottomLeft', 14, 0, 1);
pipes.createSprite('pipe-bottomRight', 14, 19, 1);

let direction = 'up';

function changeHeadAni(type) {
	if (direction == 'up') {
		snake.ani(type + '-up');
		snake.mirrorX(1);
		snake.mirrorY(1);
	} else if (direction == 'down') {
		snake.ani(type + '-up');
		snake.mirrorX(1);
		snake.mirrorY(-1);
	} else if (direction == 'left') {
		snake.ani(type + '-left');
		snake.mirrorX(1);
		snake.mirrorY(1);
	} else {
		snake.ani(type + '-left');
		snake.mirrorX(-1);
		snake.mirrorY(1);
	}
}

async function moveSnake() {
	// move the snake
	let type = 'head';
	if (snake.row >= egg.row - 2 && snake.row <= egg.row + 2 && snake.col >= egg.col - 2 && snake.col <= egg.col + 2) {
		type = 'eat';
	}
	if (snake.row == egg.row && snake.col == egg.col) {
		egg.row = Math.floor(Math.random() * 13 + 1);
		egg.col = Math.floor(Math.random() * 18 + 1);
	}
	changeHeadAni(type);
	await snake.move(direction, 0.5);
	moveSnake();
}

moveSnake();

function draw() {
	background(colorPal(2));

	snake.collide(pipes);

	drawSprites();
}

function keyPressed() {
	if (key == 'ArrowUp' && direction != 'down') {
		direction = 'up';
	} else if (key == 'ArrowDown' && direction != 'up') {
		direction = 'down';
	} else if (key == 'ArrowLeft' && direction != 'right') {
		direction = 'left';
	} else if (key == 'ArrowRight' && direction != 'left') {
		direction = 'right';
	}

	log(direction);
}
