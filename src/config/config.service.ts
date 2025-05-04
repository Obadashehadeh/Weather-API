import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }

  get port(): number {
    return parseInt(this.configService.get<string>('PORT') || '3000', 10);
  }

  get mongoUri(): string {
    return this.configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/weather-dashboard';
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || 'your_jwt_secret';
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN') || '1d';
  }

  get weatherApiKey(): string {
    return this.configService.get<string>('WEATHER_API_KEY') || '';
  }

  get useMockData(): boolean {
    return this.configService.get<string>('USE_MOCK_DATA') === 'true';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }
}