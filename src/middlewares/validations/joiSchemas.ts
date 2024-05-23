import Joi from 'joi';

export const peopleSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  phone: Joi.string().min(14).required(),
  cpf: Joi.string().min(14).required(),
});

export const addressSchema = Joi.object({
  street: Joi.string().required(),
  neighborhood: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  cep: Joi.string().min(9).required(),
  addressNumber: Joi.string().required(),
});

export const craftsmanSchema = Joi.object({
  specialism: Joi.string().required(),
});
