// let time = 0;

// function draw() {
// 	background('b');
// 	translate(width / 2, height / 2);
// 	stroke('w');
// 	strokeWeight(2);

// 	for (let i = 0; i < 100; i++) {
// 		if ((time - i) % 2 == 0) continue;
// 		line(eqX1(time - i), eqY1(time - i), eqX2(time - i), eqY2(time - i));
// 	}

// 	time++;
// }

// function eqX1(t) {
// 	return sin(t * 6) * mouse.x;
// }

// function eqY1(t) {
// 	return cos(t / 2) * mouse.y;
// }

// function eqX2(t) {
// 	return sin(t / 2) * 90;
// }

// function eqY2(t) {
// 	return cos(t * 4) * 70;
// }

let art = 0;

let time = 0;

function draw() {
	stroke('w');
	strokeWeight(1);
	translate(width / 2, height / 2);
	for (let i = 0; i < 1000; i++) {
		point(eqX(time), eqY(time));
		time += 0.1;
	}

	if (kb.presses('left')) {
		background('b');
		art--;
		time = 0;
	}
	if (kb.presses('right')) {
		background('b');
		art++;
		time = 0;
	}
}

function eqX(t) {
	if (art == 0) return sin(t * 2) * 250 + sin(t / 20) * 250;
	if (art == 1) return cos(t * 4) * 20 + sin(t / 10) * 250;
}

function eqY(t) {
	if (art == 0) return cos(t / 2) * 350;
	if (art == 1) return cos(t * 3) * 20 * sin(t / 10) * 20;
}
