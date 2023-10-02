export default function createNewGame() {
  const code = Array.from(Array(4).keys()).map(() =>
    Math.floor(Math.random() * 10),
  );

  const board: number[][] = [];

  return { code, board };
}
