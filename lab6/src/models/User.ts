import { Schema, model } from "mongoose";

interface User {
  login: string;
  email: string;
  registrationDate: Date;
}

// Pole „_id” (które ma modelować userId) dodawane jest domyślnie, dlatego pomijamy je w deklaracji
const userSchema = new Schema<User>({
  login: String,
  email: String,
  registrationDate: Date,
});

export default model<User>("User", userSchema);
