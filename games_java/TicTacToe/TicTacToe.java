package games_java.TicTacToe;

import static games_java.QuintOS.*;

public class TicTacToe {

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
	int scoreX = 0;
	int scoreO = 0;

	public TicTacToe() {
		text(title, 5, 6);

		/* PART A: finish the grid of 9x8 spaces */
		text("─".repeat(26), gridX, gridY + 7);
		text("─".repeat(26), gridX, gridY + 15); // draw another horizontal line
		text("│\n".repeat(23), gridX + 8, gridY);
		text("│\n".repeat(23), gridX + 17, gridY); // draw another vertical line

		startGame();
	}

	public void displayTurn() {
		if (turnX) {
			text("X's turn!", 55, 4);
		} else {
			text("O's turn!", 55, 4);
		}
	}

	public void displayScore() {
		text("Player X's Score: " + scoreX, 55, 6);
		text("Player O's Score: " + scoreO, 55, 8);
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
				text(bigSpace, x, y);
			}
		}
	}

	public void takeTurn(int row, int col) {
		System.out.println("You clicked button " + row + " " + col);

		if (board[row][col] != ' ') {
			alert("Occupied space", 55, 20, 23);
		} else {
			int x = gridX + col * 9;
			int y = gridY + row * 8;

			char mark;
			if (turnX == true) {
				text(bigX, x, y);
				mark = 'X';
			} else {
				text(bigO, x, y);
				mark = 'O';
			}
			board[row][col] = mark;
			displayBoard();

			if (checkWinner(mark) == true) {
				alert("You won Player " + mark + "!", 55, 20, 23);
				if (turnX == true) {
					scoreX++;
				} else {
					scoreO++;
				}
				displayScore();

				startNewGame();

			}
			if (checkDraw() == true) {
				alert("Draw.", 55, 20, 23);
				startNewGame();
			}

			turnX = !turnX;

			displayTurn();
		}
	}

	public void startGame() {
		eraseRect(55, 1, 60, 20);

		/* PART A: Make the buttons in the grid */
		for (int row = 0; row < 3; row++) {
			for (int col = 0; col < 3; col++) {
				final int rowFinal = row;
				final int colFinal = col;
				button(bigSpace, gridX + col * 9, gridY + row * 8, () -> {
					takeTurn(rowFinal, colFinal);
				});
			}
		}

		displayScore();

		turnX = Math.random() < 0.5;
	}

	public static void main(String[] args) {
		new TicTacToe();
	}
}
