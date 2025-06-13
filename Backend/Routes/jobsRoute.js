import { Router } from "express";
import { getUserFromToken } from "../Controllers/authController.js"
import { getJobs, addJobs, deleteJobs, updateJobs } from "../Controllers/jobsController.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-routes
// https://expressjs.com/en/guide/routing.html

const jobRouter = Router();

jobRouter.get("/", getUserFromToken, getJobs);
jobRouter.post("/", getUserFromToken, addJobs);
jobRouter.post("/delete/:job_id", getUserFromToken, deleteJobs);
jobRouter.post("/update", getUserFromToken, updateJobs);

export default jobRouter;