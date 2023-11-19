import { Router } from 'express';
import { z } from 'zod';
import User from '~/models/User';
import { env } from '~/env';
import { sign } from 'jsonwebtoken';
import passport from 'passport';

const router = Router();

router.get('/login', (_, res) => {
  return res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: 'login',
    failWithError: true,
    failureMessage: true,
  }),
);

router.post('/logout', (req, res) => {
  req.logOut({ keepSessionInfo: false }, () => {
    res.redirect('http://localhost:3000/auth/login');
  });
});

router.get('/register', (_, res) => {
  return res.render('register');
});

router.post('/register', async ({ body, login }, res, next) => {
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

    return res.redirect('/login');

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

  return res.send({ message: 'register' });
});

export default router;
