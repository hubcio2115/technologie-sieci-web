import express from 'express';
import users from './routers/users';
import { connect } from 'mongoose';
import multer from 'multer';

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');

// Dodajemy usługi REST, które należy zdefiniować w pliku „users.ts”
// znajdującym się w podkatalogu „routes”
app.use('/users', users);

// Wczytujemy ewentualne dane konfiguracyjne z pliku „.env”
const dbConnData = {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || 'test',
};

// Łączymy się z bazą MongoDB i jeśli się to uda, uruchamiamy serwer API.
try {
  const res = await connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}?authSource=admin`,
  );

  console.log(
    `Connected to MongoDB. Database name: "${res.connections.at(0)?.name}"`,
  );

  const apiPort = process.env.PORT || 3000;
  const apiHost = process.env.API_HOST || 'localhost';

  app.listen(apiPort, () => {
    console.log(`API server available from: http://${apiHost}:${apiPort}`);
  });
} catch (err) {
  console.error('Error connecting to MongoDB', err);
}
