let miniBulb, oldBulb, robot, stdBulb, tower, tv;

function preload() {
	miniBulb = loadTextAni('miniBulb.txt');
	oldBulb = loadTextAni('oldBulb.txt');
	robot = loadTextAni('robot.txt');
	stdBulb = loadTextAni('stdBulb.txt');
	tower = loadTextAni('tower.txt');
	tv = loadTextAni('tv.txt');
}

function start() {}

function draw() {
	textAni(stdBulb, 1, 11);
	textAni(tower, 15, 25);
	textAni(robot, 14, 1);
	textAni(tv, 2, 1);
}
