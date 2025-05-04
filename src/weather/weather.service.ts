import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather, WeatherDocument } from './schemas/weather.schema';
import {
  SearchHistory,
  SearchHistoryDocument,
} from './schemas/search-history.schema';
import { CreateWeatherDto } from './dto/create-weather.dto';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>,
    @InjectModel(SearchHistory.name)
    private searchHistoryModel: Model<SearchHistoryDocument>,
  ) {}

  async create(createWeatherDto: CreateWeatherDto): Promise<Weather> {
    const newWeather = new this.weatherModel(createWeatherDto);
    return await newWeather.save();
  }

  async findAll(): Promise<Weather[]> {
    return await this.weatherModel.find().exec();
  }

  async findByCity(city: string): Promise<Weather | null> {
    return await this.weatherModel
      .findOne({ city })
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(
    id: string,
    updateWeatherDto: CreateWeatherDto,
  ): Promise<Weather> {
    const updatedWeather = await this.weatherModel
      .findByIdAndUpdate(id, updateWeatherDto, { new: true })
      .exec();

    if (!updatedWeather) {
      throw new NotFoundException(`Weather record with ID ${id} not found`);
    }

    return updatedWeather;
  }

  async remove(id: string): Promise<Weather> {
    const deletedWeather = await this.weatherModel.findByIdAndDelete(id).exec();

    if (!deletedWeather) {
      throw new NotFoundException(`Weather record with ID ${id} not found`);
    }

    return deletedWeather;
  }

  async addToSearchHistory(city: string): Promise<SearchHistory> {
    const searchHistory = new this.searchHistoryModel({ city });
    return await searchHistory.save();
  }

  async getSearchHistory(): Promise<SearchHistory[]> {
    return await this.searchHistoryModel
      .find()
      .sort({ searchedAt: -1 })
      .limit(10)
      .exec();
  }
}
