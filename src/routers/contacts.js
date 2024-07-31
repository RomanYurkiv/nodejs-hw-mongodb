import express from 'express';
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
router.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/contacts/:contactsId',
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);
router.get(
  '/:studentId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);


export default router;