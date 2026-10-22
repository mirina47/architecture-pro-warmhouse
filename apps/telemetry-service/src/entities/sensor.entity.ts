import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SensorRecord } from './sensor-record.entity';

@Entity('sensor')
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  house_id: number;

  @Column({ default: false })
  is_active: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  descr: string;

  @OneToMany(() => SensorRecord, sensorRecord => sensorRecord.sensor)
  sensorRecords: SensorRecord[];
}

export class CreateSensorDto {
  house_id: number;
  is_active: boolean;
  descr: string;
}
