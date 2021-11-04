// screen resolution is 256x192

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

let imgWall = spriteArt(('c'.repeat(320) + '\n').repeat(8));

// place ball in center of the screen
let ball = createSprite(imgBall);
ball.x = width / 2;
ball.y = height / 2;
ball.velocity.x = -1;
ball.velocity.y = 1;

// place paddles 12px from the sides, center vertically
let paddleL = createSprite(imgPaddle);
paddleL.x = 5;
paddleL.immovable = true;

let paddleR = createSprite(imgPaddle);
paddleR.x = width - paddleR.w - 5;
paddleR.immovable = true;

// place walls on the top and bottom of the screen
let wallTop = createSprite(imgWall);
wallTop.x = 0;
wallTop.y = 0;
wallTop.immovable = true;

let wallBottom = createSprite(imgWall);
wallBottom.x = 0;
wallBottom.y = height - wallBottom.h;
wallBottom.immovable = true;

let imgNet = spriteArt('w.\n.w\n'.repeat(80));

let imgCenterLine = spriteArt('w'.repeat(5) + '.'.repeat(31) + 'w'.repeat(144) + '.'.repeat(31) + 'w'.repeat(5) + '\n');

function draw() {
	clear();
	background(color16('r'));
	fill(color16('c'));
	stroke(color16('w'));
	rect(20, 16, 216, 20); // top
	rect(20, 36, 36, 140); // left
	rect(200, 36, 36, 140); // right
	rect(20, 156, 216, 20); // bottom
	image(imgNet, width / 2 - 2, 16);
	image(imgCenterLine, 20, height / 2);

	paddleL.y = mouseY - paddleL.h;
	paddleR.y = mouseY - paddleR.h;

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
