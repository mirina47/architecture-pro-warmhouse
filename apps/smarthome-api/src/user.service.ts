import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  async getUsers(manager: EntityManager = this.entityManager): Promise<User[]> {
    return await manager.find(User);
  }

  async getUser(id: number, manager: EntityManager = this.entityManager): Promise<User | null> {
    return await manager.findOne(User, { where: { id } });
  }
}
