import { Controller, Get, Query } from '@nestjs/common';

@Controller('weather')
export class WeatherController {
  @Get()
  async getWeather(@Query('location') location: string) {
    // Mock response, can be replaced with real API integration
    return {
      temperature: 25,
      description: 'Sunny',
      location,
    };
  }

  @Get('forecast')
  async getForecast(@Query('location') location: string) {
    // Mock response, can be replaced with real API integration
    return [
      { time: '12:00 PM', temp: 26 },
      { time: '03:00 PM', temp: 28 },
      { time: '06:00 PM', temp: 24 },
    ];
  }
}
