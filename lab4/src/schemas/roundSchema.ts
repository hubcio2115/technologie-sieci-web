import { z } from "zod";

const roundSchema = z.object({
  gameId: z.string(),
  black: z.number(),
  white: z.number(),
});

export default roundSchema;

export interface Round {
  gameId: string;
  black: number;
  white: number;
  move: number[];
}
