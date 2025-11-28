import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { House } from './house.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  login: string;

  @Column({ type: 'varchar', length: 100 })
  password_hash: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @OneToMany(() => House, House => House.user)
  houses: House[];
}
