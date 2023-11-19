import { NextFunction, Request, Response } from 'express';

export function isAuthed(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return next();

  return res.redirect('/auth/login');
}

export function isNotAuthed(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return res.redirect('/auth/login');

  return next();
}
