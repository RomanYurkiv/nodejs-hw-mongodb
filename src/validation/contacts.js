import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(/^\+\d{12}$/).required(),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string().valid('personal', 'work').required(),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^\+\d{12}$/),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'work'),
}).min(1);