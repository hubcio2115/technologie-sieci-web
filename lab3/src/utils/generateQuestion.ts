export default function generateQuestion(length: number, dim: number) {
  const question: number[] = [];

  for (let i = 0; i < length; i++) {
    question.push(Math.floor(Math.random() * (dim + 1)));
  }

  return question;
}
