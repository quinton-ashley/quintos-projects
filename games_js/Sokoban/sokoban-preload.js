// image assets location
let imgDir = QuintOS.dir + '/img/8bit';

/* WORLD */

//    new Tiles(rows, cols, layers, tileSize, x, y)
let world = new Tiles(40, 12, 2, 32, 120, 55);
world.spriteSheet = loadImage(imgDir + '/world.png');

world.addGroup('walls');
world.walls.loadAni('wall-up', { pos: [0, 1] });
world.walls.loadAni('wall-down', { pos: [2, 1] });
world.walls.loadAni('wall-left', { pos: [1, 0] });
world.walls.loadAni('wall-right', { pos: [1, 2] });

world.addGroup('boxes');
// loads the animation for the tile representing the box
// at row 5, column 0 in the tile sheet
world.boxes.loadAni('box', { pos: [5, 0] });

/* PART A: Choose a tile to represent the box goal positions on the floor */
// world.loadAni('goal', { pos: [?, ?] });

/* PLAYER */

//               tile(row, col, layer)
let player = world.tile(5, 5, 1);
player.spriteSheet = loadImage(imgDir + '/player16.png');
// scale by .5 because the player frames are 64x64
// but the world tiles are 32x32
player.scale = 0.5;

player.loadAni('idle-stand', { line: 0, frames: 4, delay: 20 });
player.loadAni('idle-blink', { line: 1, frames: 4, delay: 10 });
player.loadAni('idle-think', { line: 20, frames: 8, delay: 20 });
player.loadAni('idle-scratch', { line: 21, frames: 14, delay: 10 });
player.loadAni('idle-yawn', { line: 22, frames: 2, delay: 60 });
player.loadAni('idle-turn', { line: 17, frames: 3 });
player.loadAni('walk-lr', { line: 3, frames: 5, delay: 5 });
player.loadAni('walk-up', { line: 18, frames: 6 });
player.loadAni('walk-down', { line: 16, frames: 6 });
