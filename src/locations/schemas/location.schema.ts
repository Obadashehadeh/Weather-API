import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  country: string;

  @Prop()
  lat: number;

  @Prop()
  lon: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User | MongooseSchema.Types.ObjectId;
}

export const LocationSchema = SchemaFactory.createForClass(Location);