import { ApiProperty } from '@nestjs/swagger';
import { WeatherCondition, WeatherData, Wind, Clouds } from './weather-response.dto';

export class ForecastItem {
  @ApiProperty({ example: 1620222000 })
  dt: number;

  @ApiProperty()
  main: WeatherData;

  @ApiProperty({ type: [WeatherCondition] })
  weather: WeatherCondition[];

  @ApiProperty()
  clouds: Clouds;

  @ApiProperty()
  wind: Wind;

  @ApiProperty({ example: 10000 })
  visibility: number;

  @ApiProperty({ example: 10 })
  pop: number;

  @ApiProperty()
  sys: {
    pod: string;
  };

  @ApiProperty({ example: '2021-05-05 12:00:00' })
  dt_txt: string;
}

export class ForecastResponseDto {
  @ApiProperty({ example: '200' })
  cod: string;

  @ApiProperty({ example: 0 })
  message: number;

  @ApiProperty({ example: 40 })
  cnt: number;

  @ApiProperty({ type: [ForecastItem] })
  list: ForecastItem[];

  @ApiProperty()
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}