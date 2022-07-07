let imgBall = spriteArt(`
..uuuy
.wuuuyu
wuuuyyuw
uyyyyuuu
yyuuyuuu
wuuuyyuu
.uuuuyu
..wuuy`);

let imgPlatform = spriteArt(
	' ' +
		'w'.repeat(52) +
		' \n' +
		'w'.repeat(54) +
		'\n' +
		('ww' + ' '.repeat(50) + 'ww\n').repeat(4) +
		'w'.repeat(54) +
		'\n' +
		' ' +
		'w'.repeat(52)
);

new World(0, 9.8);
let ball = new Sprite(imgBall, 175, 200, 8);
ball.bounciness = 1;

let platforms = new Group();
platforms.addImage(imgPlatform);

platforms.sprite(175, 300, 'static');

function draw() {
	background('b');
}
