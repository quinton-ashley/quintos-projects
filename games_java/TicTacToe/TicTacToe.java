package games_java.TicTacToe;

import games_java.QuintOS;

import java.util.ArrayList;

public class TicTacToe {
	QuintOS pc = new QuintOS();

	String title = """
			TTTTT IIIII   CCC
			  T     I    C
			  T     I    C
			  T     I    C
			  T   IIIII   CCC

			TTTTT  AAA    CCC
			  T   A   A  C
			  T   AAAAA  C
			  T   A   A  C
			  T   A   A   CCC

			TTTTT  OOO   EEEE
			  T   O   O  E
			  T   O   O  EEE
			  T   O   O  E
			  T    OOO   EEEE""".substring(1);

	String bigSpace = "        \n".repeat(7);

	String bigO = """
			 OOOOOO
			OO    OO
			OO    OO
			OO    OO
			OO    OO
			OO    OO
			 OOOOOO""".substring(1);

	String bigX = """
			XX    XX
			 XX  XX
			  XXXX
			   XX
			  XXXX
			 XX  XX
			XX    XX""".substring(1);

	int gridX = 26;
	int gridY = 3;

	// board stores the game data
	// in a two dimensional array of spaces
	char[][] board = new char[][] { { ' ', ' ', ' ' }, { ' ', ' ', ' ' }, { ' ', ' ', ' ' } };

	boolean turnX = true;
	boolean challengeMode = false;
	boolean singlePlayer = false;
	int aiLevel = 0;
	int scoreX = 0;
	int scoreO = 0;

	public TicTacToe() {
		pc.text(title, 5, 6);

		/* PART A: finish the grid of 9x8 spaces */
		pc.text("─".repeat(26), gridX, gridY + 7);
		pc.text("─".repeat(26), gridX, gridY + 15); // draw another horizontal line
		pc.text("│\n".repeat(23), gridX + 8, gridY);
		pc.text("│\n".repeat(23), gridX + 17, gridY); // draw another vertical line

		pc.button("One Player Start", 55, 10, () -> {
			singlePlayer = true;
			pc.button("Easy", 55, 4, () -> {
				aiLevel = 0;
				startGame();
			});
			pc.button("Medium", 55, 6, () -> {
				aiLevel = 1;
				startGame();
			});
			pc.button("Hard", 55, 8, () -> {
				aiLevel = 2;
				startGame();
			});
			pc.button("Challenge Mode", 55, 10, () -> {
				challengeMode = true;
				aiLevel = 0;
				startGame();
			});
		});

		pc.button("Two Player Start", 55, 12, () -> {
			startGame();
		});
	}

	public void displayAiLevel() {
		if (aiLevel == 0) {
			pc.text("AI Level: Easy", 55, 10);
		} else if (aiLevel == 1) {
			pc.text("AI Level: Medium", 55, 10);
		} else {
			pc.text("AI Level: Hard  ", 55, 10);
		}
	}

	public void displayTurn() {
		if (turnX) {
			pc.text("X's turn!", 55, 4);
		} else {
			pc.text("O's turn!", 55, 4);
		}
	}

	public void displayScore() {
		pc.text("Player X's Score: " + scoreX, 55, 6);
		pc.text("Player O's Score: " + scoreO, 55, 8);
	}

	public void displayBoard() {
		String str = "";
		for (int row = 0; row < 3; row++) {
			for (int col = 0; col < 3; col++) {
				str += board[row][col];
			}
			str += "\n";
		}
		System.out.println(str);
	}

	public boolean checkWinner(char mark) {
		// checks all horizontal rows and vertical columns
		for (int i = 0; i < 3; i++) {
			if (board[i][0] == mark && board[i][1] == mark && board[i][2] == mark) {
				return true;
			}

			if (board[0][i] == mark && board[1][i] == mark && board[2][i] == mark) {
				return true;
			}
		}
		// check diagonals
		if (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
			return true;
		}
		if (board[0][2] == mark && board[1][1] == mark && board[2][0] == mark) {
			return true;
		}
		// no winner found
		return false;
	}

	public boolean checkDraw() {
		for (int row = 0; row < 3; row++) {
			for (int col = 0; col < 3; col++) {
				if (board[row][col] == ' ') {
					return false;
				}
			}
		}
		return true;
	}

	public void startNewGame() {
		for (int row = 0; row < 3; row++) {
			for (int col = 0; col < 3; col++) {
				board[row][col] = ' ';
				int x = gridX + col * 9;
				int y = gridY + row * 8;
				pc.text(bigSpace, x, y);
			}
		}
	}

	public void aiTurn() {
		if (aiLevel == 2) {
			for (int row = 0; row < 3; row++) {
				for (int col = 0; col < 3; col++) {
					if (board[row][col] == ' ') {
						// offense, if o would win, o should go there
						board[row][col] = 'O';
						if (checkWinner('O') == true) {
							board[row][col] = ' ';
							takeTurn(row, col);
							return;
						} else {
							board[row][col] = ' ';
						}

						// defense, if x would win, o should go there
						board[row][col] = 'X';
						if (checkWinner('X') == true) {
							board[row][col] = ' ';
							takeTurn(row, col);
							return;
						} else {
							board[row][col] = ' ';
						}
					}
				}
			}
		}

		if (aiLevel >= 1) {
			ArrayList<int[]> avail = new ArrayList<int[]>();
			for (int row = 0; row < 3; row++) {
				for (int col = 0; col < 3; col++) {
					if (board[row][col] == ' ') {
						avail.add(new int[] { row, col });
					}
				}
			}
			// System.out.println(avail);
			int idx = (int) (Math.floor(Math.random() * avail.size()));
			int[] coord = avail.get(idx);
			takeTurn(coord[0], coord[1]);
			return;
		}

		for (int row = 0; row < 3; row++) {
			for (int col = 0; col < 3; col++) {
				if (board[row][col] == ' ') {
					takeTurn(row, col);
					return;
				}
			}
		}
	}

	public void takeTurn(int row, int col) {
		System.out.println("You clicked button " + row + " " + col);

		if (board[row][col] != ' ') {
			pc.alert("Occupied space", 55, 20, 23);
		} else {
			int x = gridX + col * 9;
			int y = gridY + row * 8;

			char mark;
			if (turnX == true) {
				pc.text(bigX, x, y);
				mark = 'X';
			} else {
				pc.text(bigO, x, y);
				mark = 'O';
			}
			board[row][col] = mark;
			displayBoard();

			if (checkWinner(mark) == true) {
				pc.alert("You won Player " + mark + "!", 55, 20, 23);
				if (turnX == true) {
					scoreX++;
					if (challengeMode == true) {
						aiLevel++;
						displayAiLevel();
					}
				} else {
					scoreO++;
				}
				displayScore();

				startNewGame();

			}
			if (checkDraw() == true) {
				pc.alert("Draw.", 55, 20, 23);
				startNewGame();
			}

			turnX = !turnX;

			displayTurn();

			if (singlePlayer == true && turnX == false) {
				aiTurn();
			}
		}
	}

	public void startGame() {
		pc.eraseRect(55, 1, 60, 20);

		/* PART A: Make the buttons in the grid */
		for (int row = 0; row < 3; row++) {
			for (int col = 0; col < 3; col++) {
				final int rowFinal = row;
				final int colFinal = col;
				pc.button(bigSpace, gridX + col * 9, gridY + row * 8, () -> {
					takeTurn(rowFinal, colFinal);
				});
			}
		}

		displayAiLevel();
		displayScore();

		turnX = Math.random() < 0.5;

		if (singlePlayer == true && turnX == false) {
			aiTurn();
		}
	}

	public static void main(String[] args) {
		new TicTacToe();
	}
}
