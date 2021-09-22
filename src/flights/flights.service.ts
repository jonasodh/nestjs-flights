import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Flights } from './flights.entity';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flights)
    private flightsRepository: Repository<Flights>,
  ) {}

  async findAll(): Promise<Flights[]> {
    return this.flightsRepository.find();
  }

  async findOne(@Param('id') id: number): Promise<Flights> {
    return this.flightsRepository.findOne(id);
  }

  async remove(@Param('id') id: number): Promise<void> {
    await this.flightsRepository.delete(id);
  }
  async create(flight: Flights): Promise<Flights> {
    return await this.flightsRepository.save(flight);
  }
  async update(flight: Flights): Promise<UpdateResult> {
    return await this.flightsRepository.update(flight.id, flight);
  }
  async delete(id: number): Promise<any> {
    return this.flightsRepository.delete(id);
  }
}
