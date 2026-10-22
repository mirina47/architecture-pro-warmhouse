import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { DeviceController } from './device.controller';
import { HeatingController } from './heating.controller';
import { HouseController } from './house.controller';
import { TelemetryController } from './telemetry.controller';
import { UserController } from './user.controller';
import { AuthService } from './auth.service';
import { DeviceService } from './device.service';
import { HeatingService } from './heating.service';
import { HouseService } from './house.service';
import { TelemetryService } from './telemetry.service';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { House } from './entities/house.entity';

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
      entities: [User, House],
    }),
  ],
  controllers: [AuthController, DeviceController, HeatingController, HouseController, TelemetryController, UserController],
  providers: [AuthService, DeviceService, HeatingService, HouseService, TelemetryService, UserService],
})
export class AppModule {}
