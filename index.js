import * as contactsService from "./contacts.js";
import { program } from "commander";
import { nanoid } from "nanoid";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsService.listContacts();
      return console.log(contacts);
      break;

    case "get":
      // ... id
      const oneContact = await contactsService.getContactById(id);
      return console.log(oneContact);
      break;

    case "add":
      // ... name email phone
      const newContact = await contactsService.addContact(name, email, phone);
      return console.log(newContact);
      break;

    case "remove":
      // ... id
      const deleteContact = await contactsService.removeContact(id);
      return console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
