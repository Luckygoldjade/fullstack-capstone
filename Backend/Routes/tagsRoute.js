import { Router } from "express";
import { addTags, deleteTags, getTags, updateTags } from "../Controllers/tagsController.js";
import { getUserFromToken } from "../Controllers/authController.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-routes
// https://expressjs.com/en/guide/routing.html

const tagRouter = Router();

tagRouter.get("/", getUserFromToken, getTags);
tagRouter.post("/", getUserFromToken, addTags);
tagRouter.delete("/", getUserFromToken, deleteTags);
tagRouter.patch("/", getUserFromToken, updateTags);

export default tagRouter;