import { timingSafeEqual } from 'node:crypto';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const response = await this.repository.createQueryBuilder().where(`title ILIKE '%${param}%'`).getMany()
    return response
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("select count(id) from games")
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const result = await this.repository.createQueryBuilder().relation(Game, 'users').of(id).loadMany();
    return result
  }
}
