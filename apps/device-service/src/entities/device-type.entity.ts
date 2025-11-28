import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Device } from './device.entity';

@Entity('deviceType')
export class DeviceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  descr: string;

  @OneToMany(() => Device, Device => Device.type_id)
  devices: Device[];
}

export class DeviceTypeDto {
  name: string;
  descr: string;
}
