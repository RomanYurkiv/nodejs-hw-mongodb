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

    const result = await getAllContacts({userId: req.user._id, page, perPage, sortBy, sortOrder, filters });

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

const setAuthContactId = (req) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  return { _id: contactId, userId: userId };
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const authContactId = setAuthContactId(req);
    const contact = await getContactById(authContactId);
    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${req.params.contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const contact = await createContact({ userId: req.user._id, ...req.body });
    res.status(201).json({
      status: 201,
      message: 'Successfully created contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const authContactId = setAuthContactId(req);

    const contact = await deleteContact(authContactId);
    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const upsertContactController = async (req, res, next) => {
  try {
    const authContactId = setAuthContactId(req);

    const result = await updateContact(authContactId, req.body, {
      upsert: true,
    });
    if (!result) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully upserted contact with id ${req.params.contactId}!`,
      data: result.contact.value,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const authContactId = setAuthContactId(req);
    const result = await updateContact(authContactId, req.body);
    if (!result) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully patched contact with id ${req.params.contactId}!`,
      data: result.contact.value,
    });
  } catch (error) {
    next(error);
  }
};
