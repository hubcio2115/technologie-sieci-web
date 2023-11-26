import { Router } from 'express';
import Chat from '~/models/Chat';

const router = Router();

router.get('/:room', async ({ params: { room } }, res) => {
  const messages = await Chat.find({ room: '/' + room });

  res.send(messages);
});

export default router;
