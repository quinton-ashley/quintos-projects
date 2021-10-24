let loading = true;

function keyPressed() {
	if (player.isMoving) return;
	if (keyCode === UP_ARROW) {
		player.walk('up');
	} else if (keyCode === DOWN_ARROW) {
		player.walk('down');
	} else if (keyCode === LEFT_ARROW) {
		player.walk('left');
	} else if (keyCode === RIGHT_ARROW) {
		player.walk('right');
	}
}

player.walk = async function (direction) {
	let aniName = 'walk-' + direction;
	if (direction == 'left' || direction == 'right') {
		aniName = 'walk-lr';
	}

	world.move(player, 0.85, direction);

	// the name of the current animation being used
	let cur = this.getAnimationLabel();

	// player is already walking that way or turning
	// no need to change animation
	if (cur == aniName || cur == 'idle-turn') return;

	// have the player turn before walking upwards
	if (direction != 'up') {
		this.ani(aniName);
	} else {
		await this.ani('idle-turn');
		this.ani('walk-up');
	}

	if (direction == 'left') {
		this.mirrorX(-1); // flip the character left
	} else {
		this.mirrorX(1);
	}
};

player.idle = function () {
	// switch between idle animations
	// some have a higher probability of occurring than others
	async function _idle() {
		let chance = Math.random();

		if (chance > 0.4) {
			await player.ani('idle-stand');
		} else if (chance > 0.2) {
			await player.ani('idle-blink');
		} else if (chance > 0.1) {
			await player.ani('idle-think');
		} else if (chance > 0.05) {
			await player.ani('idle-scratch');
		} else {
			await player.ani('idle-yawn');
		}
		_idle();
	}

	// the name of the current animation being used
	let cur = this.getAnimationLabel();

	if (cur == 'walk-up') {
		this.ani('idle-turn');
		this.animation.changeFrame(2);
		this.animation.goToFrame(0);
		this.animation.onComplete = () => {
			this.ani('idle-stand');
			this.animation.onComplete = _idle;
		};
	} else if (!cur.includes('idle')) {
		this.ani('idle-stand');
		this.animation.onComplete = _idle;
	}
};

for (let i = 0; i < 10; i++) {
	//          tile(row, col, ani)
	world.walls.tile(0, 1 + i, 'wall-up');
	world.walls.tile(11, 1 + i, 'wall-down');
	world.walls.tile(1 + i, 0, 'wall-left');
	world.walls.tile(1 + i, 11, 'wall-right');
}

//       tile(row, col, layer, ani)
world.boxes.tile(2, 2, 1, 'box');

loading = false;

function draw() {
	if (loading) return;
	clear();
	background(0);

	player.collide(world.walls); // handles player collisions with walls
	player.displace(world.boxes);
	world.boxes.collide(world.walls);

	if (!player.isMoving) player.idle();

	// snap boxes to nearest tile (row, col)
	// when player stops moving
	world.update({ snap: !player.isMoving });
	// p5.play function for drawing all sprites
	drawSprites();
}
