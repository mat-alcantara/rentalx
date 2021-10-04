import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface ICreateSpecificationRequest {
  description: string;
  name: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({
    description,
    name,
  }: ICreateSpecificationRequest): Promise<void> {
    const specificationAlreadyExist =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExist) {
      throw new Error('Specification name already exists');
    }

    await this.specificationsRepository.create({ name, description });
  }
}
