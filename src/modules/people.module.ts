import { Module } from '@nestjs/common';
import { PeopleService } from '../services/people.service';
import { PeopleController } from '../controllers/people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { Address } from '../entities/address.entity';
import { Client } from '../entities/client.entity';
import { Craftsman } from '../entities/craftsman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Address, Client, Craftsman])],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
