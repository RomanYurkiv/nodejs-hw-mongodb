import Joi from 'joi';
import JoiPhoneNumber from 'joi-phone-number';

const extendedJoi = Joi.extend(JoiPhoneNumber);

export const createContactsSchema = extendedJoi.object({
  name: extendedJoi.string().min(3).max(20).required(),
  email: extendedJoi.string().email().min(3).max(20).required(),
  phoneNumber: extendedJoi.string().phoneNumber().min(3).max(20).required(),
  contactType: extendedJoi.string().valid('work', 'personal', 'home').min(3).max(20).required(),
  isFavourite: extendedJoi.boolean(),
});

export const updateContactsSchema = extendedJoi.object({
  name: extendedJoi.string().min(3).max(20),
  email: extendedJoi.string().email().min(3).max(20),
  phoneNumber: extendedJoi.string().phoneNumber().min(3).max(20),
  contactType: extendedJoi.string().valid('work', 'personal', 'home').min(3).max(20),
  isFavourite: extendedJoi.boolean(),
});