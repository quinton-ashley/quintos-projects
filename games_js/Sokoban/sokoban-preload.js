// image assets location
let imgDir = QuintOS.dir + '/img/bitBoi';

/* WORLD */

let world = new World(0, 0, 16);
world.spriteSheet = loadImage(imgDir + '/world16.png');

let walls = world.createGroup();
walls.addAni('wall-up', { pos: [0, 1] });
walls.addAni('wall-down', { pos: [2, 1] });
walls.addAni('wall-left', { pos: [1, 0] });
walls.addAni('wall-right', { pos: [1, 2] });
walls.addAni('wall-topleft', { pos: [0, 0] });
walls.addAni('wall-topright', { pos: [0, 2] });
walls.addAni('wall-bottomleft', { pos: [2, 0] });
walls.addAni('wall-bottomright', { pos: [2, 2] });

walls.addAni('fire', { pos: [19, 2], frames: 2, delay: 10 });

for (let i = 0; i < 16; i++) {
	walls.addAni('creature-' + i, { pos: [10, i] });
}
walls.addAni('creature-16', { pos: [22, 4] });
walls.addAni('creature-17', { pos: [22, 5] });
walls.addAni('creature-18', { pos: [22, 6] });
walls.addAni('creature-19', { pos: [22, 7] });
walls.addAni('creature-20', { pos: [22, 0], frames: 4, delay: 20 });

{
	let i = 0;
	for (let row = 16; row < 21; row++) {
		for (let col = 13; col < 16; col++) {
			walls.addAni('furniture-' + i, { pos: [row, col] });
			i++;
		}
	}
}

let boxes = world.createGroup();
// loads the animation for the tile representing the box
// at row 5, column 0 in the tile sheet
boxes.addAni('box', { pos: [5, 0] });

/* PART A: Choose a tile to represent the box goal positions on the floor */
let goals = world.createGroup();
goals.addAni('goal', { pos: [15, 1] });

/* PLAYER */

//                 createSprite(x, y, layer)
let player = world.createSprite(5, 5, 1);
player.spriteSheet = loadImage(imgDir + '/bitBoi16.png');

player.addAni('idle-stand', { line: 0, frames: 4, delay: 20 });
player.addAni('idle-blink', { line: 1, frames: 4, delay: 10 });
player.addAni('idle-think', { line: 20, frames: 8, delay: 20 });
player.addAni('idle-scratch', { line: 21, frames: 14, delay: 10 });
player.addAni('idle-yawn', { line: 22, frames: 2, delay: 60 });
player.addAni('idle-turn', { line: 17, frames: 3 });
player.addAni('walk-lr', { line: 3, frames: 5, delay: 5 });
player.addAni('walk-up', { line: 18, frames: 6 });
player.addAni('walk-down', { line: 16, frames: 6 });
player.addAni('push-lr', { line: 13, frames: 5 });
player.addAni('push-up', { line: 15, frames: 6 });
player.addAni('push-down', { line: 14, frames: 6 });
player.addAni('dance', { line: 2, frames: 4, delay: 6 });
