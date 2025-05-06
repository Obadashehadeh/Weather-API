import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('locations')
@Controller('locations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Save a location for the user' })
  @ApiResponse({ status: 201, description: 'Location saved successfully' })
  async create(@Body() createLocationDto: CreateLocationDto, @Req() req) {
    return this.locationsService.create(createLocationDto, req.user._id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all saved locations for the user' })
  @ApiResponse({ status: 200, description: 'Return all locations' })
  async findAll(@Req() req) {
    return this.locationsService.findAllByUser(req.user._id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a saved location' })
  @ApiResponse({ status: 200, description: 'Location deleted successfully' })
  async remove(@Param('id') id: string, @Req() req) {
    return this.locationsService.remove(id, req.user._id);
  }
}