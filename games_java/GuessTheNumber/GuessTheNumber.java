package games_java.GuessTheNumber;

import java.util.Scanner;

public class GuessTheNumber {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int num = (int) (Math.random() * 100 + 1);
		int guess = 0;
		while (guess != num) {
			System.out.println("Guess a number 1-100");
			guess = sc.nextInt();

			if (guess == num) {
				System.out.println("You got it!");
			} else if (guess > num) {
				System.out.println("Too high!");
			} else {
				System.out.println("Too low!");
			}
		}
		sc.close();
		System.exit(0);
	}
}
