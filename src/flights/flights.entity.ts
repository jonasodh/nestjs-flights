import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flights {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  flightNumber: string;

  @Column()
  depart: string;

  @Column()
  arrive: string;

  @Column()
  nonstop: boolean;
}
