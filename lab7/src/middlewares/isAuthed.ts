import type { NextFunction, Request, Response } from "express";

export function checkAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authed = req.isAuthenticated();

  if (!authed) return res.redirect("/auth/login");
  return next();
}

export function checkNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authed = req.isAuthenticated();

  if (!authed) return next();
  return res.redirect("/users");
}
