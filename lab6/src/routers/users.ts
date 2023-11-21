import { Router } from 'express';
import User from '~/models/User';
import { isValidObjectId } from 'mongoose';
import { checkAuthenticated } from '~/middlewares/isAuthed';

const router = Router();

// Pobranie danych wszystkich użytkowników
router.get('/', checkAuthenticated, async (req, res) => {
  const users = await User.find({});

  return res.render('index', { users, user: req.user });
});

// Utworzenie nowego użytkownika
router.post('/create', checkAuthenticated, async ({ body, user }, res) => {
  if (user!.role !== 'admin') {
    res.status(403);
    return res.send({ message: 'Unauthorized' });
  }

  const userData = {
    username: body.username,
    email: body.email,
    registrationDate: new Date(),
    role: 'user',
  };

  const newUser = new User(userData);

  const err = newUser.validateSync();
  if (err) return res.sendStatus(400);

  await newUser.save();

  return res.redirect('/users');
});

// Pobranie danych użytkownika o podanym userId
router.get(
  '/:userId',
  checkAuthenticated,
  async ({ params: { userId } }, res) => {
    if (!isValidObjectId(userId)) return res.sendStatus(404);

    const user = await User.findById(userId);

    return res.render('userDetails', { user });
  },
);

// Zastąpienie danych użytkownika o podanym userId nowym „kompletem”
router.put(
  '/:userId',
  checkAuthenticated,
  async ({ body, params: { userId }, user }, res) => {
    if (!isValidObjectId(userId)) return res.sendStatus(404);

    if (user!.role !== 'admin' || user!.id !== userId) {
      res.status(403);
      return res.send({ message: 'Unauthorized' });
    }

    const userData = { id: userId, date: new Date(body.date), ...body };

    const newUser = new User(userData);

    const err = newUser.validateSync();
    if (err) return res.sendStatus(400);

    const createdUser = await newUser.replaceOne();

    return res.send(createdUser);
  },
);

// Usuniecie użytkownika o podanym userId
router.delete(
  '/:userId',
  checkAuthenticated,
  async ({ params: { userId }, user }, res) => {
    if (!isValidObjectId(userId)) return res.sendStatus(404);

    if (user!.role !== 'admin' || user!.id !== userId) {
      res.status(403);
      return res.send({ message: 'Unauthorized' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!user) return res.sendStatus(404);

    return res.send(deletedUser);
  },
);

export default router;
