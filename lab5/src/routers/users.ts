import { Router } from "express";
import User from "../models/User";

const router = Router();

// Pobranie danych wszystkich użytkowników
router.get("/", (_, res) => {
  return res.send(User.find({}));
});

// Utworzenie nowego użytkownika
router.post("/", async ({ body }, res) => {
  const userData = { date: new Date(body.date), ...body };

  const newUser = new User(userData);

  const err = newUser.validateSync();
  if (err) return res.sendStatus(400);

  const user = await newUser.save();

  return res.send(user);
});

// Pobranie danych użytkownika o podanym userId
router.get("/:userId", async (req, res) => {
  return res.send(await User.findById(req.params.userId));
});

// Zastąpienie danych użytkownika o podanym userId nowym „kompletem”
router.put("/:userId", async ({ body, params: { userId } }, res) => {
  const userData = { id: userId, date: new Date(body.date), ...body };

  const newUser = new User(userData);

  const err = newUser.validateSync();
  if (err) return res.sendStatus(400);

  const user = await newUser.replaceOne();

  return res.send(user);
});

// Usuniecie użytkownika o podanym userId
router.delete("/:userId", async ({ params: { userId } }, res) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) return res.sendStatus(404);

  return res.send(user);
});

// „Unacześnienie” wybranych danych użytkownika o podanym userId
router.patch("/:userId", async ({ params: { userId }, body }, res) => {
  const userQuery = new User({
    id: userId,
    date: new Date(body.date),
    ...body,
  });

  const err = userQuery.validateSync();
  if (err) return res.sendStatus(400);

  const user = await userQuery.updateOne();

  return res.send(user);
});

export default router;
