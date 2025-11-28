import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { DeviceType } from './device-type.entity';

@Entity('device')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  house_id: number;

  @ManyToOne(() => DeviceType, deviceType => deviceType.devices, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'type_id' })
  type_id: DeviceType;

  @Column({ type: 'varchar', length: 300, nullable: true })
  serial_number: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  status: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}

export class CreateDeviceDto {
  house_id: number;
  type_id: number;
  serial_number: string;
  status: string;
  is_active: boolean;
}
