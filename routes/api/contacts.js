const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const addContactSchema = require("../../schemas/contacts");
const validateBody = require("../../middlewares/validateBody");

router.get("/", controllers.getAllContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", validateBody(addContactSchema), controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.put(
  "/:contactId",
  validateBody(addContactSchema),
  controllers.updateContact
);

module.exports = router;
