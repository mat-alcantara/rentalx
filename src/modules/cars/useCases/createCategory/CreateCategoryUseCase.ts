import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface ICreateCategoryRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ description, name }: ICreateCategoryRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExist) {
      throw new AppError('Category name already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}
