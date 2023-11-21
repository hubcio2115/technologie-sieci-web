import { type User as TUser } from '~/models/User';

declare module 'express-serve-static-core' {
  interface User extends TUser {
    id: string;
  }

  interface Request {
    user?: User;
  }
}
