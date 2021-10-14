import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should not be able to add a new specification to a non-existent car', () => {
    const car_id = '123';
    const specification_id = ['123'];

    expect(async () => {
      await createCarSpecificationUseCase.execute({ car_id, specification_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id: ['123'],
    });
  });
});
