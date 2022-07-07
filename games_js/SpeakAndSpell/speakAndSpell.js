let inp;
let word;

let attempt = 0;
let wordAmount = 0;
let correctWords = 0;
let selectMode = true;

let shouldScroll = true;

// value is the text the user entered in the input
async function onSubmit(value) {
	if (value == word) {
		text('correct');
		if (wordAmount == 10) {
			await play(speechSounds.you_are_correct);
			endGame();
			return;
		}
		let phrases = [
			'that_is_correct_now_spell',
			'that_is_right_now_try',
			'you_are_correct_next_spell',
			'you_are_correct_next_spell'
		];
		let rand = Math.random() * phrases.length;
		rand = Math.floor(rand);
		await play(speechSounds[phrases[rand]]);
		correctWords++;
		nextWord();
	} else if (attempt == 0) {
		attempt++;
		await play(speechSounds.wrong_try_again);
		await play(wordSounds[word]);
	} else {
		await play(speechSounds.that_is_incorrect_the_correct_spelling_of);
		await play(wordSounds[word]);
		await play(speechSounds.is);
		erase(); // erase the screen
		await text('*' + word);
		let spelling = word.toUpperCase().split('');
		for (let letter of spelling) {
			await play(letterSounds[letter]);
		}
		if (wordAmount == 10) {
			endGame();
			return;
		}
		await play(speechSounds.now_spell);
		nextWord();
	}
}

// called everytime the user enters text in the input
function onChange(value) {
	let letter = value[value.length - 1].toUpperCase();
	letterSounds[letter].play();
}

async function endGame() {
	erase(); // erase the screen
	await text('Your score: ' + correctWords);
	if (correctWords >= 5) {
		await play(speechSounds.you_win);
	}
	await play(speechSounds.here_is_your_score);
	let nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

	await play(wordSounds[nums[correctWords - 1]]);
}

async function nextWord() {
	wordAmount++;
	erase(); // erase the screen
	attempt = 0;
	let rand = Math.random() * words.length;
	rand = Math.floor(rand);
	word = words[rand];

	wordSounds[word].play();

	// create the input for letters
	inp = input('', 0, 0, onSubmit, onChange);
}

async function startGame() {
	selectMode = false;
	shouldScroll = false;
	await play(speechSounds.spell);
	nextWord();
}

async function textScroll(msg, stepDelay, initDelay) {
	initDelay ??= 0;
	stepDelay ??= 200;
	shouldScroll = true;
	// let user read the beginning
	for (let i = 0; shouldScroll && i < msg.length; i++) {
		await text(msg.substring(i, i + 20), 1, 0);
		if (i == 0) await delay(initDelay);
		else await delay(stepDelay);
	}
}

function keyPressed() {
	if (!selectMode) return;
	if (key == 'a') startGame('a');
	if (key == 'b') startGame('b');
}

async function boot() {
	let boom = '.|+x*O';
	for (let i = 0; i < 6; i++) {
		await text((boom[i].repeat(20) + '\n').repeat(4), 0, 0, 0, 0, 5);
	}
	erase();
	await textScroll('Select mode A for short words or mode B for long words.', 200, 1500);
}

boot();
