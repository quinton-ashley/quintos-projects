package games_java.GuessTheNumber;

import java.util.Scanner;

public class GuessTheNumber {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		int num = (int) (Math.ceil(Math.random() * 100));
		int guess = -1;

		while (guess != num) {
			// ask user to guess a number
			System.out.print("Guess the number 1-100: ");
			// nextInt returns the number they guessed
			guess = sc.nextInt();

			/* PART A: Tell the player their guess was too low, too high, or correct */
			if (guess < num) {
				System.out.println("Your guess was too low");
			} else if (guess > num) {
				System.out.println("Your guess was too high");
			} else if (guess == num) {
				System.out.println("You got it!");
			} else {
				System.out.println("Invalid guess");
			}
		}

		sc.close();
		System.exit(0);
	}
}
