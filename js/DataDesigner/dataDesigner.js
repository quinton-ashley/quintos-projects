let table = `
| id | film title                      |
|====|=================================|
| 31 | Titanic                         |
|----|---------------------------------|
| 19 | Groundhog Day                   |
|----|---------------------------------|
| 02 | Harry Potter and The Prisone... |
|----|---------------------------------|`.slice(1);
// example film data

async function start() {
	txt(table, 2, 0);
	let cmd = await prompt('0: Back, 1: View, 2: Delete', 20, 0, 40);
}
