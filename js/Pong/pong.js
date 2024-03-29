let ball, paddleL, paddleR, wallTop, wallBottom;
let imgNet, imgCenterLine;
let halfW, halfH;

let scoreL = 0;
let scoreR = 0;

function setup() {
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

	ball = new Sprite(imgBall, canvas.hw, canvas.hh, 8);
	paddleL = new Sprite(imgPaddle, 9, canvas.hh, 'k');
	paddleR = new Sprite(imgPaddle, canvas.w - 9, canvas.hh, 'k');
	wallTop = new Sprite(imgWall, canvas.hw, 4, 's');
	wallBottom = new Sprite(imgWall, canvas.hw, canvas.h - 4, 's');

	paddleL.pixelPerfect = true;
	paddleR.pixelPerfect = true;

	ball.bounciness = 1;
	ball.friction = 0;
	ball.speed = 1.4;

	displayScore();
}

function displayScore() {
	txt(scoreL, 3, 10);
	txt(scoreR, 3, 20);
}

function draw() {
	background('r');
	fill('c');
	stroke('w');
	rect(20, 16, 216, 20); // top
	rect(20, 36, 36, 140); // left
	rect(200, 36, 36, 140); // right
	rect(20, 156, 216, 20); // bottom
	image(imgNet, canvas.hw - 1, 16);
	image(imgCenterLine, 20, canvas.hh);

	if (kb.pressing('w')) {
		paddleL.vel.y = -4;
	} else if (kb.pressing('s')) {
		paddleL.vel.y = 4;
	} else {
		paddleL.vel.y = 0;
	}

	if (kb.pressing('i')) {
		paddleR.vel.y = -4;
	} else if (kb.pressing('k')) {
		paddleR.vel.y = 4;
	} else {
		paddleR.vel.y = 0;
	}

	if (kb.presses('d')) paddleL.rotate(22.5, 5);
	else if (kb.presses('a')) paddleL.rotate(-22.5, 5);
	if (kb.presses('j')) paddleR.rotate(-22.5, 5);
	else if (kb.presses('l')) paddleR.rotate(22.5, 5);

	// if the ball hit a paddle
	if (ball.collided(paddleL) || ball.collided(paddleR)) {
		ball.speed = 2;
	}

	// if the ball leaves the screen
	if (ball.x < -50) {
		ball.vel.x = 1;
		scoreR++;
	}
	if (ball.x > canvas.w + 50) {
		ball.vel.x = -1;
		scoreL++;
	}
	if (ball.x < -50 || ball.x > canvas.w + 50) {
		displayScore();
		if (random() < 0.5) {
			ball.vel.y = 1;
		} else {
			ball.vel.y = -1;
		}
		// place back in center of the screen
		ball.x = canvas.hw;
		ball.y = canvas.hh;
	}

	allSprites.debug = mouse.pressing();
}
