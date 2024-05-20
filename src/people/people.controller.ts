import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { ResponseMessage } from '../response.message';
import { Person } from './entities/person.entity';
import { CreateCraftsmanDto } from './dto/create-craftsman.dto';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto) {
    const person = await this.peopleService.create(createPersonDto);
    return new ResponseMessage<Person>('Success', person);
  }

  @Get()
  async findAll() {
    const person = await this.peopleService.findAll();
    return new ResponseMessage('Success', person);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const person = await this.peopleService.findOne(+id);
    return new ResponseMessage('Success', person);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    const person = await this.peopleService.update(+id, updatePersonDto);
    return new ResponseMessage('Success', person);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const message = await this.peopleService.remove(+id);
    return new ResponseMessage('Success', message);
  }

  @Post(':id/address')
  async createAddress(
    @Param('id') id: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    const address = await this.peopleService.createAddress(
      +id,
      createAddressDto,
    );
    return new ResponseMessage('Success', address);
  }

  @Patch(':id/address/:addressId')
  async updateAddress(
    @Param('id') id: string,
    @Param('addressId') addressId: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    const address = await this.peopleService.updateAddress(
      +id,
      createAddressDto,
      +addressId,
    );
    return new ResponseMessage('Success', address);
  }

  @Post(':id/clients')
  async createClient(@Param('id') id: string) {
    const client = await this.peopleService.createClient(+id);
    return new ResponseMessage('Success', client);
  }

  @Get(':all/clients')
  async findAllClients() {
    const clients = await this.peopleService.findAllClients();
    return new ResponseMessage('Success', clients);
  }

  @Get(':id/clients/:clientId')
  async findByClientId(
    @Param('id') id: string,
    @Param('clientId') clientId: string,
  ) {
    const client = await this.peopleService.findByClientId(+id, +clientId);
    return new ResponseMessage('Success', client);
  }

  @Post(':id/craftsmen')
  async createCraftsman(
    @Param('id') id: string,
    @Body()
    createCraftsmanDto: CreateCraftsmanDto,
  ) {
    const craftsman = await this.peopleService.createCraftsman(
      +id,
      createCraftsmanDto,
    );
    return new ResponseMessage('Success', craftsman);
  }

  @Get(':all/craftsmen')
  async findAllCraftsmen() {
    const craftsmen = await this.peopleService.findAllCraftsmen();
    return new ResponseMessage('Success', craftsmen);
  }

  @Get(':id/craftsmen/:craftsmanId')
  async findByCraftsmanId(
    @Param('id') id: string,
    @Param('craftsmanId') craftsmanId: string,
  ) {
    const craftsman = await this.peopleService.findByCraftsmanId(
      +id,
      +craftsmanId,
    );
    return new ResponseMessage('Success', craftsman);
  }

  @Patch(':id/craftsmen/:craftsmanId')
  async updateCraftsman(
    @Param('id') id: string,
    @Param('craftsmanId') craftsmanId: string,
    @Body() createCraftsmanDto: CreateCraftsmanDto,
  ) {
    const craftsman = await this.peopleService.updateCraftsman(
      +id,
      +craftsmanId,
      createCraftsmanDto,
    );
    return new ResponseMessage('Success', craftsman);
  }
}
