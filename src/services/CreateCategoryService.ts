import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface ICreateCategoryRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ description, name }: ICreateCategoryRequest): void {
    const categoryAlreadyExist = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExist) {
      throw new Error('Category name already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
