import { CreatePersonDto } from 'src/dto/create-person.dto';

export const createPersonDto: CreatePersonDto = {
  firstName: 'Cachalote',
  lastName: 'Baleia',
  cpf: '123.456.789-44',
  email: 'cachalote@test.com',
  password: '12345678',
  phone: '(52)98875-4321',
};

export const createdPerson = {
  message: 'Success',
  data: { ...createPersonDto, id: 1 },
};

export const listPeople = {
  message: 'Success',
  data: [{ ...createPersonDto, id: 1 }],
};

export const getAPerson = {
  message: 'Success',
  data: { ...createPersonDto, id: 1, address: null },
};

export const personToClientDto = {
  firstName: 'Asmodeus',
  lastName: 'Meteste',
  email: 'asmo@test.com',
  password: '12345678',
  phone: '(48)98887-4563',
  cpf: '123.456.789-99',
};

export const createAddressDto = {
  street: 'Rua das Capivaras',
  neighborhood: 'Selva Vermelha',
  city: 'São João de Meriti',
  state: 'Rio de Janeiro',
  cep: '23145-789',
  addressNumber: '123B',
};
