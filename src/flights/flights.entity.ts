import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flights {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  origin: string;

  @Column({ nullable: true })
  destination: string;

  @Column({ nullable: true })
  flightNumber: string;

  @Column({ nullable: true })
  depart: string;

  @Column({ nullable: true })
  arrive: string;

  @Column({ nullable: true })
  nonstop: boolean;
}
