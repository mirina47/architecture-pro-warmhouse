import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTemperature(location?: string, sensorID?: string) {
    if (location == '') {
      switch (sensorID) {
        case '1':
          location = 'Living Room';
          break;
        case '2':
          location = 'Bedroom';
          break;
        case '3':
          location = 'Kitchen';
          break;
        default:
          location = 'Unknown';
      }
    }

    if (sensorID == '') {
      switch (location) {
        case 'Living Room':
          sensorID = '1';
          break;
        case 'Bedroom':
          sensorID = '2';
          break;
        case 'Kitchen':
          sensorID = '3';
          break;
        default:
          sensorID = '0';
      }
    }

    return {
      id: sensorID,
      location: location,
      value: parseFloat((Math.random() * 30).toFixed(1)),
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
