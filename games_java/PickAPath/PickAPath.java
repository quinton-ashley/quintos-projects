package games_java.PickAPath;

import java.util.Arrays;
import java.util.Scanner;

public class PickAPath {
	public static void main(String[] args) {
		// create the user input scanner object
		Scanner sc = new Scanner(System.in);
		
		// your code goes here! below this line

		int choice = -1; // initialize choice to -1, user has not made any choice yet

		while (choice != 0) {
			String msg = ""; // initialize message to empty string
			Integer[] opt = new Integer[]{};

			if (choice == -1) {
				/* PART A0: Start your story! */
				msg = "It's a dark October night. You're staying up late coding but suddenly you hear a knock at your door!\n\n\t"
						+"1: Ask \"Who is it?\"\n\t"
						+"2: Ignore it and keep coding\n\t"
						+"3: Try to go to sleep";
				opt = new Integer[]{1,2,3};
			} else if (choice == 1 || choice == 6) {
				/* PART A1: continue the story */
				msg = "\"ARGHHHHH----\" (a high-pitched scream pierces through the silence)\n\n\t"
						+"4: Turn off the lights and try to go to sleep\n\t"
						+"5: Pick up something and walk to the door";
				opt = new Integer[]{4,5};
			} else if (choice == 2) {
				msg = "The knocks intensify ...... \"Thud\" \"Thud\" \"Thud\"\n\n\t"
						+"6: Ask \"Who is it?\"\n\t"
						+"7: Go to sleep instead";
				opt = new Integer[]{6,7};
			} else if (choice == 3 || choice== 4 || choice == 7) {
				msg = "\"I know you can hear me!\"\n\nSuddnly a bleeding face manifests itself outside of the window, as you were about to scream, it yelled:\n\n\"Happy HALLOWEEEEEN!\"";
			} else if (choice == 5) {
				msg = "What would you pick up\n\n\t"
						+"8: A cat\n\t"
						+"9: A spade";
				opt = new Integer[]{8,9};
			} else if (choice == 8) {
				msg = "As you gradually hold up the cat, the door springs open!\nA bleeding face poped out from the other side and yelled:\n\n\"Happy HALLOWEEEEEN\"";
			} else if (choice == 9) {
				msg = "As you gradually hold up the spade the door springs open.\nA bleeding face poped out from the other side and yelled:\n\n\"Happy HALLOWEEEEEN\"";
			}
			

			// prompt the player to make choices
			if (opt.length != 0) {
				
				System.out.println(msg);
				Integer input = sc.nextInt(); 

				/* PART B1: check if the player made a valid choice, reject invalid choices */
				if (Arrays.asList(opt).contains(input) == true) {
					choice = input;
				} else {
					System.out.println("Invalid input! Try again.");
				}
			}
			else {
				System.out.println(msg+"\n\n\nThe end");
				choice = 0;
			}
		}

		sc.close();
		System.exit(0); // exit the program
	}
}
