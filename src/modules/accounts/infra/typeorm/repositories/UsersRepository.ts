import { Repository, getRepository } from 'typeorm';

import { ICreateUsersDTO } from '../../dtos/ICreateUsersDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }
}
