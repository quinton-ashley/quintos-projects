package games_java.QuickClicks;

import java.io.File;

public class Test {

	public Test() {
		File file = new File("BLUE/hello.txt");
		System.out.println(file.getAbsolutePath());
	}

	public static void main(String[] args) {
		new Test();
	}
}
