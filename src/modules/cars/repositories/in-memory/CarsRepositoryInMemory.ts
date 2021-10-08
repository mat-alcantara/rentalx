import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_place === license_plate);

    return car;
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_place,
    name,
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_place,
      name,
    });

    this.cars.push(car);
  }
}
