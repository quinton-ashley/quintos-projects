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
	world.loadAni('grass' + i, { pos: [1, i] });
}

let pipes = world.createGroup('pipes');
pipes.loadAni('pipe-horiz', { pos: [2, 0] });
pipes.loadAni('pipe-start', { pos: [2, 1] });
pipes.loadAni('pipe-middle', { pos: [2, 2] });
pipes.loadAni('pipe-end', { pos: [2, 3] });
pipes.loadAni('pipe-topLeft', { pos: [2, 4] });
pipes.loadAni('pipe-topRight', { pos: [2, 5] });
pipes.loadAni('pipe-bottomLeft', { pos: [2, 6] });
pipes.loadAni('pipe-bottomRight', { pos: [2, 7] });

world.loadAni('egg', { pos: [0, 0] });

let snake = world.createGroup('snake');
snake.spriteSheet = loadImage(QuintOS.dir + '/img/snakes.png');
snake.loadAni('head-up', { pos: [0, 0] });
snake.loadAni('blink-up', { pos: [0, 1] });
snake.loadAni('head-left', { pos: [0, 6] });
snake.loadAni('blink-left', { pos: [0, 7] });
snake.loadAni('eat-up', { pos: [1, 0], frames: 5 });
snake.loadAni('eat-left', { pos: [1, 5], frames: 5 });
snake.loadAni('body-up', { pos: [0, 2], frames: 2, delay: 40 });
snake.loadAni('tail-up', { pos: [0, 4], frames: 2, delay: 40 });
snake.loadAni('body-left', { pos: [0, 8], frames: 2, delay: 40 });
snake.loadAni('tail-left', { pos: [0, 10], frames: 2, delay: 40 });
snake.loadAni('curve', { pos: [1, 10], frames: 2, delay: 40 });
