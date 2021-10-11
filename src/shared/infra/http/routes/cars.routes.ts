import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ensureAdmin } from '../middlewares/ensureAdmin';

export const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post('/', ensureAdmin, createCarController.handle);
