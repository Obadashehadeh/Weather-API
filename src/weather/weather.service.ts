// src/weather/weather.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.weatherapi.com/v1';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY') || '';
    console.log('API Key:', this.apiKey);
  }

  async getCurrentWeatherByCity(location: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/current.json`, {
          params: {
            key: this.apiKey,
            q: location,
            aqi: 'no',
          },
        }),
      );

      return response.data;
    } catch (error) {
      // Check for specific error codes from WeatherAPI.com
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 400) {
          throw new BadRequestException(
            data.error?.message || `Location '${location}' not found`,
          );
        }

        if (status === 401 || status === 403) {
          throw new BadRequestException(
            'API key error. Please check your weather API configuration.',
          );
        }
      }

      // For any other errors
      throw new InternalServerErrorException(
        'Failed to fetch weather data. Please try again later.',
      );
    }
  }

  async getCurrentWeatherByCoords(lat: number, lon: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/current.json`, {
          params: {
            key: this.apiKey,
            q: `${lat},${lon}`,
            aqi: 'no',
          },
        }),
      );

      return response.data;
    } catch (error) {
      // Check for specific error codes from WeatherAPI.com
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 400) {
          throw new BadRequestException(
            data.error?.message || `Location at coordinates (${lat},${lon}) not found`,
          );
        }

        if (status === 401 || status === 403) {
          throw new BadRequestException(
            'API key error. Please check your weather API configuration.',
          );
        }
      }

      throw new InternalServerErrorException(
        'Failed to fetch weather data. Please try again later.',
      );
    }
  }

  async getForecastByCity(location: string, days: number = 5) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/forecast.json`, {
          params: {
            key: this.apiKey,
            q: location,
            days,
            aqi: 'no',
          },
        }),
      );

      return response.data;
    } catch (error) {
      // Check for specific error codes from WeatherAPI.com
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 400) {
          throw new BadRequestException(
            data.error?.message || `Location '${location}' not found`,
          );
        }

        if (status === 401 || status === 403) {
          throw new BadRequestException(
            'API key error. Please check your weather API configuration.',
          );
        }
      }

      throw new InternalServerErrorException(
        'Failed to fetch forecast data. Please try again later.',
      );
    }
  }

  async getForecastByCoords(lat: number, lon: number, days: number = 5) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/forecast.json`, {
          params: {
            key: this.apiKey,
            q: `${lat},${lon}`,
            days,
            aqi: 'no',
          },
        }),
      );

      return response.data;
    } catch (error) {
      // Check for specific error codes from WeatherAPI.com
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 400) {
          throw new BadRequestException(
            data.error?.message || `Location at coordinates (${lat},${lon}) not found`,
          );
        }

        if (status === 401 || status === 403) {
          throw new BadRequestException(
            'API key error. Please check your weather API configuration.',
          );
        }
      }

      throw new InternalServerErrorException(
        'Failed to fetch forecast data. Please try again later.',
      );
    }
  }
}
