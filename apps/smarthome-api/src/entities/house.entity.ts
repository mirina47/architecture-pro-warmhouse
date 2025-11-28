import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('house')
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.houses, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 300 })
  address: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;
}

export class CreateHouseDto {
  user_id: number;
  address: string;
  name: string;
}
