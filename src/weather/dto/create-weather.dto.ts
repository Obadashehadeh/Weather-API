export class CreateWeatherDto {
  readonly city: string;
  readonly temperature: number;
  readonly feelsLike?: number;
  readonly condition: string;
  readonly humidity?: number;
  readonly windSpeed?: number;
  readonly pressure?: number;
  readonly uvIndex?: number;
  readonly sunrise?: string;
  readonly sunset?: string;
}
