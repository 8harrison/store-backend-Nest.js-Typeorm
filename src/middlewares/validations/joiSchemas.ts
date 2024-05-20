import Joi from 'joi';

export const peopleSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  phone: Joi.string().min(14).required(),
  cpf: Joi.string().min(14).required(),
});
