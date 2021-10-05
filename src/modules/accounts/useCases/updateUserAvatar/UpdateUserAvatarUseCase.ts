import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IUpdateUserAvatarRequest {
  userId: string;
  avatarFile: string;
}
@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    avatarFile,
  }: IUpdateUserAvatarRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
