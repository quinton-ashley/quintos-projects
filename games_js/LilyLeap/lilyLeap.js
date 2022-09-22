let frog, lilypads;

function preload() {
	frog = new Sprite();
	frog.spriteSheet = loadImage('frog_jump.png');

	lilypads = new Group();
	lilypads.spriteSheet = loadImage('lilypads.png');
}

function setup() {
	world.gravity.y = 10;
	noStroke();

	frog.x = 16;
	frog.y = 90;
	frog.w = 10;
	frog.h = 8;
	frog.addAni('jump', {
		size: [32, 16],
		frames: 7
	});
	frog.animation.stop();
	frog.animation.looping = false;
	frog.animation.endOnFirstFrame = true;

	frog.rotationLock = true;

	lilypads.addAni('pads', {
		size: 16,
		frames: 12
	});
	lilypads.layer = 0;
	lilypads.x = 0;
	lilypads.y = 90;
	lilypads.w = 10;
	lilypads.h = 2;
	lilypads.collider = 'static';

	generateLilyPads();

	alert('Press the up arrow key to jump one lily pad. Press right arrow to jump two.', 2);
}

function generateLilyPads() {
	let skip = 0;
	for (let i = 0; i < 50; i++) {
		if (i == skip) {
			skip += round(random(2, 7));
			continue;
		}
		let lily = new lilypads.Sprite();
		lily.x = i * 16;
		lily.animation.frame = round(random(0, 9));
		lily.animation.frameDelay = round(random(100, 200));
		if (random() < 0.5) {
			lily.animation.rewind();
		}
	}
}

function draw() {
	background('0');
	fill('3');
	rect(0, 0, width, 90);

	// frog is not mid-jump and not falling
	// the frog is sitting on a lilypad
	if (frog.y > 83 && frog.vel.y < 1) {
		// round the x position of the frog to be at exactly
		// the same x position as the nearest lilypad
		frog.x = round(frog.x / 16) * 16;

		if (kb.pressed('ArrowUp')) {
			frog.animation.play();
			frog.velocity.y = -1.4;
			frog.velocity.x = 0.9;
		} else if (kb.pressed('ArrowRight')) {
			frog.animation.play();
			frog.velocity.y = -2;
			frog.velocity.x = 1.4;
		}
	}

	camera.x = frog.x + 64;

	if (frog.y > 600) {
		lilypads.removeAll();
		frog.x = 16;
		frog.y = 90;
		frog.vel.x = 0;
		frog.vel.y = 0;
		generateLilyPads();
	}
}
