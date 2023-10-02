import checkGuess from "./src/utils/checkGuess";
import createNewGame from "./src/utils/createNewGame";

let game = createNewGame();

const server = Bun.listen({
  hostname: "localhost",
  port: 8080,
  socket: {
    open(socket) {
      socket.write(game.code.toString() + "\n");
      socket.write("Welcome in MasterMind!\n");
      socket.write("Write your guess in a format 0000:\n");
    }, // socket opened

    data(socket, data) {
      const message = data.toString().trim();

      const matchResult = message.match(/\d{4}/);
      if (matchResult) {
        const guess = message.split("").map((char) => +char);

        const result = checkGuess(game.code, guess);

        if (result.every((value) => value === 1)) {
          socket.write("You won!");
          game = createNewGame();
          socket.end();
        }

        game.board.push(result);

        socket.write(game.board.at(-1)!.toString() + "\n");
      } else {
        socket.write("Wrong guess format!\n");
      }
    }, // message received from client

    close(socket) {
      socket.write("Good Bye!\n");
    }, // socket closed

    drain(socket) {}, // socket ready for more data

    error(socket, error) {}, // error handler
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
