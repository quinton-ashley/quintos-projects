package games_java.WheelOfFortune;

import static games_java.QuintOS.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class WheelOfFortune {
	// the category is "Fun and Games"
	String bigBuzzer = """
			|⎺|__  _   _ ___________ _ __
			| '_ \\| | | |_  /_  / _ \\ '__|
			| |_) | |_| |/ / / /  __/ |
			|_.__/ \\__,_/___/___\\___|_|""".substring(1);

	String[] phrases;
	String phrase;
	String[] words;
	char[][] board;
	boolean buzzed;
	Scanner sc;
	int score;

	public WheelOfFortune() {
		sc = new Scanner(System.in);
		score = 0;
		setup();
	}

	void setup() {
		String dir = System.getProperty("user.dir") + "/games_java/WheelOfFortune";
		File phrasesFile = new File(dir + "/phrases.txt");
		delay(2000);
		Scanner fileScanner;
		try {
			fileScanner = new Scanner(phrasesFile);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return;
		}
		ArrayList<String> phrasesList = new ArrayList<String>();
		while (fileScanner.hasNextLine()) {
			phrasesList.add(fileScanner.nextLine());
		}
		fileScanner.close();
		/*
		 * Make an array of phrases, pick a random phrase, and split pharse into an
		 * array of words
		 */
		phrases = new String[phrasesList.size()];
		for (int i = 0; i < phrasesList.size(); i++) {
			phrases[i] = phrasesList.get(i);
		}
		phrase = phrases[(int) (Math.random() * phrases.length)];
		words = phrase.split(" ");
		log(words);

		/* Make a board array to represent the letters in the phrase */
		// words -> ['Community', 'Chest']
		// board -> [
		// [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		// [' ', ' ', ' ', ' ', ' ']
		// ]
		board = new char[words.length][];

		for (int wordCounter = 0; wordCounter < words.length; wordCounter++) {
			board[wordCounter] = new char[words[wordCounter].length()];
			for (int letterCounter = 0; letterCounter < words[wordCounter].length(); letterCounter++) {
				board[wordCounter][letterCounter] = ' ';
			}
		}
		log(board);

		buzzed = false;

		/* Create the buzzer button */
		button(bigBuzzer, 18, 5, () -> {
			this.buzz();
		});

		text("Score: " + score, 17, 10);
		displayBoxes();
		// addLetter();
	}

	/* Display all the boxes for the phrase */
	void displayBoxes() {
		String boxes = "";
		for (int wordCounter = 0; wordCounter < words.length; wordCounter++) {
			String word = words[wordCounter];
			boxes += "┌─┐".repeat(word.length()) + "\n";
			for (int letterCounter = 0; letterCounter < word.length(); letterCounter++) {
				boxes += "│" + board[wordCounter][letterCounter] + "│";
			}
			boxes += "\n" + "└─┘".repeat(word.length()) + "\n";
		}
		System.out.println(boxes);
	}

	void buzz() {
		buzzed = true;
		System.out.println("What's your guess?");
		String guess = sc.nextLine();
		if (guess != null && guess.equals(phrase)) {
			int lettersLeft = 0;
			for (int w = 0; w < words.length; w++) {
				for (int l = 0; l < words[w].length(); l++) {
					if (board[w][l] == ' ') {
						lettersLeft++;
					}
				}
			}
			score += lettersLeft;
			erase();
			setup();
			return;
		} else {
			score--;
		}
		text("Score: " + score, 17, 10);
		button(bigBuzzer, 18, 5, () -> {
			this.buzz();
		});
		buzzed = false;
		addLetter();
	}

	/* Add a letter to a random empty box */
	void addLetter() {
		ArrayList<int[]> avail = new ArrayList<int[]>();

		for (int w = 0; w < words.length; w++) {
			for (int l = 0; l < words[w].length(); l++) {
				if (board[w][l] == ' ') {
					avail.add(new int[] { w, l });
				}
			}
		}
		log(avail);

		int[] coord = avail.get((int) (Math.random() * avail.size()));

		int whichWord = coord[0];
		int whichLetter = coord[1];

		board[whichWord][whichLetter] = words[whichWord].charAt(whichLetter);
		displayBoxes();

		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// System.err.println("delay failed");
		}

		// if (avail.size() > 1 && !buzzed) {
		// addLetter();
		// }
		// if (avail.size() == 1) {
		// score -= 3;
		// erase();
		// setup();
		// }
	}

	public static void main(String[] args) {
		new WheelOfFortune();
	}

}
