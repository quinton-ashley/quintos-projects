package games_java.Test;

import static games_java.QuintOS.*;

public class Test {

	void startGame() {
		txt("hi!", 1, 1);
	}

	public Test() {
		startGame();
	}

	public static void main(String[] args) {
		// new Test();
		int x = 4;
		String num = x.toUpperCase();
		System.out.println(num);
	}
}

// package games_java.Test;

// import static games_java.QuintOS.*;

// public class Test {

// public int method1() {
// System.out.println("bye");
// log("method1");
// return 5;
// }

// public void method0() {
// System.out.println("hi");
// log("method0");
// int res = method1();
// log("result: " + res);
// }

// public static void main(String[] args) {
// Test test = new Test();
// test.method0();
// log("exit");
// }
// }

// ---------------------------------------------

// package games_java.Test;

// import java.util.ArrayList;
// import java.util.HashMap;

// public class Test {
// Integer[] arr0 = new Integer[4];
// String[] arr1 = new String[] { "c", "b", "c" };
// String[] arr2 = new String[] { "a" };
// Integer[] arr3 = new Integer[] { 5 };

// static ArrayList<String> arr4 = new ArrayList<String>();

// static HashMap<String, String> map = new HashMap<String, String>();

// static class SubTest {
// int x;
// int y;
// int[] arr0;
// static int[] arr1 = new int[] { 2, 3, 4 };

// static class SubSubTest {
// int z;
// int[] arr2;

// SubSubTest() {
// this.z = 12;
// this.arr2 = new int[] { 8, 9, 10 };
// }
// }

// SubSubTest sub1;

// SubTest() {
// this.x = 0;
// this.y = 10;
// this.arr0 = new int[] { 5, 6, 7 };
// this.sub1 = new SubSubTest();
// }
// }

// public static void main(String[] args) {

// Test t0 = new Test();
// System.out.println(t0.arr0[0]);
// System.out.println(t0.arr1.toString());

// arr4.add("hello");
// arr4.add("bye");
// System.out.println(arr4);
// System.out.println(arr4.get(0));

// System.out.println(map.put("key0", "value0"));
// System.out.println(map.put("key1", "value1"));
// System.out.println(map.get("key0"));
// System.out.println(map.entrySet());
// System.out.println(map.values());
// System.out.println(map.remove("key0"));
// System.out.println(map.containsKey("key1"));
// System.out.println(map.containsValue("value1"));
// System.out.println(map.isEmpty());
// System.out.println(map.size());
// map.clear();
// System.out.println(map.get("key0"));
// System.out.println(map.entrySet());
// System.out.println(map.values());
// System.out.println(map.remove("key0"));
// System.out.println(map.containsKey("key0"));
// System.out.println(map.containsValue("value0"));
// System.out.println(map.isEmpty());
// System.out.println(map.size());

// SubTest sub = new SubTest();
// System.out.println(sub.x);
// System.out.println(sub.y);
// System.out.println(sub.arr0);
// System.out.println(sub.arr0[0]);
// System.out.println(SubTest.arr1);
// System.out.println(SubTest.arr1[0]);
// System.out.println(sub.sub1.arr2[0]);

// String[] names = new String[] { "Jake", "Ali", "Max" };
// for (String name : names) {
// System.out.println("Hello " + name);
// }
// }
// }

// ------------------------------------------------------------

// package games_java.Test;

// import static games_java.QuintOS.*;

// public class Test {

// static class Student {
// String[] name;
// String species;
// int age;
// int grade;
// String studentID;

// Student(String[] name, String species, int age, int grade, String studentID)
// {
// this.name = name;
// this.species = species;
// this.age = age;
// this.grade = grade;
// this.studentID = studentID;
// }
// }

// public void method0() {
// System.out.println("hi");
// log("method0");
// method1();
// delay(1000);
// log("finished");
// }

// public void method1() {
// System.out.println("bye");
// log("method1");
// }

// public static void main(String[] args) {

// Student gumball = new Student(new String[] { "Gumball", "Tristopher",
// "Watterson" },
// "cat", 12, 7, "000029083");

// System.out.println(gumball.age);
// }
// }
