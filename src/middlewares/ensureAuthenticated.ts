import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, 'mateus') as IPayload;

    request.user = sub;

    return next();
  } catch {
    throw new Error('Token invalid');
  }
};
