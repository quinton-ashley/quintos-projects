let player, platforms;

let isPlaying = false;

function setup() {
	world.gravity.y = 10;

	player = new Sprite(160, 200, 20, 'k');
	player.color = 'yellow';

	platforms = new Group();
	platforms.w = 30;
	platforms.h = 10;
	platforms.color = 'green';
	platforms.collider = 'none';

	// new platforms.Sprite(160, 300);
	// new platforms.Sprite(20, 200);
	// new platforms.Sprite(80, 250);

	// strands of platforms
	for (let i = 0; i < 4; i++) {
		let x = 110 * i;
		let y = 300;

		// make platforms
		let platformAmount = 50;
		if (i == 1) {
			platformAmount = 40;
		}
		if (i == 2) {
			platformAmount = 30;
		}
		if (i == 3) {
			platformAmount = 20;
		}
		for (let j = 0; j < platformAmount; j++) {
			new platforms.Sprite(x, y);

			if (j < 10) {
				x += random(-50, 50);
			} else {
				x += random(-75, 75);
			}

			if (x < 0) {
				x = 0;
			}
			if (x > 320) {
				x = 320;
			}

			if (j < 10) {
				y -= random(30, 70);
			} else {
				y -= random(70, 100);
			}
		}
	}
}

function processMouseMove(event) {
	if (isPlaying) {
		let x = player.x + event.movementX;
		log(x);
		player.moveTowards(x, null, 0.05);
	}
}

document.addEventListener('mousemove', processMouseMove);

function draw() {
	clear();

	if (!isPlaying) {
		player.moveTowards(mouse.x, null, 0.05);
	}

	for (let platform of platforms) {
		if (player.y < platform.y) {
			platform.collider = 'static';
		}
		if (player.y > platform.y) {
			platform.collider = 'none';
		}
	}

	// player collides with platform and is falling
	if (player.collides(platforms) && player.vel.y > -1.7) {
		player.vel.y = -6; // then jump
	}

	if (player.y > camera.y + 230) {
		txt('Game Over', 6, 9);

		isPlaying = false;

		player.collider = 'k';
		player.vel.x = 0;
		player.vel.y = 0;

		document.exitPointerLock();

		if (mouse.presses()) {
			player.y = 200;
			camera.y = 200;
		}
	} else if (!isPlaying && mouse.presses()) {
		erase();
		player.collider = 'dynamic';
		canvas.requestPointerLock();
		isPlaying = true;
	}

	if (player.y < camera.y) {
		camera.y = player.y;
	}
}
