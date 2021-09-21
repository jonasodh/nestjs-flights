import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flights } from './flights.entity';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flights)
    private flightsRepository: Repository<Flights>,
  ) {}

  findAll(): Promise<Flights[]> {
    return this.flightsRepository.find();
  }

  findOne(@Param('id') id: number): Promise<Flights> {
    return this.flightsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.flightsRepository.delete(id);
  }
}
