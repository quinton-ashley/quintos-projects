// screen resolution is 256x192

// tennis ball image
let imgBall = spriteArt(`
..wwww..
.wwyyww.
wwywwyww
wyyyyyyw
wyyyyyyw
wwywwyww
.wwyyww.
..wwww..`);

// paddle racket image
let imgPaddle = spriteArt('.wwwwww.\nwwwwwwww\n' + 'www..www\nww.ww.ww\n'.repeat(21) + 'wwwwwwww\n.wwwwww.');

let imgWall = spriteArt(('c'.repeat(320) + '\n').repeat(8));

let ball = createSprite(imgBall);
let paddleL = createSprite(imgPaddle);
let paddleR = createSprite(imgPaddle);
let wallTop = createSprite(imgWall);
let wallBottom = createSprite(imgWall);

let imgNet = spriteArt('w.\n.w\n'.repeat(80));

let imgCenterLine = spriteArt('w'.repeat(5) + '.'.repeat(31) + 'w'.repeat(144) + '.'.repeat(31) + 'w'.repeat(5) + '\n');

window.setup = () => {
	// places a ball in center of the screen
	ball.x = width / 2 - ball.w / 2;
	ball.y = height / 2 - ball.h / 2;
	ball.velocity.x = -1;
	ball.velocity.y = 1;

	// place paddles 5px from the sides, center vertically
	paddleL.x = 5;
	paddleL.immovable = true;

	paddleR.x = width - paddleR.w - 5;
	paddleR.immovable = true;

	// place walls on the top and bottom of the screen
	wallTop.x = 0;
	wallTop.y = 0;
	wallTop.immovable = true;

	wallBottom.x = 0;
	wallBottom.y = height - wallBottom.h;
	wallBottom.immovable = true;
};

window.draw = () => {
	background(colorPal('r'));
	fill(colorPal('c'));
	stroke(colorPal('w'));
	rect(20, 16, 216, 20); // top
	rect(20, 36, 36, 140); // left
	rect(200, 36, 36, 140); // right
	rect(20, 156, 216, 20); // bottom
	image(imgNet, width / 2 - 2, 16);
	image(imgCenterLine, 20, height / 2);

	// if ball touches top wall
	if (ball.y < wallTop.y + wallTop.h) {
		ball.velocity.y = -ball.velocity.y + 0.1;
	}
	// if ball touches bottom wall
	if (ball.y + ball.h > wallBottom.y) {
		ball.velocity.y = -ball.velocity.y - 0.1;
	}
	// if ball touches either wall
	if (ball.y < wallTop.y + wallTop.h || ball.y + ball.h > wallBottom.y) {
		if (ball.velocity.x > 0) {
			ball.velocity.x += 0.1;
		} else {
			ball.velocity.x -= 0.1;
		}
	}

	// move the paddles with the mouse
	paddleL.y = mouseY - paddleL.h;
	paddleR.y = mouseY - paddleR.h;

	// have the ball bounce of the paddles
	ball.bounce(paddleL);
	ball.bounce(paddleR);

	// if the ball leaves the screen
	if (ball.x < -10) {
		ball.velocity.x = 1;
	}
	if (ball.x > width + 10) {
		ball.velocity.x = -1;
	}
	if (ball.x < -10 || ball.x > width + 10) {
		if (Math.random() < 0.5) {
			ball.velocity.y = 1;
		} else {
			ball.velocity.y = -1;
		}
		// place back in center of the screen
		ball.x = width / 2 - ball.w / 2;
		ball.y = height / 2 - ball.h / 2;
	}

	drawSprites();
};
