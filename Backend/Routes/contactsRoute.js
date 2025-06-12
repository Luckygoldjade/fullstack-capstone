import { Router } from "express";
import { addContacts, deleteContacts, getContacts } from "../Controllers/contactsController.js";
import { getUserFromToken } from "../Controllers/authController.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-routes
// https://expressjs.com/en/guide/routing.html

const contactRouter = Router();

contactRouter.get("/", getUserFromToken, getContacts);
contactRouter.post("/", getUserFromToken, addContacts);
contactRouter.delete("/", getUserFromToken, deleteContacts);

export default contactRouter;