let eatSound = loadSound(QuintOS.dir + '/sounds/retro_collect_pickup_item_20.wav');
eatSound.setVolume(0.3);

let crashSound = loadSound(QuintOS.dir + '/sounds/retro_crash_damage_01.wav');
crashSound.setVolume(0.3);

let moveSounds = [];

for (let i = 1; i < 10; i++) {
	let sound = loadSound(QuintOS.dir + '/sounds/Footstep1__00' + i + '.wav');
	sound.setVolume(0.3);
	moveSounds[i] = sound;
}

let world = new World(0, 0, 8);
world.offset.y = 16;
world.spriteSheet = loadImage(QuintOS.dir + '/img/world.png');

let bg = new Group();
bg.layer = 0;
bg.collider = 'none';

for (let i = 0; i < 10; i++) {
	bg.addImg('grass' + i, [1, i]);
}

bg.addAni('egg', [0, 0]);

let pipes = new Group();
pipes.layer = 1;
pipes.collider = 'none';
pipes.addAnis({
	'+': [2, 0],
	'├': [2, 1],
	'-': [2, 2],
	'┤': [2, 3],
	'┬': { pos: [2, 1], rotate: 90 },
	'|': { pos: [2, 2], rotate: 90 },
	'┴': { pos: [2, 3], rotate: 90 },
	'┌': [2, 4],
	'┐': [2, 5],
	'└': [2, 6],
	'┘': [2, 7]
});

let snake = new Group();
snake.layer = 2;
snake.collider = 'none';
snake.spriteSheet = loadImage(QuintOS.dir + '/img/snakes.png');

snake.addAnis({
	'head-up': [0, 0],
	'blink-up': [0, 1],
	'head-left': [0, 6],
	'blink-left': [0, 7],
	'eat-up': { pos: [1, 0], frames: 5 },
	'eat-left': { pos: [1, 5], frames: 5 },
	'body-up': { pos: [0, 2], frames: 2, delay: 40 },
	'tail-up': { pos: [0, 4], frames: 2, delay: 40 },
	'body-left': { pos: [0, 8], frames: 2, delay: 40 },
	'tail-left': { pos: [0, 10], frames: 2, delay: 40 },
	curve: { pos: [1, 10], frames: 2, delay: 40 },
	'bodyhalf-up': { pos: [0, 12], frames: 2, delay: 40 },
	'bodyhalf-left': { pos: [1, 12], frames: 2, delay: 40 }
});

let icons = new Group();
icons.layer = 1;
icons.collider = 'none';
icons.tileSize = 16;
icons.spriteSheet = loadImage(QuintOS.dir + '/img/icons.png');

icons.addAnis({
	Normal: [0, 0],
	Reverse: [0, 1]
});
