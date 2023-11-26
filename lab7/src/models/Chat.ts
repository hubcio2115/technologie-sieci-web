import { Schema, model, type ObjectId, Types } from 'mongoose';

export interface Message {
  message: string;
  userId: ObjectId;
}

const messageSchema = new Schema<Message>({
  message: String,
  userId: Types.ObjectId,
});

export default model<Message>('Message', messageSchema);
