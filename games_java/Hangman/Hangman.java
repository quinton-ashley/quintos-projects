package games_java.Hangman;

import java.util.Scanner;

public class Hangman {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    String[] hangman = new String[] { """
          +---+
          |   |
              |
              |
              |
              |
        =========""", """
          +---+
          |   |
          O   |
              |
              |
              |
        =========""", """
          +---+
          |   |
          O   |
          |   |
              |
              |
        =========""", """
          +---+
          |   |
          O   |
         /|   |
              |
              |
        =========""", """
          +---+
          |   |
          O   |
         /|\\  |
              |
              |
        =========""", """
          +---+
          |   |
          O   |
         /|\\  |
         /    |
              |
        =========""", """
          +---+
          |   |
          O   |
         /|\\  |
         / \\  |
              |
        =========""" };

    String wordList = "abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buxom buzzard buzzing buzzwords cobweb croquet crypt cycle disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled fuchsia funny gabby galaxy galvanize gazebo gizmo glowworm glyph gnarly gnostic gossip grogginess haiku haphazard hyphen icebox injury ivory ivy jackpot jawbreaker jaywalk jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole kilobyte kiosk kitsch kiwifruit klutz knapsack larynx lengths lucky luxury lymph marquee matrix megahertz microwave mnemonic mystify nightclub nowadays oxidize oxygen pajama phlegm pixel pizazz polka psyche puppy puzzling quartz queue quips quiz quizzes quorum razzmatazz rhubarb rhythm scratch snazzy sphinx squawk staff strength stretch stronghold stymied subway swivel syndrome thrift thumb topaz transcript transgress transplant twelfth triphthong unknown unzip vaporize voodoo vortex walkway waltz wave wavy waxy well whomever witch wizard wristwatch xylophone yacht youthful yummy zigzag zilch zipper zodiac zombie";

    /* PART A0: split the words string into an array, choose a random word */
    String[] words = wordList.split(" ");

    // generate random number between 0 and the number of words in the words array
    int random = (int) (Math.floor(Math.random() * words.length));
    String word = words[random];

    /* PART A1: make an array with a line for each letter in the word */
    // Example word: 'quiz'
    // lines -> ['_', '_', '_', '_']
    char[] lines = new char[word.length()];
    // word.length is the number of letters in the word
    for (int i = 0; i < word.length(); i++) {
      lines[i] = '_'; // add a line to the array
    }

    int parts = 0;

    /* PART A3: make the game loop, don't use the hangman until part B */
    while (parts < hangman.length) {
      /* PART B: display the hangman in the prompt */
      String msg = hangman[parts] + "\n";
      for (int i = 0; i < word.length(); i++) {
        msg += lines[i] + " ";
      }
      // guess is the letter the user entered
      // or a guess of the full word
      System.out.println(msg);
      String guess = sc.nextLine();

      boolean isCorrect = false;

      // test if the guess is a whole word, not just one letter
      if (guess.length() > 1) {
        if (guess.equals(word)) {
          break; // if guess matches word the user won, end loop
        }
      } else {
        for (int i = 0; i < word.length(); i++) {
          // the next letter in the word
          if (word.charAt(i) == guess.charAt(0)) {
            lines[i] = guess.charAt(0);
            isCorrect = true;
          }
        }
      }

      if (isCorrect == true) {
        System.out.println("correct!");
      } else {
        System.out.println("incorrect!");
        parts++;
      }

      boolean keepPlaying = false;
      for (int i = 0; i < lines.length; i++) {
        if (lines[i] == '_') {
          keepPlaying = true;
        }
      }

      if (keepPlaying == false) {
        break;
      }
    }

    if (parts <= 6) {
      System.out.println("You got it! The word is " + word);
    } else {
      System.out.println("You ran out of attempts. The word is " + word);
    }

    sc.close();
    System.exit(0);
  }
}
