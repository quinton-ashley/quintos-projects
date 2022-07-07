// image assets location
let imgDir = QuintOS.dir + '/img/bitBoi';

/* WORLD */

let world = new World(0, 0, 16);
world.offset.x = 96;
world.offset.y = 48;
world.autoResetAnimations = true;
world.spriteSheet = loadImage(imgDir + '/world16.png');

let walls = new Group();
walls.collider = 'static';
let atlases = {
	'wall-up': [0, 1],
	'wall-down': [2, 1],
	'wall-left': [1, 0],
	'wall-right': [1, 2],
	'wall-topleft': [0, 0],
	'wall-topright': [0, 2],
	'wall-bottomleft': [2, 0],
	'wall-bottomright': [2, 2],
	fire: { pos: [19, 2], frames: 2, delay: 10 },
	'creature-16': [22, 4],
	'creature-17': [22, 5],
	'creature-18': [22, 6],
	'creature-19': [22, 7],
	'creature-20': { pos: [22, 0], frames: 4, delay: 20 }
};

for (let i = 0; i < 16; i++) {
	atlases['creature-' + i] = [10, i];
}

{
	let i = 0;
	for (let row = 16; row < 21; row++) {
		for (let col = 13; col < 16; col++) {
			atlases['furniture-' + i] = [row, col];
			i++;
		}
	}
}

walls.addAnis(atlases);

let boxes = new Group();
boxes.layer = 1;
// loads the animation for the tile representing the box
// at row 5, column 0 in the tile sheet
boxes.addAni('box', [5, 0]);

/* PART A: Choose a tile to represent the box goal positions on the floor */
let goals = new Group();
goals.layer = 0;
goals.addAni('goal', [15, 1]);
goals.overlap(allSprites);

/* PLAYER */

let player = new Sprite(0, 0);
player.layer = 1;
player.spriteSheet = loadImage(imgDir + '/bitBoi16.png');

player.addAnis({
	'idle-stand': { line: 0, frames: 4, delay: 20 },
	'idle-blink': { line: 1, frames: 4, delay: 10 },
	'idle-think': { line: 20, frames: 8, delay: 20 },
	'idle-scratch': { line: 21, frames: 14, delay: 10 },
	'idle-yawn': { line: 22, frames: 2, delay: 60 },
	'idle-turn': { line: 17, frames: 3 },
	'walk-lr': { line: 3, frames: 5, delay: 5 },
	'walk-up': { line: 18, frames: 6 },
	'walk-down': { line: 16, frames: 6 },
	'push-lr': { line: 13, frames: 5 },
	'push-up': { line: 15, frames: 6 },
	'push-down': { line: 14, frames: 6 },
	dance: { line: 2, frames: 4, delay: 6 }
});
