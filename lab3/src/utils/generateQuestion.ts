export default function generateQuestion(length: number) {
  const question: number[] = [];

  for (let i = 0; i < length; i++) {
    question.push(Math.floor(Math.random() * 10));
  }

  return question;
}
