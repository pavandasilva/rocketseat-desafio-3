import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await  this.repository.findOneOrFail({
      where: { id: user_id  },
    });

    return user
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
   /*  return this.repository.query(); // Complete usando raw query */

   return [] as User[]
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query("SELECT email, first_name, last_name FROM users where LOWER(first_name)=LOWER($1) and LOWER(last_name)=LOWER($2)", [first_name, last_name]);
  }
}
