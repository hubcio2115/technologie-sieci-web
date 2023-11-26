import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "~/models/User";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });

    if (!user) return done(null, false, { message: "Authentication failed." });

    const authorized = await Bun.password.verify(password, user.password);

    if (!authorized)
      return done(null, false, { message: "Authentication failed." });

    return done(null, user._id.toString());
  }),
);

passport.serializeUser((id, done) => {
  return done(null, id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  return done(null, {
    id,
    username: user?.username,
    email: user?.email,
    role: user?.role,
  });
});

export default passport;
