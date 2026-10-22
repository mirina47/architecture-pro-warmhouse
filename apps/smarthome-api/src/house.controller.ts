import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './entities/house.entity';

@Controller('houses')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get('houses/:userId')
  async getHouses(@Param('userId') userId: number) {
    return await this.houseService.getHouses(userId);
  }

  @Post('house')
  async createHouse(@Body() dto: CreateHouseDto) {
    return await this.houseService.createHouse(dto);
  }
}
