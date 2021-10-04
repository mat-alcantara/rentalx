import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';
import { AppError } from '../shared/errors/AppError';

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
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'mateus') as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    return next();
  } catch {
    throw new AppError('Token invalid', 401);
  }
};
