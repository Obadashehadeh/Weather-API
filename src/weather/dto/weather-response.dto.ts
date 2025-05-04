import { ApiProperty } from '@nestjs/swagger';

export class WeatherCondition {
  @ApiProperty({ example: 800 })
  id: number;

  @ApiProperty({ example: 'Clear' })
  main: string;

  @ApiProperty({ example: 'clear sky' })
  description: string;

  @ApiProperty({ example: '01d' })
  icon: string;
}

export class WeatherData {
  @ApiProperty({ example: 25.5 })
  temp: number;

  @ApiProperty({ example: 24.8 })
  feels_like: number;

  @ApiProperty({ example: 23.1 })
  temp_min: number;

  @ApiProperty({ example: 26.3 })
  temp_max: number;

  @ApiProperty({ example: 1013 })
  pressure: number;

  @ApiProperty({ example: 50 })
  humidity: number;
}

export class Wind {
  @ApiProperty({ example: 3.5 })
  speed: number;

  @ApiProperty({ example: 120 })
  deg: number;
}

export class Clouds {
  @ApiProperty({ example: 0 })
  all: number;
}

export class Sys {
  @ApiProperty({ example: 'JO' })
  country: string;

  @ApiProperty({ example: 1620185000 })
  sunrise: number;

  @ApiProperty({ example: 1620232800 })
  sunset: number;
}

export class WeatherResponseDto {
  @ApiProperty()
  coord: {
    lon: number;
    lat: number;
  };

  @ApiProperty({ type: [WeatherCondition] })
  weather: WeatherCondition[];

  @ApiProperty({ example: 'stations' })
  base: string;

  @ApiProperty()
  main: WeatherData;

  @ApiProperty({ example: 10000 })
  visibility: number;

  @ApiProperty()
  wind: Wind;

  @ApiProperty()
  clouds: Clouds;

  @ApiProperty({ example: 1620222000 })
  dt: number;

  @ApiProperty()
  sys: Sys;

  @ApiProperty({ example: 3600 })
  timezone: number;

  @ApiProperty({ example: 250441 })
  id: number;

  @ApiProperty({ example: 'Amman' })
  name: string;

  @ApiProperty({ example: 200 })
  cod: number;
}