import { Router } from "express";
import { addSkills, deleteSkills, getSkills, updateSkills } from "../Controllers/skillsController.js";
import { getUserFromToken } from "../Controllers/authController.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-routes
// https://expressjs.com/en/guide/routing.html

const skillRouter = Router();

skillRouter.get("/", getUserFromToken, getSkills);
skillRouter.post("/", getUserFromToken, addSkills);
skillRouter.post("/delete/:skill_id", getUserFromToken, deleteSkills);
skillRouter.post("/update", getUserFromToken, updateSkills);

export default skillRouter;