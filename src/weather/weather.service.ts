import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { ForecastResponseDto } from './dto/forecast-response.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY') || '';
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCityNameFromCoords(lat: number, lon: number): Promise<string> {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon,
          format: 'json',
        },
        headers: {
          'User-Agent': 'weather-dashboard',
        },
      });

      const address = response.data.address;
      const city = address.city || address.town || address.village || address.state;

      return city || 'Unknown';
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch city name.');
    }
  }

  async getWeatherAndCityByCoords(lat: number, lon: number) {
    try {
      const [weather, city] = await Promise.all([
        this.getCurrentWeatherByCoords(lat, lon),
        this.getCityNameFromCoords(lat, lon),
      ]);

      return {
        city,
        ...weather,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch weather and city data.');
    }
  }

  async getCurrentWeatherByCity(location: string): Promise<WeatherResponseDto> {
    try {
      if (this.configService.get<string>('USE_MOCK_DATA') === 'true') {
        return this.getMockCurrentWeather(location);
      }

      const response = await lastValueFrom(
        this.httpService.get<WeatherResponseDto>(
          `${this.baseUrl}/weather?q=${encodeURIComponent(location)}&units=metric&appid=${this.apiKey}`,
        ),
      );

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw new BadRequestException(`Location '${location}' not found`);
      }
      throw new InternalServerErrorException(
        'Failed to fetch weather data. Please try again later.',
      );
    }
  }

  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherResponseDto> {
    try {
      if (this.configService.get<string>('USE_MOCK_DATA') === 'true') {
        return this.getMockCurrentWeather('Amman');
      }

      const response = await lastValueFrom(
        this.httpService.get<WeatherResponseDto>(
          `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`,
        ),
      );

      return response.data;
    } catch (error: any) {
      throw new InternalServerErrorException(
        'Failed to fetch weather data. Please try again later.',
      );
    }
  }

  async getForecastByCity(location: string): Promise<ForecastResponseDto> {
    try {
      if (this.configService.get<string>('USE_MOCK_DATA') === 'true') {
        return this.getMockForecast(location);
      }

      const response = await lastValueFrom(
        this.httpService.get<ForecastResponseDto>(
          `${this.baseUrl}/forecast?q=${encodeURIComponent(location)}&units=metric&appid=${this.apiKey}`,
        ),
      );

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw new BadRequestException(`Location '${location}' not found`);
      }
      throw new InternalServerErrorException(
        'Failed to fetch forecast data. Please try again later.',
      );
    }
  }

  async getForecastByCoords(lat: number, lon: number): Promise<ForecastResponseDto> {
    try {
      if (this.configService.get<string>('USE_MOCK_DATA') === 'true') {
        return this.getMockForecast(`Location at ${lat}, ${lon}`);
      }

      const response = await lastValueFrom(
        this.httpService.get<ForecastResponseDto>(
          `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`,
        ),
      );

      return response.data;
    } catch (error: any) {
      throw new InternalServerErrorException(
        'Failed to fetch forecast data. Please try again later.',
      );
    }
  }

  private getMockCurrentWeather(location: string): WeatherResponseDto {
    if (!location || location.trim() === '') {
      throw new BadRequestException('Location is required');
    }

    return {
      coord: { lon: 35.9283, lat: 31.9454, name: location },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      base: 'stations',
      main: {
        temp: 25.5,
        feels_like: 24.8,
        temp_min: 23.1,
        temp_max: 26.3,
        pressure: 1013,
        humidity: 50,
      },
      visibility: 10000,
      wind: {
        speed: 3.5,
        deg: 120,
      },
      clouds: {
        all: 0,
      },
      dt: 1620222000,
      sys: {
        country: 'JO',
        sunrise: 1620185000,
        sunset: 1620232800,
      },
      timezone: 3600,
      id: 250441,
      name: location,
      cod: 200,
    };
  }

  private getMockForecast(location: string): ForecastResponseDto {
    if (!location || location.trim() === '') {
      throw new BadRequestException('Location is required');
    }

    const forecastItems = [];
    const now = new Date();
    for (let i = 0; i < 40; i++) {
      const forecastTime = new Date(now.getTime() + i * 3 * 60 * 60 * 1000);

      const item = {
        dt: Math.floor(forecastTime.getTime() / 1000),
        main: {
          temp: 22 + Math.random() * 10,
          feels_like: 20 + Math.random() * 10,
          temp_min: 20 + Math.random() * 5,
          temp_max: 25 + Math.random() * 5,
          pressure: 1010 + Math.random() * 10,
          humidity: 40 + Math.random() * 30,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        clouds: {
          all: Math.floor(Math.random() * 30),
        },
        wind: {
          speed: 2 + Math.random() * 5,
          deg: Math.floor(Math.random() * 360),
        },
        visibility: 10000,
        pop: Math.random() * 0.5,
        sys: {
          pod: forecastTime.getHours() >= 6 && forecastTime.getHours() < 18 ? 'd' : 'n',
        },
        dt_txt: forecastTime.toISOString().replace('T', ' ').substring(0, 19),
      };

      forecastItems.push(item);
    }

    return {
      cod: '200',
      message: 0,
      cnt: 40,
      list: forecastItems,
      city: {
        id: 250441,
        name: location,
        coord: {
          lat: 31.9454,
          lon: 35.9283,
        },
        country: 'JO',
        population: 1000000,
        timezone: 3600,
        sunrise: 1620185000,
        sunset: 1620232800,
      },
    };
  }
}
