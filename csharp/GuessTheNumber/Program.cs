Random random = new Random();
int num = random.Next(1, 101);
int guess = 0;

Console.WriteLine("Welcome to the Guess the Number game!");
Console.WriteLine("I have chosen a number between 1 and 100.");
Console.WriteLine("Can you guess it?");

while (guess != num)
{
    Console.Write("Enter your guess: ");
    guess = int.Parse(Console.ReadLine());

    if (guess < num)
    {
        Console.WriteLine("Too low! Try again.");
    }
    else if (guess > num)
    {
        Console.WriteLine("Too high! Try again.");
    }
    else
    {
        Console.WriteLine("You guessed it!");
    }
}
