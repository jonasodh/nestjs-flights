import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { FlightsService } from './flights.service';
import { Flights } from './flights.entity';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightService: FlightsService) {}

  @Get()
  findAll(): Promise<Flights[]> {
    return this.flightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Flights> {
    return this.flightService.findOne(id);
  }
  @Post()
  create(@Body() flight: Flights): Promise<Flights> {
    return this.flightService.create(flight);
  }
  @Put(':id/update')
  async update(@Param('id') id: number, @Body() flight: Flights): Promise<any> {
    flight.id = Number(id);
    return this.flightService.update(flight);
  }
  @Delete(':id/delete')
  async delete(@Param('id') id: number): Promise<Flights> {
    return this.flightService.delete(id);
  }
}
