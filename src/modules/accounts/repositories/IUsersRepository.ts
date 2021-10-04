import { ICreateUsersDTO } from '../dtos/ICreateUsersDTO';
import { User } from '../entities/User';

export interface IUsersRepository {
  create(createUsersData: ICreateUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
