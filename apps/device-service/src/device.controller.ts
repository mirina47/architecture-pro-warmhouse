import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceTypeDto } from './entities/device-type.entity';
import { CreateDeviceDto } from './entities/device.entity';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('devices/house/:houseId')
  async getHouseDeviceTypes(@Param('houseId') houseId: number) {
    return await this.deviceService.getHouseDevices(houseId);
  }

  @Post('deviceType')
  async createDeviceType(@Body() dto: DeviceTypeDto) {
    return await this.deviceService.createDeviceType(dto);
  }

  @Patch('deviceType/:id')
  async updateDeviceType(@Param('id') id: number, @Body() dto: DeviceTypeDto) {
    return await this.deviceService.updateDeviceType(id, dto);
  }

  @Delete('deviceType/:id')
  async deleteDeviceType(@Param('id') id: number) {
    return await this.deviceService.deleteDeviceType(id);
  }

  @Post('device')
  async createDevice(@Body() dto: CreateDeviceDto) {
    return await this.deviceService.createDevice(dto);
  }

  @Patch('device:id')
  async updateDevice(@Param('id') id: number, @Body() dto: { status: string; is_active: boolean }) {
    return await this.deviceService.updateDevice(id, dto);
  }
}
