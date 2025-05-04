import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';

@ApiTags('locations')
@Controller('locations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: 201, description: 'Location created successfully' })
  async create(@Body() createLocationDto: CreateLocationDto, @Req() req) {
    return this.locationsService.create(createLocationDto, req.user._id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all locations for the current user' })
  @ApiResponse({ status: 200, description: 'Return all locations' })
  async findAll(@Req() req) {
    return this.locationsService.findAllByUser(req.user._id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by ID' })
  @ApiResponse({ status: 200, description: 'Return the location' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async findOne(@Param('id') id: string, @Req() req) {
    return this.locationsService.findOneByUser(id, req.user._id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a location' })
  @ApiResponse({ status: 200, description: 'Location updated successfully' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
    @Req() req,
  ) {
    return this.locationsService.update(id, updateLocationDto, req.user._id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location' })
  @ApiResponse({ status: 200, description: 'Location deleted successfully' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async remove(@Param('id') id: string, @Req() req) {
    return this.locationsService.remove(id, req.user._id);
  }
}