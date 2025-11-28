import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('temperature')
  getTemperatureByLocation(@Req() req, @Query('location') location?: string) {
    console.log('getTemperatureByLocation', req.ip, req.headers);
    const res = this.appService.getTemperature(location, '');
    console.log('getTemperatureByLocation', res);
    return res;
  }

  @Get('temperature/:id')
  getTemperatureById(@Req() req, @Param('id') id: string) {
    console.log('getTemperatureById', req.ip, req.headers);
    const res = this.appService.getTemperature('', id);
    console.log('getTemperatureByLocation', res);
    return res;
  }
}
