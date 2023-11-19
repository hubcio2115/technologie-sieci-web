import type { ObjectId } from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { env } from '~/env';
import User, { type User as TUser } from '~/models/User';

const USER_NOT_FOUND_MESSAGE = 'No user found';
const INCORRECT_CREDENTIALS_MESSAGE = 'Incorrect credentials';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });

    if (!user) return done(null, false);

    const authorized = await Bun.password.verify(password, user.password);

    if (!authorized) return done(null, false);

    return done(null, user);
  }),
);

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    const temp = user as TUser & { _id: ObjectId };
    return done(null, {
      id: temp._id.toString(),
      username: temp.username,
      role: temp.role,
    });
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user as TUser);
  });
});

export default passport;
