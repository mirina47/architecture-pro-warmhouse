import { Injectable } from '@nestjs/common';
import { DeviceTypeDto, CreateDeviceDto } from './entities/dto';

const BASE_URL = 'http://device-service:8083/device';

@Injectable()
export class DeviceService {
  constructor() {}

  async createDeviceType(dto: DeviceTypeDto) {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };
    const url = new URL(BASE_URL + '/deviceType');
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Device service error: ${response.status}`);
    }
    return response.json();
  }

  async updateDeviceType(id: number, dto: DeviceTypeDto) {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };
    const url = new URL(BASE_URL + '/deviceType/' + id);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Device service error: ${response.status}`);
    }
    return response.json();
  }

  async deleteDeviceType(id: number) {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(BASE_URL + '/deviceType/' + id);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Device service error: ${response.status}`);
    }
    return response.json();
  }

  async createDevice(dto: CreateDeviceDto) {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };
    const url = new URL(BASE_URL + '/device');
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Device service error: ${response.status}`);
    }
    return response.json();
  }

  async getHouseDevices(houseId: number) {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(BASE_URL + '/devices/house/' + houseId);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Device service error: ${response.status}`);
    }
    return response.json();
  }

  async updateDevice(id: number, dto: { status: string; is_active: boolean }) {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };
    const url = new URL(BASE_URL + '/device/' + id);
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Device service error: ${response.status}`);
    }

    return response.json();
  }
}
