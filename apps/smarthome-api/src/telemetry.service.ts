import { Injectable } from '@nestjs/common';
import { CreateSensorDto, CreateSensorRecordDto } from './entities/dto';

const BASE_URL = 'http://telemetry-service:8082/telemetry';

@Injectable()
export class TelemetryService {
  constructor() {}

  async createSensor(dto: CreateSensorDto) {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };
    const url = new URL(BASE_URL + '/sensor');
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Telemetry service error: ${response.status}`);
    }
    return response.json();
  }

  async getHouseSensors(houseId: number) {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(BASE_URL + 'sensors/house/' + houseId);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Telemetry service error: ${response.status}`);
    }
    return response.json();
  }

  async updateSensor(id: number, dto: { is_active: boolean; descr: string }) {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };
    const url = new URL(BASE_URL + '/sensor/' + id);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Telemetry service error: ${response.status}`);
    }
    return response.json();
  }

  async createSensorRecord(dto: CreateSensorRecordDto) {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };
    const url = new URL(BASE_URL + '/sensorRecord');
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Telemetry service error: ${response.status}`);
    }
    return response.json();
  }

  async getSensorRecords(sensorId: number) {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(BASE_URL + '/sensorRecords/' + sensorId);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Telemetry service error: ${response.status}`);
    }
    return response.json();
  }

  async getLastSensorRecord(sensorId: number) {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(BASE_URL + '/sensorRecords/last/' + sensorId);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Telemetry service error: ${response.status}`);
    }
    return response.json();
  }
}
