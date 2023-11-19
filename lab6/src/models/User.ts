import { Schema, model } from 'mongoose';

export interface User {
  username: string;
  email: string;
  registrationDate: Date;
  role: 'user' | 'admin';
  password: string;
}

// Pole „_id” (które ma modelować userId) dodawane jest domyślnie, dlatego pomijamy je w deklaracji
const userSchema = new Schema<User>({
  username: String,
  email: String,
  registrationDate: Date,
  password: String,
  role: String,
});

export default model<User>('User', userSchema);
