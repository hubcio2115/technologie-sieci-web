import express from 'express';
import { connect } from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { env } from '~/env';
import auth from '~/routers/auth';
import users from '~/routers/users';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { createAdapter } from '@socket.io/mongo-adapter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}?authSource=admin`,
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.set('view engine', 'ejs');

// Dodajemy usługi REST, które należy zdefiniować w pliku „users.ts”
// znajdującym się w podkatalogu „routes”
app.use('/auth', auth);
app.use('/users', users);

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('chat message', (message: string) => {
    io.emit('chat message', message);
  });
});

// Łączymy się z bazą MongoDB i jeśli się to uda, uruchamiamy serwer API.
try {
  const res = await connect(
    `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}?authSource=admin`,
  );

  io.adapter(
    createAdapter(res.connection.collection('socket.io-adapter-events')),
  );

  server.listen(env.PORT, () => {
    console.log(`API server 🥟 available on: ${env.API_HOST}:${env.PORT}`);
  });
} catch (err) {
  console.error('Error connecting to MongoDB', err);
}
