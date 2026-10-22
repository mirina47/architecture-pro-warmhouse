import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateHouseDto, House } from './entities/house.entity';
import { User } from './entities/user.entity';

@Injectable()
export class HouseService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  async getHouses(userId: number, manager: EntityManager = this.entityManager): Promise<House[]> {
    const user = await manager.findOne(User, { where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return await manager.find(House, { where: { user: user } });
  }

  async createHouse(dto: CreateHouseDto, manager: EntityManager = this.entityManager): Promise<House> {
    const user = await manager.findOne(User, { where: { id: dto.user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.user_id} not found`);
    }
    const createdHouse = manager.getRepository(House).create({ ...dto, user: user });
    return await manager.getRepository(House).save(createdHouse);
  }
}
