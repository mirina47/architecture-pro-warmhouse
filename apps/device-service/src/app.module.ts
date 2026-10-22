import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { DeviceType } from './entities/device-type.entity';
import { Device } from './entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'smarthome',
      autoLoadEntities: true,
      synchronize: true,
      entities: [DeviceType, Device],
    }),
  ],

  controllers: [DeviceController],
  providers: [DeviceService],
})
export class AppModule {}
