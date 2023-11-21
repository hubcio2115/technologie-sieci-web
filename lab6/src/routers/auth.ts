import { Router } from "express";
import { z } from "zod";
import passport from "~/auth/passport";
import {
  checkAuthenticated,
  checkNotAuthenticated,
} from "~/middlewares/isAuthed";
import User from "~/models/User";

const router = Router();

router.get("/login", checkNotAuthenticated, (_, res) => {
  return res.render("login");
});

router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
);

router.get("/logout", checkAuthenticated, (req, res) => {
  req.logOut({ keepSessionInfo: false }, () => {
    res.redirect("login");
  });
});

router.get("/register", checkNotAuthenticated, (_, res) => {
  return res.render("register");
});

router.post("/register", checkNotAuthenticated, async ({ body }, res) => {
  try {
    const parsedBody = z
      .object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
      .safeParse(body);

    if (!parsedBody.success) {
      res.status(400);
      return res.send({ message: "Password's not been provided." });
    }

    const hashedPassword = await Bun.password.hash(parsedBody.data.password);

    await User.create({
      email: parsedBody.data.email,
      username: parsedBody.data.username,
      password: hashedPassword,
      registrationDate: new Date(),
    });

    return res.redirect("/login");
  } catch (e) {
    console.error(e);
  }

  return res.send({ message: "register" });
});

export default router;
