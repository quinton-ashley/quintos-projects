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

let snake = world.createGroup('snake');
snake.spriteSheet = loadImage(QuintOS.dir + '/img/snakes.png');
snake.loadAni('eat-up', { pos: [1, 0], frames: 5, delay: 10 });
snake.loadAni('eat-left', { pos: [1, 5], frames: 5, delay: 10 });

snake.loadAni('head-up', { pos: [0, 0] });
snake.loadAni('blink-up', { pos: [0, 1] });
snake.loadAni('body-up', { pos: [0, 2], frames: 2, delay: 10 });
snake.loadAni('tail-up', { pos: [0, 4], frames: 2, delay: 10 });
snake.loadAni('head-left', { pos: [0, 6] });
snake.loadAni('blink-left', { pos: [0, 7] });
snake.loadAni('body-left', { pos: [0, 8], frames: 2, delay: 10 });
snake.loadAni('tail-left', { pos: [0, 10], frames: 2, delay: 10 });

let items = world.createGroup('items');
items.loadAni('apple', { pos: [0, 3] });
