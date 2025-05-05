// src/weather/weather.controller.ts
import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ForecastResponseDto } from './dto/forecast-response.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';
import { WeatherService } from './weather.service';

@ApiTags('weather')
@Controller('weather')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({ summary: 'Get current weather for a location or coordinates' })
  @ApiQuery({
    name: 'location',
    required: false,
    type: String,
    description: 'Location name (e.g., Amman)',
  })
  @ApiQuery({
    name: 'lat',
    required: false,
    type: Number,
    description: 'Latitude',
  })
  @ApiQuery({
    name: 'lon',
    required: false,
    type: Number,
    description: 'Longitude',
  })
  @ApiResponse({
    status: 200,
    description: 'Current weather data',
    type: WeatherResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  async getCurrentWeather(
    @Query('location') location?: string,
    @Query('lat') lat?: number,
    @Query('lon') lon?: number,
  ) {
    if (location) {
      return this.weatherService.getCurrentWeatherByCity(location);
    } else if (lat && lon) {
      return this.weatherService.getCurrentWeatherByCoords(lat, lon);
    } else {
      throw new BadRequestException('Either location name or coordinates (lat, lon) are required');
    }
  }

  @Get('forecast')
  @ApiOperation({ summary: 'Get weather forecast for a location or coordinates' })
  @ApiQuery({
    name: 'location',
    required: false,
    type: String,
    description: 'Location name (e.g., Amman)',
  })
  @ApiQuery({
    name: 'lat',
    required: false,
    type: Number,
    description: 'Latitude',
  })
  @ApiQuery({
    name: 'lon',
    required: false,
    type: Number,
    description: 'Longitude',
  })
  @ApiResponse({
    status: 200,
    description: 'Weather forecast data',
    type: ForecastResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  async getForecast(
    @Query('location') location?: string,
    @Query('lat') lat?: number,
    @Query('lon') lon?: number,
  ) {
    if (location) {
      return this.weatherService.getForecastByCity(location);
    } else if (lat && lon) {
      return this.weatherService.getForecastByCoords(lat, lon);
    } else {
      throw new BadRequestException('Either location name or coordinates (lat, lon) are required');
    }
  }
}