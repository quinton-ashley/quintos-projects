// screen width is 640, height is 400
const log = console.log;

// sprites are scaled x2 by default
let imgBall = spriteArt(`
..wwww..
.wwyyww.
wwywwyww
wyyyyyyw
wyyyyyyw
wwywwyww
.wwyyww.
..wwww..`);

let imgPaddle = spriteArt('.wwwwww.\nwwwwwwww\n' + 'www..www\nww.ww.ww\n'.repeat(21) + 'wwwwwwww\n.wwwwww.');

let imgWall = spriteArt(('b'.repeat(320) + '\n').repeat(10));

// place ball in center of the screen
let ball = createSprite(imgBall);
ball.x = width / 2;
ball.y = height / 2;
ball.velocity.x = 1;
ball.velocity.y = 1;

// place paddles 12px from the sides, center vertically
let paddleL = createSprite(imgPaddle);
paddleL.x = 10;
paddleL.y = height / 2;
paddleL.immovable = true;

let paddleR = createSprite(imgPaddle);
paddleR.x = width - 10;
paddleR.y = height / 2;
paddleR.immovable = true;

// place walls on the top and bottom of the screen
let wallTop = createSprite(imgWall);
wallTop.x = width / 2;
wallTop.y = 5;
wallTop.immovable = true;

let wallBottom = createSprite(imgWall);
wallBottom.x = width / 2;
wallBottom.y = height - 5;
wallBottom.immovable = true;

let imgNet = spriteArt('w.\n.w\n'.repeat(80));

let imgCenterLine = spriteArt('w'.repeat(5) + '.'.repeat(55) + 'w'.repeat(160) + '.'.repeat(55) + 'w'.repeat(5) + '\n');

function draw() {
	clear();
	background(color16('r'));
	fill(color16('c'));
	stroke(color16('w'));
	rect(20, 20, 280, 20); // top
	rect(20, 40, 60, 140); // left
	rect(240, 40, 60, 140); // right
	rect(20, 160, 280, 20); // bottom
	image(imgNet, width / 2 - 2, 20);
	image(imgCenterLine, 20, height / 2);

	paddleL.position.y = Math.round(mouseY);
	paddleR.position.y = Math.round(mouseY);

	ball.bounce(paddleL);
	ball.bounce(paddleR);
	ball.bounce(wallTop);
	ball.bounce(wallBottom);

	// if the ball leaves the screen
	if (ball.x < -10 || ball.x > width + 10) {
		ball.x = width / 2;
		ball.y = height / 2;
	}

	drawSprites();
}
