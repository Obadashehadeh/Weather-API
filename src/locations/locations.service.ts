import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location, LocationDocument } from './schemas/location.schema';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<LocationDocument>,
  ) {}

  async create(
    createLocationDto: CreateLocationDto,
    userId: string,
  ): Promise<Location> {
    const createdLocation = new this.locationModel({
      ...createLocationDto,
      user: userId,
    });
    return createdLocation.save();
  }

  async findAllByUser(userId: string): Promise<Location[]> {
    return this.locationModel.find({ user: userId }).exec();
  }

  async findOneByUser(id: string, userId: string): Promise<Location> {
    const location = await this.locationModel.findById(id).exec();

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    if (location.user.toString() !== userId.toString()) {
      throw new UnauthorizedException(
        'You are not authorized to access this location',
      );
    }

    return location;
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    await this.findOneByUser(id, userId);
    await this.locationModel.findByIdAndDelete(id).exec();
    return { message: 'Location deleted successfully' };
  }
}