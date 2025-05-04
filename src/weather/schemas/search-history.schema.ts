import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SearchHistoryDocument = SearchHistory & Document;

@Schema()
export class SearchHistory {
  @Prop({ required: true })
  city: string;

  @Prop({ type: Date, default: Date.now })
  searchedAt: Date;
}

export const SearchHistorySchema = SchemaFactory.createForClass(SearchHistory);
