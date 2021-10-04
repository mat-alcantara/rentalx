import { ICreateUsersDTO } from '../dtos/ICreateUsersDTO';

export interface IUsersRepository {
  create(createUsersData: ICreateUsersDTO): Promise<void>;
}
