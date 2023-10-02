export default function checkGuess(
  code: number[],
  guess: number[],
): (0 | 1 | 2)[] {
  const result = guess.map((value, index) => {
    if (value === code[index]) return 1;
    else if (code.includes(value)) return 2;
    return 0;
  });

  return result;
}
