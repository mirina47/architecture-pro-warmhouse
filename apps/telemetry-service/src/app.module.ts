import { Module } from '@nestjs/common';
import { TelemetryController } from './telemetry.controller';
import { TelemetryService } from './telemetry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorRecord } from './entities/sensor-record.entity';
import { Sensor } from './entities/sensor.entity';
import { ScheduleModule } from '@nestjs/schedule';

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
      entities: [Sensor, SensorRecord],
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [TelemetryController],
  providers: [TelemetryService],
})
export class AppModule {}
