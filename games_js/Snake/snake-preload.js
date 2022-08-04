function preload() {
	eatSound = loadSound(QuintOS.dir + '/sounds/retro_collect_pickup_item_20.wav');
	eatSound.setVolume(0.3);

	crashSound = loadSound(QuintOS.dir + '/sounds/retro_crash_damage_01.wav');
	crashSound.setVolume(0.3);

	moveSounds = [];

	for (let i = 1; i < 10; i++) {
		sound = loadSound(QuintOS.dir + '/sounds/Footstep1__00' + i + '.wav');
		sound.setVolume(0.3);
		moveSounds[i] = sound;
	}

	world = new World(0, 0, 8);
	world.offset.y = 16;
	world.spriteSheet = loadImage(QuintOS.dir + '/img/world.png');

	bg = new Group();
	bg.layer = 0;
	bg.collider = 'none';

	for (let i = 0; i < 10; i++) {
		bg.addAni('grass' + i, [i, 1]);
	}

	eggs = new Group();
	eggs.layer = 2;
	eggs.addAni('egg', [0, 0]);

	pipes = new Group();
	pipes.layer = 1;
	pipes.collider = 'none';
	pipes.addAnis({
		'+': [0, 2],
		'├': [1, 2],
		'-': [2, 2],
		'┤': [3, 2],
		'┬': { pos: [1, 2], rotation: 90 },
		'|': { pos: [2, 2], rotation: 90 },
		'┴': { pos: [3, 2], rotation: 90 },
		'┌': [4, 2],
		'┐': [5, 2],
		'└': [6, 2],
		'┘': [7, 2]
	});

	snake = new Group();
	snake.layer = 3;
	snake.collider = 'none';
	snake.heading = 'up';
	snake.spriteSheet = loadImage(QuintOS.dir + '/img/snakes.png');

	snake.addAnis({
		'head-up': [0, 0],
		'blink-up': [1, 0],
		'head-left': [6, 0],
		'blink-left': [7, 0],
		'eat-up': { pos: [0, 1], frames: 5 },
		'eat-left': { pos: [5, 1], frames: 5 },
		'body-up': { pos: [2, 0], frames: 2, delay: 40 },
		'tail-up': { pos: [4, 0], frames: 2, delay: 40 },
		'body-left': { pos: [8, 0], frames: 2, delay: 40 },
		'tail-left': { pos: [10, 0], frames: 2, delay: 40 },
		curve: { pos: [10, 1], frames: 2, delay: 40 },
		'bodyhalf-up': { pos: [12, 0], frames: 2, delay: 40 },
		'bodyhalf-left': { pos: [12, 1], frames: 2, delay: 40 }
	});

	icons = new Group();
	icons.layer = 1;
	icons.collider = 'none';
	icons.tileSize = 16;
	icons.spriteSheet = loadImage(QuintOS.dir + '/img/icons.png');

	icons.addAnis({
		Normal: [0, 0],
		Reverse: [1, 0]
	});
	icons.tileSize = 8;
}
