import { Router } from "express";
import User from "~/models/User";
import { isValidObjectId } from "mongoose";
import { checkAuthenticated } from "~/middlewares/isAuthed";

const router = Router();

// Pobranie danych wszystkich użytkowników
router.get("/", checkAuthenticated, async (req, res) => {
  const users = await User.find({});

  return res.render("index", { users, user: req.user });
});

// Utworzenie nowego użytkownika
router.post("/", async ({ body }, res) => {
  const userData = {
    username: body.username,
    email: body.email,
    registrationDate: new Date(),
    role: "user",
  };

  const newUser = new User(userData);

  const err = newUser.validateSync();
  if (err) return res.sendStatus(400);

  await newUser.save();

  return res.redirect("/users");
});

// Pobranie danych użytkownika o podanym userId
router.get("/:userId", async ({ params: { userId } }, res) => {
  if (!isValidObjectId(userId)) return res.sendStatus(404);

  const user = await User.findById(userId);

  return res.render("userDetails", { user });
});

// Zastąpienie danych użytkownika o podanym userId nowym „kompletem”
router.put("/:userId", async ({ body, params: { userId } }, res) => {
  if (!isValidObjectId(userId)) return res.sendStatus(404);

  const userData = { id: userId, date: new Date(body.date), ...body };

  const newUser = new User(userData);

  const err = newUser.validateSync();
  if (err) return res.sendStatus(400);

  const user = await newUser.replaceOne();

  return res.send(user);
});

// Usuniecie użytkownika o podanym userId
router.delete("/:userId", async ({ params: { userId } }, res) => {
  if (!isValidObjectId(userId)) return res.sendStatus(404);

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
