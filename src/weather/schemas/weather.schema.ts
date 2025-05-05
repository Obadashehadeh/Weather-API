import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema()
export class Weather {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  temperature: number;

  @Prop()
  feelsLike: number;

  @Prop({ required: true })
  condition: string;

  @Prop()
  humidity: number;

  @Prop()
  windSpeed: number;

  @Prop()
  pressure: number;

  @Prop()
  uvIndex: number;

  @Prop()
  sunrise: string;

  @Prop()
  sunset: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
