// screen width is 320, height is 400
let imgBall = spriteArt(`
..uuuy
.wuuuyu
wuuuyyuw
uyyyyuuu
yyuuyuuu
wuuuyyuu
.uuuuyu
..wuuy`);

let imgPlatform = spriteArt(
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

class Ball {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.w = r * 2;
		this.h = r * 2;
		this.vel = {
			x: 0,
			y: 0
		};
		this.speed = 1;
	}

	draw() {
		this.vel.y += 0.25;
		/* PART A2: make the ball move */
		this.x += (mouse.x - this.x) * 0.02;
		// this.x += this.vel.x;
		this.y += this.vel.y;
		image(imgBall, this.x, this.y);
	}
}

class Platform {
	constructor(x, y, w, h) {
		this.x = x || 0;
		this.y = y || 0;
		this.w = w || 54;
		this.h = h || 8;
		this.vel = {
			x: 0,
			y: 0
		};
		this.speed = 0;
	}

	spawn() {
		// platfromX range btw
		this.x = 25 + Math.random() * 260;
		this.y = prevPlatY - (dist + Math.random() * 25);
		prevPlatY = this.y;
	}

	draw() {
		this.y += this.vel.y;
		image(imgPlatform, this.x, this.y);
	}
}

let ball = new Ball(175, 200, 4);

function intersectsRect(a, b) {
	// right  zone            left zone
	if (a.x > b.x + b.w || a.x + a.w < b.x || a.y + a.h < b.y || (a.y > b.y + b.h && goingUp == false)) {
		// top                bottom
		return false; //if this is all false the function becomes true
	}
	// log(a, b);
	return true;
}

let levelProgress, dist, score, initialPlatNum, plats, goingUp, prevPlatY;
let restarting = false;

function init() {
	// reset all variables
	levelProgress = 0;
	initialPlatNum = 20;
	dist = 75;
	score = 0;
	plats = [];
	goingUp = false;
	prevPlatY = 490; // position of the last paddle that was positioned (380 to start)
	ball.x = 175;
	ball.y = 200;
	ball.vel.y = 0;
}

init();

function createPlats() {
	for (let i = 0; i < initialPlatNum; i++) {
		let p = new Platform();
		if (i == 0) {
			p.x = 160;
			p.y = prevPlatY;
		} else {
			p.spawn();
		}
		plats.push(p);
		// log(prevPlatY);
	}
}

createPlats();

function draw() {
	if (ball.y > 415) {
		if (!restarting) restart();
		return;
	}
	txt('score', 2, 20);
	txt(score, 4, 20);
	background(0);
	// every 1000 increase distance, unless distance is already 300 or more
	if (score - levelProgress > 500 && dist < 150) {
		dist += 5;
		levelProgress = score;
	}

	for (let p of plats) {
		// top of the ball is above the top of the platform
		// AND bottom of the ball is below the top of the platform
		// AND the ball must be falling
		// AND the ball and platform are intersecting
		if (ball.y < p.y && ball.y + ball.h > p.y && ball.vel.y >= 0 && intersectsRect(ball, p)) {
			ball.vel.y = -10;
			// log(ball.vel.y);
		}
	}

	// when the ball reaches it's height, scroll the screen down
	goingUp = ball.y < 100 && ball.vel.y < 0;
	if (goingUp) reachNext();

	ball.draw();

	// if the platform passes the bottom, respawn it above.
	for (let p of plats) {
		if (p.y > 400) p.spawn();
		if (p.y > 0) p.draw();
	}
}

function reachNext() {
	// scroll the platforms downwards at the rate of the ball's velocity
	for (let p of plats) {
		p.y += -ball.vel.y;
	}
	prevPlatY += -ball.vel.y;
	score += -ball.vel.y;
	score = Math.floor(score);

	// keep ball in the same place
	ball.y += -ball.vel.y;
}

async function restart() {
	restarting = true;
	await alert('Game over');
	erase(); // erase whole screen

	init();

	createPlats();
	restarting = false;
}
