import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', authenticateRoutes);

routes.use('/cars', carsRoutes);

routes.use(ensureAuthenticated);
routes.use(ensureAdmin);

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
