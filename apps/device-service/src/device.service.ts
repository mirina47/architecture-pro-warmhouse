import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto, Device } from './entities/device.entity';
import { DeviceTypeDto, DeviceType } from './entities/device-type.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  async createDeviceType(dto: DeviceTypeDto, manager: EntityManager = this.entityManager): Promise<DeviceType> {
    const createdDeviceType = manager.getRepository(DeviceType).create(dto);
    return await manager.getRepository(DeviceType).save(createdDeviceType);
  }

  async updateDeviceType(id: number, dto: DeviceTypeDto, manager: EntityManager = this.entityManager): Promise<void> {
    const result = await manager.update(DeviceType, id, dto);
  }

  async deleteDeviceType(id: number, manager: EntityManager = this.entityManager): Promise<void> {
    const deviceType = await manager.findOne(DeviceType, { where: { id: id } });
    if (!deviceType) {
      throw new NotFoundException(`DeviceType with ID ${id} not found`);
    }
    await manager.remove(deviceType);
  }

  async createDevice(dto: CreateDeviceDto, manager: EntityManager = this.entityManager): Promise<Device> {
    const deviceType = await manager.findOne(DeviceType, { where: { id: dto.type_id } });
    if (!deviceType) {
      throw new NotFoundException(`DeviceType with ID ${dto.type_id} not found`);
    }
    const createdDevice = manager.getRepository(Device).create({ ...dto, type_id: deviceType });
    return await manager.getRepository(Device).save(createdDevice);
  }

  async getHouseDevices(houseId: number, manager: EntityManager = this.entityManager): Promise<Device[]> {
    return await manager.find(Device, { where: { house_id: houseId } });
  }

  async updateDevice(id: number, dto: { status: string; is_active: boolean }, manager: EntityManager = this.entityManager): Promise<void> {
    const result = await manager.update(Device, id, { status: dto.status, is_active: dto.is_active });
  }

  async deleteDevice(id: number, manager: EntityManager = this.entityManager): Promise<void> {
    const device = await manager.findOne(Device, { where: { id: id } });
    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }
    await manager.remove(device);
  }
}
