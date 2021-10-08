import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_place,
    name,
  }: ICreateCarDTO): Promise<void> {
    const carAlreadyExist = await this.carsRepository.findByLicensePlate(
      license_place,
    );

    if (carAlreadyExist) {
      throw new AppError('Car already exist');
    }

    await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_place,
      name,
    });
  }
}
