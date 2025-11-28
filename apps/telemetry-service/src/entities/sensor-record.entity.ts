import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Sensor } from './sensor.entity';

@Entity('sensorRecord')
export class SensorRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sensor, sensor => sensor.sensorRecords, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sensor_id' })
  sensor: Sensor;

  @Column({ type: 'real', nullable: false, default: 0 })
  value: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  descr: string;
}

export class CreateSensorRecordDto {
  sensor_id: number;
  value: number;
  descr: string;
}
