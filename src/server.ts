/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from 'express';
import swagger from 'swagger-ui-express';
import 'reflect-metadata';
import './database';
import './shared/container';
import 'express-async-errors';

import { routes } from './routes';
import { AppError } from './shared/errors/AppError';
import swagerConfig from './swagger.json';

const app = express();

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

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
