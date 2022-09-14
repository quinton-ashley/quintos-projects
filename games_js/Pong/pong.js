// screen size is 256x192

let ball, paddleL, paddleR, wallTop, wallBottom;
let imgNet, imgCenterLine;
let halfW, halfH;

let scoreL = 0;
let scoreR = 0;

function setup() {
	halfW = width / 2;
	halfH = height / 2;

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

	imgNet = spriteArt('w.\n.w\n'.repeat(80));

	imgCenterLine = spriteArt('w'.repeat(5) + '.'.repeat(31) + 'w'.repeat(144) + '.'.repeat(31) + 'w'.repeat(5) + '\n');

	ball = new Sprite(imgBall, halfW, halfH, 8);
	paddleL = new Sprite(imgPaddle, 9, halfH, 'static');
	paddleR = new Sprite(imgPaddle, width - 9, halfH, 'static');
	wallTop = new Sprite(imgWall, halfW, 4, 'static');
	wallBottom = new Sprite(imgWall, halfW, height - 4, 'static');

	// places a ball in center of the screen
	ball.velocity.x = 1;
	ball.velocity.y = 1;
	ball.bounciness = 1;
	ball.friction = 0;
	ball.rotationLocked = true;

	displayScore();
}

function displayScore() {
	text(scoreL, 3, 10);
	text(scoreR, 3, 20);
}

function draw() {
	background('r');
	fill('c');
	stroke('w');
	rect(20, 16, 216, 20); // top
	rect(20, 36, 36, 140); // left
	rect(200, 36, 36, 140); // right
	rect(20, 156, 216, 20); // bottom
	image(imgNet, halfW - 1, 16);
	image(imgCenterLine, 20, halfH);

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

	if (kb.pressing('w') && paddleL.y > wallTop.y) {
		paddleL.y -= 4;
	} else if (kb.pressing('s') && paddleL.y < wallBottom.y) {
		paddleL.y += 4;
	}

	if (kb.pressing('ArrowUp') && paddleR.y > wallTop.y) {
		paddleR.y -= 4;
	} else if (kb.pressing('ArrowDown') && paddleR.y < wallBottom.y) {
		paddleR.y += 4;
	}

	if (kb.pressed('d')) {
		paddleL.rotation += 22.5;
	} else if (kb.pressed('a')) {
		paddleL.rotation -= 22.5;
	}

	if (kb.pressed('ArrowLeft')) {
		paddleR.rotation -= 22.5;
	} else if (kb.pressed('ArrowRight')) {
		paddleR.rotation += 22.5;
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
