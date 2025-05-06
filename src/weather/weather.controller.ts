import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({ summary: 'Get current weather for a location' })
  @ApiQuery({ name: 'location', required: true, description: 'City name, lat/long coordinates, or ZIP code' })
  @ApiQuery({ name: 'lat', required: false, description: 'Latitude (Optional)' })
  @ApiQuery({ name: 'lon', required: false, description: 'Longitude (Optional)' })
  @ApiResponse({ status: 200, description: 'Returns current weather data' })
  async getWeather(
    @Query('location') location?: string,
    @Query('lat') lat?: number,
    @Query('lon') lon?: number,
  ) {
    if (lat && lon) {
      return this.weatherService.getCurrentWeatherByCoords(lat, lon);
    }

    if (location) {
      return this.weatherService.getCurrentWeatherByCity(location);
    }

    throw new Error('Either location or lat/lon parameters are required');
  }

  @Get('forecast')
  @ApiOperation({ summary: 'Get weather forecast for a location' })
  @ApiQuery({ name: 'location', required: true, description: 'City name, lat/long coordinates, or ZIP code' })
  @ApiQuery({ name: 'days', required: false, description: 'Number of days (default: 5)' })
  @ApiQuery({ name: 'lat', required: false, description: 'Latitude (Optional)' })
  @ApiQuery({ name: 'lon', required: false, description: 'Longitude (Optional)' })
  @ApiResponse({ status: 200, description: 'Returns forecast weather data' })
  async getForecast(
    @Query('location') location?: string,
    @Query('days') days: number = 5,
    @Query('lat') lat?: number,
    @Query('lon') lon?: number,
  ) {
    if (lat && lon) {
      return this.weatherService.getForecastByCoords(lat, lon, days);
    }

    if (location) {
      return this.weatherService.getForecastByCity(location, days);
    }

    throw new Error('Either location or lat/lon parameters are required');
  }
}