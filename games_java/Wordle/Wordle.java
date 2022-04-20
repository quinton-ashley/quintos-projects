package games_java.Wordle;

import static games_java.QuintOS.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Wordle {
	ArrayList<String> dictionary;
	ArrayList<String> words;
	String[] board;

	public Wordle() {
		setupGame();
	}

	void setupGame() {
		words = new ArrayList<String>();
		/* load the text files */
		String dir = System.getProperty("user.dir") + "/games_java/Wordle";
		File file = new File(dir + "/words5.txt");
		Scanner fileScanner;
		try {
			fileScanner = new Scanner(file);
		} catch (FileNotFoundException e) {
			return;
		}
		while (fileScanner.hasNextLine()) {
			log(fileScanner.nextLine());
		}
		fileScanner.close();
		startGame();
	}

	/* Display all the boxes for the letters */
	void displayBoxes() {
	}

	void startGame() {
		/* pick new word */

		displayBoxes();

		prompt("Guess the word!", 3, 18, 20);
	}

	public static void main(String[] args) {
		new Wordle();
	}
}
