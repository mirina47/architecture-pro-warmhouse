import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { CreateSensorDto, CreateSensorRecordDto } from './entities/dto';

@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post('sensor')
  async createSensor(@Body() dto: CreateSensorDto) {
    return await this.telemetryService.createSensor(dto);
  }

  @Get('sensors/house/:houseId')
  async getHouseSensors(@Param('houseId') houseId: number) {
    return await this.telemetryService.getHouseSensors(houseId);
  }

  @Patch('sensor/:id')
  async updateSensor(@Param('id') id: number, @Body() dto: { is_active: boolean; descr: string }) {
    return await this.telemetryService.updateSensor(id, dto);
  }

  @Post('sensorRecord')
  async createSensorRecord(@Body() dto: CreateSensorRecordDto) {
    return await this.telemetryService.createSensorRecord(dto);
  }

  @Get('sensorRecords/:sensorId')
  async getSensorRecords(@Param('sensorId') sensorId: number) {
    return await this.telemetryService.getSensorRecords(sensorId);
  }

  @Get('sensorRecords/last/:sensorId')
  async getLastSensorRecord(@Param('sensorId') sensorId: number) {
    return await this.telemetryService.getLastSensorRecord(sensorId);
  }
}
