import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { RegisterDto, LoginDto } from './entities/dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  async register(dto: RegisterDto, manager: EntityManager = this.entityManager) {
    const exists = await manager.findOne(User, { where: { login: dto.login } });
    if (exists) {
      throw new BadRequestException('Пользователь с таким логином существует');
    }
    const password_hash = await bcrypt.hash(dto.password, 10);
    const user = manager.create(User, {
      login: dto.login,
      password_hash,
      name: dto.name,
    });
    return manager.save(user);
  }

  async login(dto: LoginDto, manager: EntityManager = this.entityManager) {
    const user = await manager.findOne(User, { where: { login: dto.login } });
    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const ok = await bcrypt.compare(dto.password, user.password_hash); // Упрощенная реализация для примера
    if (!ok) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    return user;
  }
}
