import { Router } from "express";
import { addUsersSkills, deleteUsersSkills, getUsersSkills, updateUsersSkills } from "../Controllers/usersSkillsController.js";
import { getUserFromToken } from "../Controllers/authController.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-routes
// https://expressjs.com/en/guide/routing.html

const usersSkillsRouter = Router();

usersSkillsRouter.get("/", getUserFromToken, getUsersSkills);
usersSkillsRouter.post("/", getUserFromToken, addUsersSkills);
usersSkillsRouter.delete("/", getUserFromToken, deleteUsersSkills);
usersSkillsRouter.patch("/", getUserFromToken, updateUsersSkills);

export default usersSkillsRouter;