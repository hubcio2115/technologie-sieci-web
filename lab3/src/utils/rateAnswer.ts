type Points = {
  black: number;
  white: number;
};

export default function rateAnswer(answer: number[], guess: number[]): Points {
  const res: { black: number[]; white: number[] } = {
    black: [],
    white: [],
  };

  guess.forEach((value, index) => {
    if (value === answer[index]) res.black.push(index);
    else if (answer.includes(value)) res.white.push(index);
  });

  return {
    black: res.black.reduce((acc) => acc + 1, 0),
    white: res.white.reduce((acc) => acc + 1, 0),
  };
}
