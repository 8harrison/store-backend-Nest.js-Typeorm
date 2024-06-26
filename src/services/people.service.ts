import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { EntityManager, Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { CreateAddressDto } from '../dto/create-address.dto';
import { Client } from '../entities/client.entity';
import { CreateCraftsmanDto } from '../dto/create-craftsman.dto';
import { Craftsman } from '../entities/craftsman.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Craftsman)
    private readonly craftsmanRepository: Repository<Craftsman>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createPersonDto: CreatePersonDto) {
    const person = new Person(createPersonDto);
    let found = await this.personRepository.findOneBy({
      email: person.email,
    });
    if (found) throw { type: 'BAD_REQUEST', message: 'Email já cadastrado' };
    found = await this.personRepository.findOneBy({
      phone: person.phone,
    });
    if (found)
      throw {
        type: 'BAD_REQUEST',
        message: 'Número de telefone já cadastrado',
      };
    found = await this.personRepository.findOneBy({
      cpf: person.cpf,
    });
    if (found) throw { type: 'BAD_REQUEST', message: 'CPF já cadastrado' };
    return await this.personRepository.save(person);
  }

  async findAll() {
    return this.personRepository.find();
  }

  async findOne(id: number) {
    const found = await this.personRepository.findOne({
      where: { id },
      relations: { address: true },
    });
    if (!found)
      throw { type: 'NOT_FOUND', message: 'ID de Pessoa não encontrado' };
    return found;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const update = new Person(updatePersonDto);
    const found = await this.personRepository.findOneBy({ id });
    if (!found)
      throw { type: 'NOT_FOUND', message: 'ID de Pessoa não encontrado' };
    update.id = id;
    return await this.personRepository.save(update);
  }

  async remove(id: number) {
    const found = await this.personRepository.findOneBy({ id });
    if (!found)
      throw { type: 'NOT_FOUND', message: 'ID de Pessoa não encontrado' };
    await this.personRepository.delete(id);
    return 'Pessoa excluída com sucesso!';
  }

  async createAddress(id: number, createAddressDto: CreateAddressDto) {
    const address = new Address(createAddressDto);
    const person = await this.personRepository.findOneBy({ id });
    if (!person)
      throw { type: 'NOT_FOUND', message: 'ID de Pessoa não encontrado' };
    person.address = address;
    return await this.personRepository.save(person);
  }

  async updateAddress(
    id: number,
    createAddressDto: CreateAddressDto,
    addresId: number,
  ) {
    await this.addressRepository.findOneBy({ id: addresId });
    const person = await this.personRepository.findOneBy({ id });
    const address = new Address(createAddressDto);
    address.id = addresId;
    person.address = address;
    return this.personRepository.save(person);
  }

  async createClient(id: number) {
    const person = await this.personRepository.findOneBy({ id });
    const client = new Client({});
    client.person = person;
    return await this.clientRepository.save(client);
  }

  async findAllClients() {
    return await this.clientRepository.find({ relations: { person: true } });
  }

  async findByClientId(id: number, clientId: number) {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: { address: true },
    });
    const client = await this.clientRepository.findOneBy({ id: clientId });
    client.person = person;
    return client;
  }

  async createCraftsman(id: number, createCraftsmanDto: CreateCraftsmanDto) {
    const person = await this.personRepository.findOneBy({ id });
    const craftsman = new Craftsman(createCraftsmanDto);
    craftsman.person = person;
    return this.craftsmanRepository.save(craftsman);
  }

  async findAllCraftsmen() {
    return this.craftsmanRepository.find({ relations: { person: true } });
  }

  async findByCraftsmanId(id: number, craftsmanId: number) {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: { address: true },
    });
    const craftsman = await this.craftsmanRepository.findOneBy({
      id: craftsmanId,
    });
    craftsman.person = person;
    return craftsman;
  }

  async updateCraftsman(
    id: number,
    craftsmanId: number,
    createCraftsmanDto: CreateCraftsmanDto,
  ) {
    const craftsman = new Craftsman(createCraftsmanDto);
    await this.craftsmanRepository.findOneBy({ id: craftsmanId });
    const person = await this.personRepository.findOneBy({ id });
    craftsman.id = craftsmanId;
    craftsman.person = person;
    return this.craftsmanRepository.save(craftsman);
  }
}
