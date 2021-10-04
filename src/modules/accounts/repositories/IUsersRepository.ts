export interface ICreateUsersDTO {
  email: string;
  name: string;
  username: string;
  password: string;
  driver_license: string;
}

export interface IUsersRepository {
  create(createUsersData: ICreateUsersDTO): Promise<void>;
}
