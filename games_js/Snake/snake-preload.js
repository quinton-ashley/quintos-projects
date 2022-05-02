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

let world = createTiles(8, 0, 16);
world.spriteSheet = loadImage(QuintOS.dir + '/img/world.png');

for (let i = 0; i < 10; i++) {
	world.addAni('grass' + i, { pos: [1, i] });
}

let pipes = world.createGroup();
pipes.addAni('pipe-horiz', { pos: [2, 0] });
pipes.addAni('pipe-start', { pos: [2, 1] });
pipes.addAni('pipe-middle', { pos: [2, 2] });
pipes.addAni('pipe-end', { pos: [2, 3] });
pipes.addAni('pipe-topLeft', { pos: [2, 4] });
pipes.addAni('pipe-topRight', { pos: [2, 5] });
pipes.addAni('pipe-bottomLeft', { pos: [2, 6] });
pipes.addAni('pipe-bottomRight', { pos: [2, 7] });

world.addAni('egg', { pos: [0, 0] });

let snake = world.createGroup();
snake.spriteSheet = loadImage(QuintOS.dir + '/img/snakes.png');
snake.addAni('head-up', { pos: [0, 0] });
snake.addAni('blink-up', { pos: [0, 1] });
snake.addAni('head-left', { pos: [0, 6] });
snake.addAni('blink-left', { pos: [0, 7] });
snake.addAni('eat-up', { pos: [1, 0], frames: 5 });
snake.addAni('eat-left', { pos: [1, 5], frames: 5 });
snake.addAni('body-up', { pos: [0, 2], frames: 2, delay: 40 });
snake.addAni('tail-up', { pos: [0, 4], frames: 2, delay: 40 });
snake.addAni('body-left', { pos: [0, 8], frames: 2, delay: 40 });
snake.addAni('tail-left', { pos: [0, 10], frames: 2, delay: 40 });
snake.addAni('curve', { pos: [1, 10], frames: 2, delay: 40 });
snake.addAni('bodyhalf-up', { pos: [0, 12], frames: 2, delay: 40 });
snake.addAni('bodyhalf-left', { pos: [1, 12], frames: 2, delay: 40 });

let icons = createTiles(16).createGroup('icons');
icons.spriteSheet = loadImage(QuintOS.dir + '/img/icons.png');
icons.addAni('Normal', { pos: [0, 0] });
icons.addAni('Reverse', { pos: [0, 1] });
