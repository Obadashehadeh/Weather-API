import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Weather } from './schemas/weather.schema';
import { SearchHistory } from './schemas/search-history.schema';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async create(@Body() createWeatherDto: CreateWeatherDto): Promise<Weather> {
    return this.weatherService.create(createWeatherDto);
  }

  @Get()
  async findAll(): Promise<Weather[]> {
    return this.weatherService.findAll();
  }

  @Get(':city')
  async findByCity(@Param('city') city: string): Promise<Weather> {
    const weather = await this.weatherService.findByCity(city);
    if (!weather) {
      throw new NotFoundException(`No weather data found for city: ${city}`);
    }
    return weather;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWeatherDto: CreateWeatherDto,
  ): Promise<Weather> {
    return this.weatherService.update(id, updateWeatherDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Weather> {
    return this.weatherService.remove(id);
  }

  @Post('history/:city')
  async addToSearchHistory(
    @Param('city') city: string,
  ): Promise<SearchHistory> {
    return this.weatherService.addToSearchHistory(city);
  }

  @Get('history')
  async getSearchHistory(): Promise<SearchHistory[]> {
    return this.weatherService.getSearchHistory();
  }
}
