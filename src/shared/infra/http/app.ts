/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from 'express';
import swagger from 'swagger-ui-express';

import 'reflect-metadata';
import '@shared/container';
import 'express-async-errors';

import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import swagerConfig from '../../../swagger.json';
import { routes } from './routes';

export const app = express();

createConnection();

app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swagerConfig));

app.use(routes);

app.use(
  (
    err: Error,
    request: Request,
    response: Response,
    _next: NextFunction,
  ): Response => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ error: err.message });
    }

    return response
      .status(500)
      .json({ error: `Internal server error! - ${err.message}` });
  },
);
