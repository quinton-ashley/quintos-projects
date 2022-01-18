package games_java.Test;

import java.util.ArrayList;

public class Test {
	Integer[] arr0 = new Integer[4];
	String[] arr1 = new String[] { "c", "b", "c" };
	String[] arr2 = new String[] { "a" };
	Integer[] arr3 = new Integer[] { 5 };

	static ArrayList<String> arr4 = new ArrayList<String>();

	public static void main(String[] args) {

		Test t0 = new Test();
		System.out.println(t0.arr2);

		arr4.add("hello");
		System.out.println(arr4);
	}
}
