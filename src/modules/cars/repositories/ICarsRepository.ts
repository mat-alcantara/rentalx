import { ICreateCarDTO } from '../dtos/ICreateCarDTO';

export interface ICarsRepository {
  create(carsData: ICreateCarDTO): Promise<void>;
}
