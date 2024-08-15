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
  let authContactId = {};
  const { contactId } = req.params;
  const userId = req.user._id;
  if (contactId) {
    authContactId = { _id: contactId };
  }
  if (userId) {
    authContactId = { ...authContactId, userId: userId };
  }
  return authContactId;
};

// export const getContactByIdController = async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const contact = await getContactById(contactId);
//     if (!contact) {
//       return next(createHttpError(404, `Contact with id ${contactId} not found`));
//     }
//     res.json({
//       status: 200,
//       message: `Successfully found contact with id ${contactId}!`,
//       data: contact,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const getContactByIdController = async (req, res, next) => {
  const authContactId = setAuthContactId(req);
  const contact = await getContactById(authContactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${authContactId}!`,
    data: contact,
  });
};

// export const createContactController = async (req, res, next) => {
//   const contact = await createContact(req.body);
//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created contact!',
//     data: contact,
//   });
// };

export const createContactController = async (req, res) => {
  const contact = await createContact({ userId: req.user._id, ...req.body });
  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

// export const deleteContactController = async (req, res, next) => {
//   const { contactId } = req.params;
//   const contact = await deleteContact(contactId);

//   if (!contact) {
//     return next(createHttpError(404, `Contact with id ${contactId} not found`));
//   }

//   res.status(204).send();
// };

export const deleteContactController = async (req, res, next) => {
  const authContactId = setAuthContactId(req);

  const contact = await deleteContact(authContactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};

// export const upsertContactController = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await updateContact(contactId, req.body, { upsert: true });

//   if (!result) {
//     return next(createHttpError(404, `Contact with id ${contactId} not found`));
//   }

//   const status = result.isNew ? 201 : 200;

//   res.status(status).json({
//     status,
//     message: `Successfully upserted contact with id ${contactId}!`,
//     data: result.contact.value,
//   });
// };

export const upsertContactController = async (req, res, next) => {
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
    message: `Successfully upserted contact with id ${authContactId}!`,
    data: result.contact.value,
  });
};

// export const patchContactController = async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const result = await updateContact(contactId, req.body);

//     if (!result) {
//       return next(createHttpError(404, `Contact with id ${contactId} not found`));
//     }

//     res.json({
//       status: 200,
//       message: `Successfully patched contact with id ${contactId}!`,
//       data: result.contact.value,
//     });
//   } catch (error) {
//     console.error('Error in patchContactController:', error);
//     next(error);
//   }
// };

export const patchContactController = async (req, res, next) => {
  const authContactId = setAuthContactId(req);
  const result = await updateContact(authContactId, req.body);
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully patched contact with id ${authContactId}!`,
    data: result.contact.value,
  });
};

