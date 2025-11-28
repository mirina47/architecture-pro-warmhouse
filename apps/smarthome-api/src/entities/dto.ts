export class RegisterDto {
  login: string;
  password: string;
  name: string;
}

export class LoginDto {
  login: string;
  password: string;
}

export class DeviceTypeDto {
  name: string;
  descr: string;
}

export class CreateDeviceDto {
  house_id: number;
  type_id: number;
  serial_number: string;
  status: string;
  is_active: boolean;
}

export class CreateSensorDto {
  house_id: number;
  is_active: boolean;
  descr: string;
}

export class CreateSensorRecordDto {
  sensor_id: number;
  value: number;
  descr: string;
}

export class SensorHeatingDto {
  name: string;
  type: string;
  location: string;
  unit: string;
}

export class SensorValueHeatingDto {
  value: number;
  status: string;
}
