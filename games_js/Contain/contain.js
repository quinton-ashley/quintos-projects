// screen width is 256, height is 192

let imgBall = spriteArt(`
..ygyg..
.yg..gy.
yg....gy
y......g
g......y
yg....gy
.yg..gy.
..ygyg..`);

// the \n means new line
let imgPaddle = spriteArt('.wwwwww.\nwwwwwwww\n' + 'ww....ww\n'.repeat(22) + 'wwwwwwww\n.wwwwww.');
serve();
// places a ball in center of the screen
async function serve() {
	let balls = new Group();
	for (let i = 0; i < 4; i++) {
		log('3');
		await delay(1000);
		log('2');
		await delay(1000);
		log('1');
		await delay(1000);
		let ball = new Sprite(imgBall);
		ball.x = width / 2;
		ball.y = height / 2;
		let rand = Math.random() * 1.25 + 0.25;
		let rand2 = Math.random() * 1.25 + 0.25;

		ball.velocity.x = rand;
		ball.velocity.y = rand2;
		ball.bounciness = 1;
		ball.friction = 0;
		ball.rotationLocked = true;
		balls.push(ball);
	}
}

/* PART A0: create two paddles, place on each end of the screen */
let paddleL = new Sprite(imgPaddle);
paddleL.x = 16;
paddleL.y = height / 2;
paddleL.static = true;
paddleL.rotation = -180;

let paddleR = new Sprite(imgPaddle);
paddleR.x = width - 16 - paddleR.w;
paddleR.y = height / 2;
paddleR.static = true;

let increment = 0.1;
let scoreL = 0;
let scoreR = 0;

function displayScore() {
	text(scoreL, 3, 13);
	text(scoreR, 3, 19);
}

displayScore();

function draw() {
	background(0);

	/* PART A1: draw the ball and paddles inside the p5 main draw function */
	// the `width` and `height` variables are the width and height of the screen

	if (keyIsDown('ArrowUp') && paddleR.rotation > -89) {
		paddleR.rotation -= 2;
	} else if (keyIsDown('ArrowDown') && paddleR.rotation < 89) {
		paddleR.rotation += 2;
	}
	paddleR.x = 88 * cos(paddleR.rotation) + width / 2;
	paddleR.y = 88 * sin(paddleR.rotation) + height / 2;

	if (keyIsDown('w') && (paddleL.rotation > 89 || paddleL.rotation < -91)) {
		paddleL.rotation += 2;
	} else if (keyIsDown('s') && (paddleL.rotation > 91 || paddleL.rotation < -89)) {
		paddleL.rotation -= 2;
	}
	paddleL.x = 88 * cos(paddleL.rotation) + width / 2;
	paddleL.y = 88 * sin(paddleL.rotation) + height / 2;
}
