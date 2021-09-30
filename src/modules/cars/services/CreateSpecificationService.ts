import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';

interface ICreateSpecificationRequest {
  description: string;
  name: string;
}

export class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ description, name }: ICreateSpecificationRequest): void {
    const specificationAlreadyExist =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExist) {
      throw new Error('Specification name already exists');
    }

    this.specificationsRepository.create({ name, description });
  }
}
