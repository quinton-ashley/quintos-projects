// the start function gets run when the game starts
async function start() {
	// your code goes here!

	let num = Math.round(random(1, 100));
	let guess;

	while (guess != num) {
		guess = await prompt('Guess a number 1-100');

		if (guess == num) {
			await alert('Correct!');
		} else if (guess > num) {
			await alert('Your guess was too high.');
		} else {
			await alert('Your guess was too low.');
		}
	}

	exit();
} // end of the start function
