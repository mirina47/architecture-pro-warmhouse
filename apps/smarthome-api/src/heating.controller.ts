import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { HeatingService } from './heating.service';
import { SensorHeatingDto, SensorValueHeatingDto } from './entities/dto';

@Controller('heating/sensors')
export class HeatingController {
  constructor(private readonly heatingService: HeatingService) {}

  @Get()
  async GetAllSensors() {
    return await this.heatingService.GetAllSensors();
  }

  @Get(':id')
  async GetSensorByID(@Param('id') id: number) {
    return await this.heatingService.GetSensorByID(id);
  }

  @Post('sensors')
  async CreateSensor(@Body() dto: SensorHeatingDto) {
    return await this.heatingService.CreateSensor(dto);
  }

  @Put(':id')
  async UpdateSensor(@Param('id') id: number, @Body() dto: SensorHeatingDto) {
    return await this.heatingService.UpdateSensor(id, dto);
  }

  @Delete(':id')
  async DeleteSensor(@Param('id') id: number) {
    return await this.heatingService.DeleteSensor(id);
  }

  @Patch(':id/value')
  async UpdateSensorValue(@Param('id') id: number, @Body() dto: SensorValueHeatingDto) {
    return await this.heatingService.UpdateSensorValue(id, dto);
  }

  @Get('temperature/:location')
  async GetTemperatureByLocation(@Param('location') location: string) {
    return await this.heatingService.GetTemperatureByLocation(location);
  }
}
