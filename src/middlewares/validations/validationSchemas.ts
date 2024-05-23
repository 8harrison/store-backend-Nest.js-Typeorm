import { CreatePersonDto } from 'src/dto/create-person.dto';
import { addressSchema, craftsmanSchema, peopleSchema } from './joiSchemas';
import { CreateAddressDto } from 'src/dto/create-address.dto';
import { CreateCraftsmanDto } from 'src/dto/create-craftsman.dto';

export function validatePerson(createPersonDto: CreatePersonDto) {
  const { error } = peopleSchema.validate(createPersonDto);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
}

export function validateAddress(createAddressDto: CreateAddressDto) {
  const { error } = addressSchema.validate(createAddressDto);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
}

export function validateCraftsman(createCraftsmanDto: CreateCraftsmanDto) {
  const { error } = craftsmanSchema.validate(createCraftsmanDto);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
}
