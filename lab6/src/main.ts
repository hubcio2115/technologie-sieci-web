import express from 'express';
import { connect } from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import { env } from '~/env';
import auth from '~/routers/auth';
import users from '~/routers/users';
import passport from '~/auth/passport';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  }),
);

app.use(passport.initialize());

app.set('view engine', 'ejs');

// Dodajemy usługi REST, które należy zdefiniować w pliku „users.ts”
// znajdującym się w podkatalogu „routes”
app.use('/auth', auth);
app.use('/users', users);

// Łączymy się z bazą MongoDB i jeśli się to uda, uruchamiamy serwer API.
try {
  const res = await connect(
    `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}?authSource=admin`,
  );

  console.log(
    `Connected to MongoDB. Database name: "${res.connections.at(0)?.name}"`,
  );

  app.listen(env.PORT, () => {
    console.log(`API server available from: ${env.API_HOST}:${env.PORT}`);
  });
} catch (err) {
  console.error('Error connecting to MongoDB', err);
}
