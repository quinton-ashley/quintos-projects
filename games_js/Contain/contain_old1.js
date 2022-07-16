// screen resolution is 256x192

let imgBall = spriteArt(`
..wwww..
.wwyyww.
wwywwyww
wyyyyyyw
wyyyyyyw
wwywwyww
.wwyyww.
..wwww..`);

let imgPaddleHoriz = spriteArt(
	' ' +
		'w'.repeat(52) +
		' \n' +
		'w'.repeat(54) +
		'\n' +
		('ww' + ' '.repeat(50) + 'ww\n').repeat(4) +
		'w'.repeat(54) +
		'\n' +
		' ' +
		'w'.repeat(52)
);

let imgPaddleVert = spriteArt('.wwwwww.\nwwwwwwww\n' + 'www..www\nww.ww.ww\n'.repeat(21) + 'wwwwwwww\n.wwwwww.');

let imgNet = spriteArt('w.\n.w\n'.repeat(74));

let imgCenterLine = spriteArt('w'.repeat(5) + '.'.repeat(31) + 'w'.repeat(144) + '.'.repeat(31) + 'w'.repeat(5) + '\n');

let paddleUp = createSprite(imgPaddleHoriz);
paddleUp.y = 9;
paddleUp.immovable = true;

let paddleDown = createSprite(imgPaddleHoriz);
paddleDown.y = height - paddleDown.h - 5;
paddleDown.immovable = true;

let paddleLeft = createSprite(imgPaddleVert);
paddleLeft.x = 5;
paddleLeft.immovable = true;

let paddleRight = createSprite(imgPaddleVert);
paddleRight.x = width - paddleRight.w - 5;
paddleRight.immovable = true;

// place ball in center of the screen
let balls = [];
for (let i = 0; i < 4; i++) {
	let ball = createSprite(imgBall);
	ball.speed = 1;
	ball.reset = function () {
		// acceptable angle in radians, not too far straight
		// up and down or straight left and right
		let theta = (Math.random() * 0.3 + 0.1) * Math.PI;

		// put it in a random quadrant
		let quadrants = [0, 0.5, 1, 1.75];
		let quad = quadrants[Math.floor(Math.random() * 4)];
		theta += quad * Math.PI;

		// (x, y) = (r * cos(theta), r * sin(theta)))
		this.velocity.x = this.speed * Math.cos(theta);
		this.velocity.y = this.speed * Math.sin(theta);

		this.x = 123;
		this.y = 96;
	};
	balls.push(ball);
}

let isGameOver = false;
let servedBalls = 0;
let activeBalls = 0;

async function gameOver() {
	isGameOver = true;
	background(0);
	await alert('Game Over');
	erase();
	servedBalls = 0;
	activeBalls = 0;
	score = 0;
	for (let i = 0; i < 4; i++) {
		let ball = balls[i];
		ball.active = false;
	}
	isGameOver = false;
	spawn();
}

async function spawn() {
	for (let i = 0; i < 4; i++) {
		if (isGameOver) return;
		let ball = balls[i];
		ball.reset();
		ball.active = true;
		servedBalls++;
		activeBalls++;
		await delay(4000);
	}
}

spawn();

function draw() {
	clear();
	background(colorPal('u'));

	paddleUp.x = mouseX - paddleUp.w / 2;
	paddleDown.x = mouseX - paddleDown.w / 2;
	paddleLeft.y = mouseY - paddleLeft.h / 2;
	paddleRight.y = mouseY - paddleRight.h / 2;

	for (let i = 0; i < balls.length; i++) {
		let ball = balls[i];
		ball.bounce(paddleUp);
		ball.bounce(paddleDown);
		ball.bounce(paddleLeft);
		ball.bounce(paddleRight);

		// if the ball leaves the screen
		if (ball.x < -10 || ball.x > width + 10 || ball.y < -10 || ball.y > height + 10) {
			ball.reset();
		}
	}

	drawSprites();
}
