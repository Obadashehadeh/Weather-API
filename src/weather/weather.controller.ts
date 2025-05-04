import { Controller, Get, Query, UseGuards } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Get current weather for a location' })
  @ApiQuery({
    name: 'location',
    required: true,
    type: String,
    description: 'Location name (e.g., Amman)',
  })
  @ApiResponse({
    status: 200,
    description: 'Current weather data',
    type: WeatherResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid location' })
  async getCurrentWeather(@Query('location') location: string) {
    return this.weatherService.getCurrentWeather(location);
  }

  @Get('forecast')
  @ApiOperation({ summary: 'Get weather forecast for a location' })
  @ApiQuery({
    name: 'location',
    required: true,
    type: String,
    description: 'Location name (e.g., Amman)',
  })
  @ApiResponse({
    status: 200,
    description: 'Weather forecast data',
    type: ForecastResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid location' })
  async getForecast(@Query('location') location: string) {
    return this.weatherService.getForecast(location);
  }
}