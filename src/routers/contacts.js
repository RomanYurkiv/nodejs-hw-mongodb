import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from "../middlewares/validateBody.js";
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', authenticate, ctrlWrapper(getAllContactsController));
router.get('/:contactId', authenticate, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  authenticate,
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/:contactId',
  authenticate,
  ctrlWrapper(deleteContactController),
);

router.put(
  '/:contactId',
  authenticate,
  validateBody(updateContactsSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  authenticate,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

export default router;