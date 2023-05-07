document.querySelector('.screen').style.cursor = 'none';

// an array of color letters
let colors = Object.keys(QuintOS.palettes[0]);
// scale each color pixel by 10
let paletteBoxes = spriteArt(colors, 10);

let brush = `
b
bbb
bbbb
bbbb
.bbww
...wnn
.....nn
......nn
.......nn
........nn
.........nn`;

let brushImg = spriteArt(brush);
let brushColor = 'b'; // black

let width = 20;
let height = 10;
let scale = 16;
let pixels = [];
let choosingBg = true;

class Pixel {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = 'd';
	}

	draw() {
		fill(this.color);
		stroke(0);
		rect(this.x, this.y, scale, scale);
	}
}

async function pickSize() {
	// let size = await prompt("Canvas size (ex. 10x10): ", 5, 5, 35);
	// size = size.split('x');
	// width = size[0];
	// height = size[1];

	for (let i = 0; i < width; i++) {
		pixels.push([]);
		for (let j = 0; j < height; j++) {
			pixels[i].push(new Pixel(30 + i * scale, 5 + j * scale));
		}
	}

	txt('pick background color', 5, 5);
}

pickSize();

function draw() {
	background(50);
	if (!pixels.length) return;

	if (!choosingBg) {
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				pixels[i][j].draw();
			}
		}
	}
	image(paletteBoxes, 0, 0);
	image(brushImg, mouseX, mouseY);
	if (mouseIsPressed) {
		drawOnPixels();
	}
}

function changeBackgroundColor(c) {
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			pixels[i][j].color = c;
		}
	}
}

async function changeBrushColor(c) {
	if (choosingBg) {
		changeBackgroundColor(c);
		await erase();
		let reBtn = button('Save Image', 24, 30, () => {
			saveImage();
		});
		choosingBg = false;
	}
	let _brush = brush.replaceAll('k', c);
	brushImg = spriteArt(_brush);
	brushColor = c;
}

function saveImage() {
	let colorBoard = '';
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			colorBoard += pixels[j][i].color;
		}
		colorBoard += '\n';
	}
	log(colorBoard);
	save(spriteArt(colorBoard));
}

function drawOnPixels() {
	log(mouseX, mouseY);
	// If the click is in the pallette area, change the brush color
	// according to the x,y.
	if (mouseX > 0 && mouseX < 25) {
		let y = 0;
		for (let c of colors) {
			if (mouseY > y && mouseY < y + 25) {
				changeBrushColor(c);
			}
			y += 10;
		}
		return;
	}

	// if clicked, change the pixel's color.
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			let p = pixels[i][j];

			if (mouseX > p.x && mouseX < p.x + scale && mouseY > p.y && mouseY < p.y + scale) {
				p.color = brushColor;
			}
		}
	}
}

function mouseWheel(event) {
	log(event.delta);
	//move the square according to the vertical scroll amount
	scale += event.delta / 30;
	let brushX = null;
	let brushY = null;
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			let p = pixels[i][j];

			if (mouseX > p.x && mouseX < p.x + scale && mouseY > p.y && mouseY < p.y + scale) {
				brushX = i;
				brushY = j;
			}
		}
	}
	if (brushX == null && brushY == null) {
		let minDistX = 1000000;
		let minDistY = 1000000;

		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				let p = pixels[i][j];

				let distX = Math.abs(p.x - mouseX);
				let distY = Math.abs(p.y - mouseY);

				if (distX < minDistX) {
					minDistX = distX;
					brushX = i;
				}
				if (distY < minDistY) {
					minDistY = distY;
					brushY = j;
				}
			}
		}
	}

	log(brushX, brushY);
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			if (i == brushX && j == brushY) {
				log('before : ', pixels[i][j].x, pixels[i][j].y);
			}
			pixels[i][j].x = mouseX - (brushX + 0.5) * scale + i * scale;
			pixels[i][j].y = mouseY - (brushY + 0.5) * scale + j * scale;
			if (i == brushX && j == brushY) {
				log('after : ', pixels[i][j].x, pixels[i][j].y);
			}
		}
	}
	//uncomment to block page scrolling
	return false;
}
