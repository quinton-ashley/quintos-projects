function preload() {
	// words that are easier to spell
	words =
		'I cool know over these about down large please they after drink learn put think again each little red this ago everything live right those all face location run three also far make same to always fast man sea together am father many seven try an find may shop turn and first meaning sit under any five men six until are fly mother sleep us as foot much small use from must smile want ask give never some we at go no sorry well away green not star what because has now stay when bed here ocean stop where black his of store which blue how old strong why bring in on tell will call into one thank with clean is only that yellow cold it or the yes color just our you come kind out there'.split(
			' '
		);

	// words that are harder to spell
	longWords =
		"above coming hoof pleasure sugar abscess correct hooves plunger summers already corsage houses plural sure ancient couldn't inch poem surgeon angel county's inches poems swap another couple insects poets talk answer courage instead police ten anything cousin iron ponies terror armies danger jealous pony thief's army diamond journey potato thieves' ax diamonds lady's potatoes three axes discover language poultry to baby's does laugh priest today beach dollar laughter priests tomorrow beaches dollars learn promise touch beauty dungeon leisure pull treasure beige early lettuce puppies trouble believe earnest life puppy trucks bench earth lilies quiet two benches echo lily quotient typists blood eight linger rabbis uncles boss elf lives range union bosses elves loss ranger valley brother enough losses ready valleys built extra machine reindeer view bullet farmers man's relief village bureau feather measure remove villages bushel finger men's rhythm warm butcher five mercies rural was calf flood mercy says wash camel floor mice's scarf watch camels for minute scarves water canaries four mirror schedule welcome canary freight mother school wife candies front mouse's scissors winters candy glass navy's search witches canoe glasses niece serious wives canoes glories nine seven wolf's caravan glory ocean shield wolves carry greater oceans should woman's chalk guard once shoulder woman cheese guess one shovel women's cheeses guide other six wonder child gypsies outdoor ski word chimney half oven someone workman chimneys harbors ox's source worth chorus haste oxen's squad wrong choruses health period squat yacht circuit healthy pierce statue yield cities heaven pint stomach zero comfort heavy plague stranger".split(
			' '
		);

	speech = [
		'as_in',
		'here_is_your_score',
		'i_win',
		'is',
		'now_spell',
		'perfect_score',
		'plural_possessive',
		'say_it',
		'singular_possessive',
		'spell',
		'that_is_correct_now_spell',
		'that_is_incorrect_the_correct_spelling_of',
		'that_is_right_now_try',
		'the_number',
		'wrong_try_again',
		'you_are_correct',
		'you_are_correct_next_spell',
		'you_are_right_try',
		'you_win'
	];

	speechSounds = {};
	for (let speak of speech) {
		speechSounds[speak] = loadSound(QuintOS.dir + '/sounds/speech/' + speak + '.mp3');
		speechSounds[speak].setVolume(0.3);
	}

	wordSounds = {};
	for (let word of words.concat(longWords)) {
		wordSounds[word] = loadSound(QuintOS.dir + '/sounds/words/' + word + '.mp3');
		wordSounds[word].setVolume(0.3);
	}

	letterSounds = {};
	for (let letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ'".split('')) {
		letterSounds[letter] = loadSound(QuintOS.dir + '/sounds/letters/' + letter + '.mp3');
		letterSounds[letter].setVolume(0.3);
	}
}

let inp;
let word;

let attempt = 0;
let wordAmount = 0;
let correctWords = 0;
let selectMode = true;

let shouldScroll = true;

// value is the text the user entered in the input
async function onSubmit(value) {
	if (value.toUpperCase() == word.toUpperCase()) {
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
	if (letter == '<') {
		wordSounds[word].play();
	} else {
		letterSounds[letter].play();
	}
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
	if (key.toUpperCase() == 'A') startGame('A');
	if (key.toUpperCase() == 'B') startGame('B');
}

function setup() {
	textScroll('Select mode A for short words or mode B for long words.', 200, 1500);
}
