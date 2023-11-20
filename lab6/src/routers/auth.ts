import { Router } from "express";
import { log } from "sys";
import { z } from "zod";
import passport from "~/auth/passport";
import { checkNotAuthenticated } from "~/middlewares/isAuthed";

const router = Router();

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/auth/login",
    failureMessage: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logOut({ keepSessionInfo: false }, () => {
    res.redirect("login");
  });
});

router.get("/register", checkNotAuthenticated, (req, res) => {
  return res.render("register");
});

router.post(
  "/register",
  checkNotAuthenticated,
  async ({ body, login }, res, next) => {
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

      return res.redirect("/login");

      // const user = await User.create({
      //   email: parsedBody.data.user_email,
      //   username: parsedBody.data.user_username,
      //   password: hash,
      //   registrationDate: new Date(),
      // });

      // login(user, (err) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   res.redirect('http://localhost:3000/users');
      // });
    } catch (e) {}

    return res.send({ message: "register" });
  },
);

export default router;
