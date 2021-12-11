// screen size: 160x144 pixels
// text rows: 18 cols: 20

let score = 0; // number of apples eaten
let speed = 1; // snake speed

text('SCORE: ' + score, 17, 0);
text('SPEED: ' + score, 17, 11);

let apple = items.createSprite('apple', 0, 0);

snake.createSprite(10, 15);
snake.createSprite(10, 16);
snake.createSprite(10, 17);
// snake[0].ani('eat-left', '!eat-left', '*');
snake[0].ani('head-left');
snake[1].ani('body-left');
snake[2].ani('tail-left');

async function moveSnake() {
	for (let s of snake) {
		s.move('left', 0.5);
	}
	await delay(250);
	moveSnake();
}

moveSnake();

function draw() {
	background(colorPal(2));
	drawSprites();
}
