import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get('user/:id')
  async getUser(@Param('id') id: number) {
    return await this.userService.getUser(id);
  }
}
