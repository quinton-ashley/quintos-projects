let frog, lilypads, bugs, time, jump1, jump2, death;

let score = 0,
	countDown = 10,
	bugPositions = [],
	isPlaying = false;

function preload() {
	frog = new Sprite();
	frog.addAni('frog_jump.png', { size: [32, 16], frames: 7 });
	lilypads = new Group();
	lilypads.addAni('lilypads.png', { size: [16, 16], frames: 12 });
	jump1 = loadSound('sounds/retro_jump_bounce_08.wav');
	jump2 = loadSound('sounds/retro_jump_bounce_09.wav');
	death = loadSound('sounds/retro_jump_bounce_12.wav');
	jump1.setVolume(0.2);
	jump2.setVolume(0.3);
	death.setVolume(0.3);

	let bugImg = spriteArt(`
	0  
	00 00
	0 0 0`);
	bugs = new Group();
	bugs.image = bugImg;
}

async function setup() {
	world.gravity.y = 10;
	noStroke();

	frog.x = 16;
	frog.y = 83;
	frog.w = 10;
	frog.h = 8;
	frog.rotationLock = true;
	frog.ani.stop();
	frog.layer = 1;

	bugs.y = 83;

	lilypads.y = 90;
	lilypads.w = 10;
	lilypads.h = 2;
	lilypads.collider = 'static';
	lilypads.layer = 0;

	frog.overlaps(bugs, eatBug);

	makeLilyPads();
	makeBugs();

	background('2');

	await alert('Press the up arrow key to jump one lily pad. Press right arrow to jump two.', 2);
	isPlaying = true;
	time = Date.now();
}

function eatBug(frog, bug) {
	bug.remove();
	countDown += 2;
}

function makeLilyPads() {
	/* Part A: Use a loop to make more lily pads. */
	let bugSpacing = 5;
	for (let i = 0, l = 1; i < 160; i++, l++) {
		let lily = new lilypads.Sprite();
		lily.x = 16 + i * 16;
		lily.ani.frame = round(random(0, 11));
		lily.ani.frameDelay = round(random(100, 140));

		if (l % bugSpacing == 0) {
			bugPositions.push(16 + i * 16);
		}

		if (l == 25) bugSpacing = 6;
		else if (l == 60) bugSpacing = 7;
		else if (l == 90) bugSpacing = 8;

		if (random() > 0.6) {
			i++;
		}
	}
}

function makeBugs() {
	for (let i = 0; i < bugPositions.length; i++) {
		let bug = new bugs.Sprite();
		bug.x = bugPositions[i];
	}
}

function update() {
	if (!isPlaying) return;

	// if frog is on the ground
	if (frog.y >= 83 && frog.vel.y < 1) {
		frog.x = round(frog.x / 16) * 16;
		frog.ani.stop();
		frog.ani.frame = 0;

		// then it can jump
		if (kb.presses('up')) {
			// little jump
			frog.velocity.y = -1.4;
			frog.velocity.x = 0.975;
			frog.ani.play();
			score += 1;
			txt(score + '  ', 17, 17);
			jump1.play();
		} else if (kb.presses('right')) {
			// BIG jump!
			frog.velocity.y = -2;
			frog.velocity.x = 1.355;
			frog.ani.play();
			score += 2;
			txt(score + '  ', 17, 17);
			jump2.play();
		}
	}
}

function drawFrame() {
	background('0');
	fill('3');
	rect(0, 0, width, 90);

	if (!isPlaying) return;

	camera.x = frog.x + 64;

	// reset if the frog falls or if the countdown timer runs out
	if (frog.y > 300 || countDown < 0) gameOver();

	if (score >= 160) gameWin();

	txt(countDown + ' '.repeat(5), 0, 17);

	if (frameCount % 60 == 0) countDown--;
}

function gameWin() {
	isPlaying = false;
	txt('The Frog Came Home From Work. Good Job!', 3);
}

async function gameOver() {
	isPlaying = false;
	frog.speed = 0;
	death.play();
	txt('Game Over! Your score is: ' + score, 4);
	await delay(2000);
	txt('                                ', 4);
	frog.x = 16;
	frog.y = 83;
	frog.speed = 0;
	score = 0;
	txt(score + '  ', 17, 17);
	countDown = 10;
	bugs.removeAll();
	makeBugs();
	txt(score + ' '.repeat(5), 0, 17);
	isPlaying = true;
}
