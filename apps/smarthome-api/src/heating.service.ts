import { Injectable } from '@nestjs/common';
import { SensorHeatingDto, SensorValueHeatingDto } from './entities/dto';

const BASE_URL = 'http://smarthome-app:8080/api/v1/sensors';

@Injectable()
export class HeatingService {
  async GetAllSensors() {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(BASE_URL);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`SmartHome App (monolith) error: ${response.status}`);
    }
    return response.json();
  }

  async GetSensorByID(id: number) {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(BASE_URL + '/' + id);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`SmartHome App (monolith) error: ${response.status}`);
    }
    return response.json();
  }

  async CreateSensor(dto: SensorHeatingDto) {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };
    const url = new URL(BASE_URL);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`SmartHome App (monolith) error: ${response.status}`);
    }
    return response.json();
  }

  async UpdateSensor(id: number, dto: SensorHeatingDto) {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };
    const url = new URL(BASE_URL + '/' + id);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`SmartHome App (monolith) error: ${response.status}`);
    }
    return response.json();
  }

  async DeleteSensor(id: number) {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(BASE_URL + '/' + id);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`SmartHome App (monolith) error: ${response.status}`);
    }
    return response.json();
  }

  async UpdateSensorValue(id: number, dto: SensorValueHeatingDto) {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };
    const url = new URL(BASE_URL + '/' + id + '/value');
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`SmartHome App (monolith) error: ${response.status}`);
    }
    return response.json();
  }

  async GetTemperatureByLocation(location: string) {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(BASE_URL + 'temperature/' + location);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`SmartHome App (monolith) error: ${response.status}`);
    }
    return response.json();
  }
}
