const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  return contactsList;
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contact = contactsList.find(
    (contact) => contact.id === String(contactId)
  );
  return contact || null;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(
    (contact) => contact.id === String(contactId)
  );
  if (!~index) return null;
  const [removedContact] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return removedContact;
};

const addContact = async (body) => {
  const id = nanoid();
  const newContact = { id, ...body };
  const contactsList = await listContacts();
  const updatedContactsList = [...contactsList, newContact];
  await fs.writeFile(
    contactsPath,
    JSON.stringify(updatedContactsList, null, 2)
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  const id = String(contactId);
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === id);
  if (!~index) return null;
  contactsList[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
