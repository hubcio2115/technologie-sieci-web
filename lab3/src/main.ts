import { Elysia } from "elysia";
import { v4 as uuid } from "uuid";
import { z, ZodError } from "zod";
import rateAnswer from "./utils/rateAnswer";
import generateQuestion from "./utils/generateQuestion";

const DEFAULT_PARAMETERS = {
  size: 5,
  max: 10,
  dim: 9,
} as const;

const gameSchema = z.object({
  gameId: z.string(),
  size: z.number(),
  dim: z.number(),
  max: z.number(),
  round: z.number(),
  answer: z.array(z.number()).optional(),
});

type Game = z.infer<typeof gameSchema>;

const games = new Map<string, Omit<Game, "gameId">>();

const app = new Elysia();

app.post("/mmind", ({ body, set }) => {
  const data = gameSchema.omit({ gameId: true }).partial().parse(body);

  if (data.dim && (data?.dim < 0 || data?.dim > 9)) {
    set.status = 400;
    return new Error("Dim has to be a number between 0 and 10");
  }

  const answer = generateQuestion(
    data.size ?? DEFAULT_PARAMETERS.size,
    data.dim ?? DEFAULT_PARAMETERS.dim,
  );

  const newGameId = uuid();
  const newGame = {
    size: answer.length,
    max: data.max ?? DEFAULT_PARAMETERS.max,
    dim: data.dim ?? DEFAULT_PARAMETERS.dim,
    round: 0,
  };

  games.set(newGameId, {
    answer,
    ...newGame,
  });

  return {
    gameId: newGameId,
    ...newGame,
  };
});

app.patch("/mmind", async ({ body, set }) => {
  try {
    const data = z.array(z.any()).nonempty().parse(body);

    const gameId = data[0];
    if (typeof gameId !== "string")
      throw new TypeError("GameId has to be of type string.");

    const game = games.get(gameId);
    if (!game) throw new Error("Provided game id has not been found");
    if (game.size !== data.length - 1)
      throw new Error(
        `Wrong length of the answer it should contain ${game.max} digits`,
      );

    const round = await rateAnswer(game.answer!, data.slice(1));

    if (round.black === game.answer?.length) {
      games.delete(gameId);
      return "You won!";
    }

    game.round++;

    if (game.round === game.max) {
      games.delete(gameId);

      return `You lost with a score of black: ${round.black}, white: ${round.white}`;
    }

    return {
      gameId,
      ...round,
    };
  } catch (e) {
    set.status = 400;

    if (e instanceof ZodError)
      return new Error("You have to pass a non empty array.");

    return e;
  }
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
