(async () => {
	// your code goes here!
	let num = Math.floor(Math.random() * 100 + 1);

	let res = 'y';
	while (res == 'y' || res == 'yes') {
		let guess;
		for (let attempt = 0; guess != num; attempt++) {
			if (attempt > 7) {
				await alert('Out of guesses!');
				await alert('The number was ' + num);
				break;
			}

			guess = await prompt('Guess a number 1-100:');

			if (guess < 1 || guess > 100) {
				await alert('Invalid guess');
				attempt--;
			} else if (guess > num) {
				await alert('Your guess is too high');
			} else if (guess < num) {
				await alert('Your guess is too low');
			} else {
				await alert("That's correct!");
			}
		}
		res = await prompt('Play again? y/n');
		res = res.toLowerCase();
	}

	await alert('Thanks for playing!');

	exit();
})();
