import { CreatePersonDto } from 'src/people/dto/create-person.dto';
import { peopleSchema } from './joiSchemas';

export function validatePerson(createPersonDto: CreatePersonDto) {
  const { error } = peopleSchema.validate(createPersonDto);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
}
