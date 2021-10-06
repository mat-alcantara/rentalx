import { AppError } from '../../../../shared/errors/AppError';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('creates a new category', async () => {
    const category = {
      name: 'Sedan',
      description: 'Carro de pobre',
    };

    await createCategory.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('returns error when creating two categories with same name', async () => {
    const category = {
      name: 'Sedan',
      description: 'Carro de pobre',
    };

    expect(async () => {
      await createCategory.execute(category);

      await createCategory.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
