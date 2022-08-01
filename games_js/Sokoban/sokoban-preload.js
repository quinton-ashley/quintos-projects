async function setup() {
	// image assets location
	let imgDir = QuintOS.dir + '/img/bitBoi';

	world = new World(0, 0, 16);
	world.offset.x = 96;
	world.offset.y = 48;
	world.autoResetAnimations = true;
	world.spriteSheet = await loadImage(imgDir + '/world16.png');

	walls = new Group();
	walls.collider = 'static';
	let atlases = {
		'wall-up': [1, 0],
		'wall-down': [1, 2],
		'wall-left': [0, 1],
		'wall-right': [2, 1],
		'wall-topleft': [0, 0],
		'wall-topright': [2, 0],
		'wall-bottomleft': [0, 2],
		'wall-bottomright': [2, 2],
		fire: { pos: [2, 19], frames: 2, delay: 10 },
		'creature-16': [4, 22],
		'creature-17': [5, 22],
		'creature-18': [6, 22],
		'creature-19': [7, 22],
		'creature-20': { pos: [0, 22], frames: 4, delay: 20 }
	};

	for (let i = 0; i < 16; i++) {
		atlases['creature-' + i] = [i, 10];
	}

	{
		let i = 0;

		for (let x = 13; x < 16; x++) {
			for (let y = 16; y < 21; y++) {
				atlases['furniture-' + i] = [x, y];
				i++;
			}
		}
	}

	walls.addAnis(atlases);

	boxes = new Group();
	boxes.layer = 1;
	// loads the animation for the tile representing the box
	// at row 5, column 0 in the tile sheet
	boxes.addAni('box', [0, 5]);

	/* PART A: Choose a tile to represent the box goal positions on the floor */
	goals = new Group();
	goals.layer = 0;
	goals.addAni('goal', [1, 15]);
	goals.overlap(allSprites);

	/* PLAYER */

	player = new Sprite();
	player.layer = 1;
	player.spriteSheet = await loadImage(imgDir + '/bitBoi16.png');

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
	player.ani = 'idle-stand';

	player.steps = 0;
}
