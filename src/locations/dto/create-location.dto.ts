import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    description: 'The name of the location',
    example: 'Amman',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The country of the location',
    example: 'Jordan',
  })
  @IsOptional()
  @IsString()
  readonly country?: string;

  @ApiPropertyOptional({
    description: 'The latitude of the location',
    example: 31.9454,
  })
  @IsOptional()
  @IsNumber()
  readonly lat?: number;

  @ApiPropertyOptional({
    description: 'The longitude of the location',
    example: 35.9283,
  })
  @IsOptional()
  @IsNumber()
  readonly lon?: number;
}