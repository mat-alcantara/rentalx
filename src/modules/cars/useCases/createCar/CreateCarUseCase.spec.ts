import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    createCarUseCase.execute({
      brand: 'brand',
      category_id: 'id',
      daily_rate: 2121,
      description: 'flkdaf',
      fine_amount: 323,
      license_place: 'fsdklj',
      name: 'dfjksdlf',
    });
  });
});
