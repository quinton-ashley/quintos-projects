package games_java.QuickClicks;

import static games_java.QuintOS.*;

import java.time.Instant;

public class QuickClicks {
	String target = " .d88b.\n.8P  Y8.\n88    88\n88    88\n'8b  d8'\n 'Y88P'";

	long[] times = new long[10];

	Button btn;

	int clicked = 0;

	void makeBg() {
		/* PART D: Make a background pattern */
		txt("<>".repeat(1000), 1, 1, 78);
	}

	/* PART B2: calculate and display player performance statistics */
	void displayStats() {
		// add difference between times in milliseconds to sum
		int[] speeds = new int[19];
		for (int i = 0; i < speeds.length; i++) {
			speeds[i] = (int) (times[i + 1] - times[i]);
		}

		int sum = 0;
		for (int i = 0; i < speeds.length; i++) {
			sum += speeds[i];
		}

		int avg = (int) (sum / speeds.length);

		int slowest = speeds[0];
		int fastest = speeds[0];
		for (int i = 1; i < speeds.length; i++) {
			if (slowest < speeds[i]) {
				slowest = speeds[i];
			}
			if (fastest > speeds[i]) {
				fastest = speeds[i];
			}
		}

		String msg = "Your average response time was " + avg + "ms.\n";
		msg += "Your slowest response time was " + slowest + "ms.\n";
		msg += "Your fastest response time was " + fastest + "ms.";

		alert(msg);
		exit();
	}

	void makeTarget() {
		if (btn != null) {
			btn.erase();
		}
		makeBg();
		/* PART C: Limit clicks to 10, calculate stats */
		if (clicked < 10) {
			times[clicked] = Instant.now().toEpochMilli();
			clicked++;
			/* PART A0: change the values of row and col to be random */
			// screen size is 80 cols x 30 rows
			// target is 8w x 6h
			// drawing starts from top left corner
			// we want to draw the target within the bounds of the frame
			// 30 rows - 6 target height - 1 frame line = 23
			// 80 columns - 8 target width - 1 frame line = 71

			int row = (int) (Math.random() * 23 + 1);
			int col = (int) (Math.random() * 71 + 1);

			// (text, row, col, function)
			btn = button(target, row, col, () -> {
				/* PART B: Use recursion to make a new button after clicking a button */
				makeTarget();
			});
		} else {
			displayStats();
		}
	}

	void startGame() {
		makeBg();
		makeTarget();
	}

	public QuickClicks() {
		startGame();
	}

	public static void main(String[] args) {
		alert("Click the buttons as fast as you can!");
		new QuickClicks();
	}
}
