const target = `
 .d88b. 
.8P  Y8.
88    88
88    88
 8b  d8 
 'Y88P' `.slice(1);
// slice removes the first character from the string
// in this case I remove the new line at the beginning
// so the first line of the button will be at the proper
// y value

let btn;
let times = [];

/* PART B2: calculate and display player performance statistics */
async function displayStats() {
	// add difference between times in milliseconds to sum
	let speeds = [];
	for (let i = 0; i < times.length - 1; i++) {
		speeds.push(times[i + 1] - times[i]);
	}

	let sum = 0;
	for (let i = 0; i < speeds.length; i++) {
		sum += speeds[i];
	}

	let avg = Math.ceil(sum / speeds.length);

	let slowest = speeds[0];
	let fastest = speeds[0];
	for (let i = 1; i < speeds.length; i++) {
		if (slowest < speeds[i]) {
			slowest = speeds[i];
		}
		if (fastest > speeds[i]) {
			fastest = speeds[i];
		}
	}

	let msg = 'Your average response time was ' + avg + 'ms.\n';
	msg += 'Your slowest response time was ' + slowest + 'ms.\n';
	msg += 'Your fastest response time was ' + fastest + 'ms.';
	await alert(msg);
	makeBg();
}

/* PART B0: make a background pattern */
function makeBg() {
	let patternA = '\\⎽⎽/⎺⎺'; //odd
	let patternB = '/⎺⎺\\⎽⎽'; //even
	for (let row = 0; row < 28; row++) {
		let pattern = patternA;
		if (row % 2 == 0) {
			pattern = patternB;
		}
		for (let col = 0; col < 13; col++) {
			text(pattern, row + 1, col * 6 + 1);
		}
	}
}

function btnClick() {
	// if btn exists, erase it
	// add a new time to the times array
	if (btn) {
		times.push(Date.now());
		btn.erase();
	}

	makeBg();

	if (times.length < 10) {
		/* PART A0: change the values of row and col to be random */
		// screen size is 80 cols x 30 rows
		// target is 8w x 6h
		// drawing starts from top left corner
		// we want to draw the target within the bounds of the frame
		// 30 rows - 6 target height - 1 frame line = 23
		// 80 columns - 8 target width - 1 frame line = 71
		let row = Math.random() * 23;
		row = Math.ceil(row);

		let col = Math.random() * 71;
		col = Math.ceil(col);
		/* PART A: Use recursion to make a new button after clicking a button */
		btn = button(target, row, col, btnClick);
	} else {
		displayStats();
	}
}

async function startGame() {
	makeBg();
	await alert('Click the buttons as fast as you can!');
	btnClick();
}

startGame();
