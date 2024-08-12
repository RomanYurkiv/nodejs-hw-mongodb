import Joi from 'joi';

const namePattern = /^[A-Z][a-zA-Z]* [A-Z][a-zA-Z]*$/;

export const createContactsSchema = Joi.object({
  name: Joi.string().pattern(namePattern).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(/^\+\d{12}$/).required(),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string().valid('personal', 'work').required(),
  parentId: Joi.string().required(),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().pattern(namePattern),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^\+\d{12}$/),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'work'),
  parentId: Joi.string().required(),
}).min(1);