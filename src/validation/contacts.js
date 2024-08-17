import Joi from 'joi';

const namePattern = /^[A-Z][a-zA-Z]* [A-Z][a-zA-Z]*$/;

export const createContactsSchema = Joi.object({
  name: Joi.string().pattern(namePattern).required().messages({
    'string.pattern.base': `"name" must start with a capital letter and contain a space between first and last name`,
    'any.required': `"name" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    'string.email': `"email" must be a valid email address`,
    'any.required': `"email" is a required field`,
  }),
  phoneNumber: Joi.string().pattern(/^\+\d{12}$/).required().messages({
    'string.pattern.base': `"phoneNumber" must be in the format +XXXXXXXXXXXX (12 digits)`,
    'any.required': `"phoneNumber" is a required field`,
  }),
  isFavourite: Joi.boolean().required().messages({
    'any.required': `"isFavourite" is a required field`,
  }),
  contactType: Joi.string().valid('personal', 'work').required().messages({
    'any.only': `"contactType" must be either 'personal' or 'work'`,
    'any.required': `"contactType" is a required field`,
  }),
  parentId: Joi.string().required().messages({
    'any.required': `"parentId" is a required field`,
  }),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().pattern(namePattern).messages({
    'string.pattern.base': `"name" must start with a capital letter and contain a space between first and last name`,
  }),
  email: Joi.string().email().messages({
    'string.email': `"email" must be a valid email address`,
  }),
  phoneNumber: Joi.string().pattern(/^\+\d{12}$/).messages({
    'string.pattern.base': `"phoneNumber" must be in the format +XXXXXXXXXXXX (12 digits)`,
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'work').messages({
    'any.only': `"contactType" must be either 'personal' or 'work'`,
  }),
  parentId: Joi.string().required().messages({
    'any.required': `"parentId" is a required field`,
  }),
}).min(1);