import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flights } from './flights.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flights])],
  controllers: [FlightsController],
  providers: [FlightsService],
  exports: [TypeOrmModule],
})
export class FlightsModule {}
