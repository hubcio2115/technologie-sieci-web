import { Schema, model, type ObjectId, Types } from 'mongoose';

export interface Message {
  message: string;
  userId: ObjectId;
  room: `/${'global' | 'notGlobal'}`;
}

const messageSchema = new Schema<Message>({
  message: String,
  room: String,
  userId: Types.ObjectId,
});

export default model<Message>('Message', messageSchema);
