import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filters = parseFilterParams(req.query);

    console.log('Filters:', filters);

    const result = await getAllContacts({ page, perPage, sortBy, sortOrder, filters });

    console.log('Result:', result);

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data:  result,
    });
  } catch (error) {
    console.log('Error');
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return next(createHttpError(404, `Contact with id ${contactId} not found`));
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    return next(createHttpError(404, `Contact with id ${contactId} not found`));
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body, { upsert: true });

  if (!result) {
    return next(createHttpError(404, `Contact with id ${contactId} not found`));
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted contact with id ${contactId}!`,
    data: result.contact.value,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await updateContact(contactId, req.body);

    if (!result) {
      return next(createHttpError(404, `Contact with id ${contactId} not found`));
    }

    res.json({
      status: 200,
      message: `Successfully patched contact with id ${contactId}!`,
      data: result.contact.value,
    });
  } catch (error) {
    console.error('Error in patchContactController:', error);
    next(error);
  }
};

