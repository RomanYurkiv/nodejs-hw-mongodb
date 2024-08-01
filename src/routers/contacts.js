// import express from 'express';
// import { validateBody } from "../middlewares/validateBody.js";
// import { isValidId } from '../middlewares/isValidId.js';
// import {
//   createContactsSchema,
//   updateContactsSchema,
// } from '../validation/contacts.js';
// import {
//   getAllContactsController,
//   getContactByIdController,
//   createContactController,
//   deleteContactController,
//   upsertContactController,
//   patchContactController,
// } from '../controllers/contacts.js';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// const router = express.Router();

// router.get('/contacts', ctrlWrapper(getAllContactsController));
// router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));
// router.post('/contacts', validateBody(createContactsSchema), ctrlWrapper(createContactController));
// router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));
// router.put('/contacts/:contactId', isValidId, ctrlWrapper(upsertContactController));
// router.patch('/contacts/:contactId', isValidId, ctrlWrapper(patchContactController));
// router.post('/', validateBody(createContactsSchema), ctrlWrapper(createContactController));
// router.patch('/contacts/:contactsId', validateBody(updateContactsSchema), ctrlWrapper(patchContactController));


// export default router;

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

router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/contacts', validateBody(createContactsSchema), ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.put('/contacts/:contactId', isValidId, validateBody(createContactsSchema), ctrlWrapper(upsertContactController));

router.patch('/contacts/:contactId', isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactController));

export default router;