function ceasarCipher() {
	let alpha = 'abcdefghijklmnopqrstuvwxyz';

	let res = '';
	for (let i = 0; i < msg.length; i++) {
		let c = msg[i];
		if (alpha.includes(c.toLowerCase())) {
			let isLC = alpha.includes(c);
			let charCodeOfA = isLC ? 97 : 65;

			let pos = (c.charCodeAt() + shift - charCodeOfA) % 26;

			res += String.fromCharCode(charCodeOfA + pos);
		} else {
			res += c;
		}
	}
}

async function start() {
	// txtRect(2, 2, 3, 36, 'solid', '═');

	txt('MESSAGE'.padStart(20, ' '), 3, 3);
	let msg = input('', 7, 4);
	txtRect(5, 2, 20, 36);
}
// let shift = input('', 20, 2);
