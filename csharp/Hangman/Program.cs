string[] hangman = new string[]
{
    @"
  +---+
      |
      |
      |
      |
      |
=========",
    @"
  +---+
  |   |
      |
      |
      |
      |
=========",
    @"
  +---+
  |   |
  O   |
      |
      |
      |
=========",
    @"
  +---+
  |   |
  O   |
  |   |
      |
      |
=========",
    @"
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========",
    @"
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========",
    @"
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========",
    @"
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
========="
};

string wordsList =
    "cool know over these about down large please they after drink learn put think again each little red this ago everything live right those all face location run three also far make same to always fast man sea together am father many seven try an find may shop turn and first meaning sit under any five men six until are fly mother sleep us as foot much small use from must smile want ask give never some we at go no sorry well away green not star what because has now stay when bed here ocean stop where black his of store which blue how old strong why bring in on tell will call into one thank with clean is only that yellow cold it or the yes color just our you come kind out there";

string[] words = wordsList.Split(' ');
Random random = new Random();
string word = words[random.Next(0, words.Length)];

char[] lines = new string('_', word.Length).ToCharArray();
int wrong = 0;

while (wrong < hangman.Length)
{
    Console.WriteLine("Guessed word: " + new string(lines));
    Console.WriteLine("Lives: " + lives);

    Console.Write("Enter your guess: ");
    char guess = Console.ReadKey().KeyChar;
    Console.WriteLine();

    bool correctGuess = false;
    for (int i = 0; i < word.Length; i++)
    {
        if (word[i] == guess)
        {
            lines[i] = guess;
            correctGuess = true;
        }
    }

    if (!correctGuess)
    {
        lives--;
        Console.WriteLine("Incorrect guess. You lost a life.");
    }
    else if (new string(lines) == word)
    {
        Console.WriteLine("Congratulations! You guessed it!");
        return;
    }
}

if (wrong == hangman.Length)
{
    Console.WriteLine("Game over. The word was: " + word);
}
