import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const carsAvailable = await listCarsUseCase.execute({});

    expect(carsAvailable).toEqual([car]);
  });

  it('should be able to list all available cars by name, brand and category_id', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand1',
      category_id: 'category1',
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand2',
      category_id: 'category2',
    });

    const carsAvailableByName = await listCarsUseCase.execute({
      name: car1.name,
    });

    const carsAvailableByBrand = await listCarsUseCase.execute({
      brand: car2.brand,
    });

    const carsAvailableByCategoryId = await listCarsUseCase.execute({
      category_id: car1.category_id,
    });

    expect(carsAvailableByName).toEqual([car1]);
    expect(carsAvailableByBrand).toEqual([car2]);
    expect(carsAvailableByCategoryId).toEqual([car1]);
  });

  it('should be able to list all available cars by name, brand and category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const carsAvailable = await listCarsUseCase.execute({ name: car.name });

    expect(carsAvailable).toEqual([car]);
  });
});
