const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const {
  addContactSchema,
  updateFavoriteSchema,
} = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", controllers.getAllContacts);

router.get("/:contactId", isValidId, controllers.getContactById);

router.post("/", validateBody(addContactSchema), controllers.addContact);

router.delete("/:contactId", isValidId, controllers.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(addContactSchema),
  controllers.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  controllers.updateStatusContact
);

module.exports = router;
