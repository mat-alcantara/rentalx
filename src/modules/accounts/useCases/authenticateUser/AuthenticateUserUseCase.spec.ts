import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUsersDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should authenticate user', async () => {
    const user: ICreateUsersDTO = {
      name: 'Mateus',
      password: '12345',
      email: 'mateus@mateus.com',
      driver_license: 'dasjkldsaj',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a non existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'wrongEmail',
        password: 'wrongPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate user if password is wrong', async () => {
    const user: ICreateUsersDTO = {
      name: 'Mateus',
      password: '12345',
      email: 'mateus@mateus.com',
      driver_license: 'dasjkldsaj',
    };

    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrongPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
