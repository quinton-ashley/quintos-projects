// screen size is 256x192

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
let imgPaddle = spriteArt(
	'.wwwwww.\nwwwwwwww\n' + 'www..www\nww.ww.ww\n'.repeat(11) + 'www..www\n' + 'wwwwwwww\n.wwwwww.'
);

let imgWall = spriteArt(('c'.repeat(320) + '\n').repeat(8));

let imgNet = spriteArt('w.\n.w\n'.repeat(80));

let imgCenterLine = spriteArt('w'.repeat(5) + '.'.repeat(31) + 'w'.repeat(144) + '.'.repeat(31) + 'w'.repeat(5) + '\n');

let ball = new Sprite(imgBall, centerX, centerY, 8);
let paddleL = new Sprite(imgPaddle, 9, centerY, 'static');
let paddleR = new Sprite(imgPaddle, width - 9, centerY, 'static');
let wallTop = new Sprite(imgWall, centerX, 4, 'static');
let wallBottom = new Sprite(imgWall, centerX, height - 4, 'static');

let scoreL = 0;
let scoreR = 0;

// places a ball in center of the screen
ball.velocity.x = 1;
ball.velocity.y = 1;
ball.bounciness = 1;
ball.friction = 0;
ball.rotationLocked = true;

function displayScore() {
	text(scoreL, 3, 10);
	text(scoreR, 3, 20);
}

displayScore();

function draw() {
	background('r');
	fill('c');
	stroke('w');
	rect(20, 16, 216, 20); // top
	rect(20, 36, 36, 140); // left
	rect(200, 36, 36, 140); // right
	rect(20, 156, 216, 20); // bottom
	image(imgNet, centerX - 1, 16);
	image(imgCenterLine, 20, centerY);

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

	if (isKeyDown('w') && paddleL.y > wallTop.y) {
		paddleL.y -= 4;
	} else if (isKeyDown('s') && paddleL.y < wallBottom.y) {
		paddleL.y += 4;
	}

	if (isKeyDown('ArrowUp') && paddleR.y > wallTop.y) {
		paddleR.y -= 4;
	} else if (isKeyDown('ArrowDown') && paddleR.y < wallBottom.y) {
		paddleR.y += 4;
	}

	// if the ball leaves the screen
	if (ball.x < -50) {
		ball.velocity.x = 1;
		scoreR++;
	}
	if (ball.x > width + 50) {
		ball.velocity.x = -1;
		scoreL++;
	}
	if (ball.x < -50 || ball.x > width + 50) {
		displayScore();
		if (Math.random() < 0.5) {
			ball.velocity.y = 1;
		} else {
			ball.velocity.y = -1;
		}
		// place back in center of the screen
		ball.x = width / 2 - ball.w / 2;
		ball.y = height / 2 - ball.h / 2;
	}
}

function keyPressed() {
	if (key == 'd') {
		paddleL.rotation += 22.5;
	} else if (key == 'a') {
		paddleL.rotation -= 22.5;
	}

	if (key == 'ArrowLeft') {
		paddleR.rotation -= 22.5;
	} else if (key == 'ArrowRight') {
		paddleR.rotation += 22.5;
	}
}
