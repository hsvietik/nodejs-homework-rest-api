const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const {
  addContactSchema,
  updateFavoriteSchema,
} = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, controllers.getAllContacts);

router.get("/:contactId", authenticate, isValidId, controllers.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(addContactSchema),
  controllers.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllers.removeContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addContactSchema),
  controllers.updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  controllers.updateStatusContact
);

module.exports = router;
