import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorRecordDto, SensorRecord } from './entities/sensor-record.entity';
import { CreateSensorDto, Sensor } from './entities/sensor.entity';
import path from 'node:path';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

const { StaticPool } = require('node-worker-threads-pool');

@Injectable()
export class TelemetryService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  @Cron(CronExpression.EVERY_HOUR)
  async main(manager: EntityManager = this.entityManager) {
    console.log('Запуск опроса');
    // Загружаем все датчики
    const sensors = await manager.find(Sensor);

    // Создаём пул воркеров
    const pool = new StaticPool({
      size: 4,
      task: path.resolve(__dirname, 'sensor.worker.js'),
    });

    // Для каждого датчика отправляем задачу в воркер
    const records = await Promise.all(
      sensors.map(sensor =>
        pool.exec(sensor).catch(err => ({
          sensorId: sensor.id,
          value: null,
        })),
      ),
    );

    // Создаем SensorRecord
    for (const rec of records) {
      const sensorRecord = new SensorRecord();
      sensorRecord.sensor = rec.sensorId;
      sensorRecord.value = rec.value;
      const res = await manager.save(sensorRecord);
      console.log(res);
    }

    pool.destroy();
  }

  async createSensor(dto: CreateSensorDto, manager: EntityManager = this.entityManager): Promise<Sensor> {
    const createdSensor = manager.getRepository(Sensor).create(dto);
    return await manager.getRepository(Sensor).save(createdSensor);
  }

  async getHouseSensors(houseId: number, manager: EntityManager = this.entityManager): Promise<Sensor[]> {
    return await manager.find(Sensor, { where: { house_id: houseId } });
  }

  async updateSensor(id: number, dto: { is_active: boolean; descr: string }, manager: EntityManager = this.entityManager): Promise<void> {
    const result = await manager.update(Sensor, id, { is_active: dto.is_active, descr: dto.descr });
  }

  async createSensorRecord(dto: CreateSensorRecordDto, manager: EntityManager = this.entityManager): Promise<SensorRecord> {
    const createdSensorRecord = manager.getRepository(SensorRecord).create(dto);
    return await manager.getRepository(SensorRecord).save(createdSensorRecord);
  }

  async getSensorRecords(sensorId: number, manager: EntityManager = this.entityManager): Promise<SensorRecord[]> {
    return await manager.find(SensorRecord, { where: { sensor: { id: sensorId } }, order: { created_at: 'ASC' } });
  }

  async getLastSensorRecord(sensorId: number, manager: EntityManager = this.entityManager): Promise<SensorRecord> {
    const last = await manager.findOne(SensorRecord, { where: { sensor: { id: sensorId } }, order: { created_at: 'DESC' } });
    if (!last) {
      throw new NotFoundException(`No SensorRecord found for sensor ${sensorId}`);
    }
    return last;
  }

  async updateSensorRecord(id: number, dto: { descr: string }, manager: EntityManager = this.entityManager): Promise<void> {
    const result = await manager.update(SensorRecord, id, { descr: dto.descr });
  }

  async deleteSensorRecord(recordId: number, manager: EntityManager = this.entityManager): Promise<void> {
    const sensorRecord = await manager.findOne(SensorRecord, { where: { id: recordId } });
    if (!sensorRecord) {
      throw new NotFoundException(`SensorRecord with ID ${recordId} not found`);
    }
    await manager.remove(sensorRecord);
  }
}
