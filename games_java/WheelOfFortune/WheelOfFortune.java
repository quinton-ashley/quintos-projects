package games_java.WheelOfFortune;

import static games_java.QuintOS.*;

import java.util.ArrayList;
import java.util.Scanner;

public class WheelOfFortune {
	// the category is "Fun and Games"
	String phrasesList = "Tourist-Friendly Destination|Skateboarding & Snowboarding|Underground Entertainment|Competitive Shuffleboard|Cookie-Decorating Contest|Grand-Opening Celebration|Multicultural Activities|Neighborhood Get-Together|Photography & Scrapbooking|Skateboards & Rollerblades|Snowball-Throwing Contest|Snowshoeing & Snowboarding|International Carnivals|Performing-Arts Festival|Skateboard & Rollerblades|Spur-Of-The-Moment Getaway|Unforgettable Carnivals|Wholesome Entertainment|Afterschool Activities|Arts-And-Crafts Festival|Disappearing-Coin Trick|Ice-Carving Competition|Mixologist Competition|Snowbiking & Airboarding|Big-Ticket Attractions|City-Center Horseraces|Halloween Festivities|Hamletscenen Festival|Helium-Filled Balloons|Lion-Dance Competition|Mountaineering & Skiing|Snowboarding & Sledding|Spontaneous Nightlife|Traditional Macaroons|Battleship Destroyer|Building Sandcastles|Carnival Attractions|Festive Celebrations|Fingerprint Drawings|Fingerprints Drawing|Gingerbread-House Kit|Going Paddleboarding|Handball & Racquetball|Helium-Filled Baloons|Curling Championship|In-The-Kitchen Puzzles|Jack-O'-Lantern Carving|Model-Airplane Racing|Renaissance Festival|Alpine Snowboarding|Charades & Pictionary|Contestant Searches|Cross-Country Skiing|Festive Celebration|Five-Gallon Stockpot|Freestyle Wrestling|Frisbee Competition|Interactive Puzzles|Marshmallow Animals|Mini-Golf Tournament|Murder-Mystery Party|Playing Racquetball|Rhythmic Gymnastics|Roller-Coaster Rides|Sled-Pulling Contest|Sleight-Of-Hand Magic|Yuletide Activities|Back-Road Bicycling|Balance-Beam Tricks|Complicated Puzzle|Computer Solitaire|Fast-Pitch Softball|Festive Activities|Freshwater Fishing|Gymnastics Routine|Outdoor Recreation|Playful Activities|Playing Backgammon|Playing Horseshoes|Playing Pictionary|Ski Mountaineering|Slight-Of-Hand Magic|Table Shuffleboard|Water-Balloon Fight|Water-Balloon Throw|Weeklong Festivals|Baseball & Softball|Chess Competition|Collectible Dolls|Crossword Puzzles|Cultural Festival|Equestrian Sports|Filmmaking Genius|Football & Baseball|Football Practice|Going Parasailing|Goldfish Scooping|Halloween Hayride|Hot-Air Ballooning|Indoor Volleyball|Jovial Sing-Alongs|Juggling Beanbags|Late-Night Hayride|Medieval Festival|Miniature Golfing|Playing Asteroids|Playing Badminton|Playing Hopscotch|Playing Paintball|Playing Solitaire|Playing Tic-Tac-Toe|Pothole Exploring|Riverside Camping|Softball & Baseball|Tag-Team Wrestling|Two-Story Carousel|Water-Balloon Toss|Wheelbarrow Races|Writing Limericks|Adventure Racing|Alphabet Magnets|Ballroom Dancing|Barbeque Bonanza|Beach Volleyball|Biggie Boardings|Childhood Heroes|Chinese Checkers|Christmas Crafts|Crossword Puzzle|Demolition Derby|Disappearing Ink|Doing Handstands|Double-Coin Trick|Dungeons & Dragons|Fantasy Football|Fraternity Prank|Freestyle Skiing|Fun Brainteasers|Going Spelunking|Gorgeous Fishing|Gorgeous Golfing|Habanos Festival|Headband Antlers|Hula Competition|Hula-Hoop Contest|Indoor Go-Carting|Indoor Go-Karting|Inflatable Slide|Interactive Toys|Japanese Archery|Juggling Oranges|Knock-Knock Jokes|Masquerade Balls|Narrated Cruises|Paper Snowflakes|Ping-Pong Paddles|Playing Checkers|Playing Dominoes|Playing Jeopardy|Playing Jeopardy!|Playing Kickball|Playing Lacrosse|Playing Monopoly|Playing Peekaboo|Playing Ping-Pong|Playing Scrabble|Popcorn Garlands|Potato-Sack Races|Renaissance Fair|Riding Piggyback|Shooting Marbles|Spitting Contest|Sprint-Car Racing|Street Carnivals|Swim-Up Blackjack|Twenty Questions|Ultimate Frisbee|Urban Spelunking|Volleyball Match|Wheelbarrow Race|Winter Carnivals|Amazing History|Amusement Rides|Anderlecht Fair|Balloon Animals|Big-Wave Surfing|Board-Game Night|Boggle & Scrabble|Boogie Boarding|Burping Contest|Classic Yahtzee|Community Chest|Confetti Cannon|Country Dancing|Cricket & Croquet|Croquet Mallets|Deep-Sea Fishing|Downhill Skiing|Downhill Slalom|Dragon-Boat Race|Exciting Rounds|Family Cookouts|Finger Painting|Gaelic Football";

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
		/*
		 * Make an array of phrases, pick a random phrase, and split pharse into an
		 * array of words
		 */
		phrases = phrasesList.split("|");
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
		addLetter();
	}

	/* Display all the boxes for the phrase */
	void displayBoxes() {
		for (int wordCounter = 0; wordCounter < words.length; wordCounter++) {
			for (int letterCounter = 0; letterCounter < words[wordCounter].length(); letterCounter++) {
				textRect(wordCounter * 3 + 2, letterCounter * 3 + 2, 3, 3);
			}
		}
	}

	void buzz() {
		buzzed = true;
		String guess = prompt("What's your guess?", 18);
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
		text(words[whichWord].charAt(whichLetter), (whichWord + 1) * 3, (whichLetter + 1) * 3);
		delay(1000);

		if (avail.size() > 1 && !buzzed) {
			addLetter();
		}
		if (avail.size() == 1) {
			score -= 3;
			erase();
			setup();
		}
	}

	public static void main(String[] args) {
		new WheelOfFortune();
	}

}
