import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let carsRepository: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe('List cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepository);
  });

  it('should be able to list all available cars', async () => {
    const carsAvailable = await listCarsUseCase.execute();
  });
});
