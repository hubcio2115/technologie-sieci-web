import { z } from "zod";

const gameSchema = z.object({
  gameId: z.string(),
  size: z.number(),
  max: z.number(),
  dim: z.number(),
  round: z.number(),
});

export default gameSchema;

export interface Game {
  gameId: string;
  size: number;
  max: number;
  dim: number;
  round: number;
}
