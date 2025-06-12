import { Router } from "express";
import { addJobsSkills, deleteJobsSkills, getJobsSkills, updateJobsSkills } from "../Controllers/jobsSkillsController.js";
import { getUserFromToken } from "../Controllers/authController.js";
import { getSkills } from "../Controllers/skillsController.js";
import supabase from "../Configs/supabaseClient.js";
import { getJobs } from "../Controllers/jobsController.js";

const jobsSkillsPageRouter = Router();

jobsSkillsPageRouter.get("/", getUserFromToken, async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    const { data: jobSkills } = await getJobsSkills(req, res);
    const { data: allSkills } = await getSkills(req, res);
    const { data: allJobs } = await getJobs(req, res);

    res.render('jobsskills', { jobSkills, allSkills, allJobs });
});

jobsSkillsPageRouter.post("/update", getUserFromToken, async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    updateJobsSkills(req, res);
})

jobsSkillsPageRouter.post("/delete/:job_id/:skill_id", getUserFromToken, async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    deleteJobsSkills(req, res);
})

jobsSkillsPageRouter.post("/add", getUserFromToken, async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    await addJobsSkills(req, res);
})

export default jobsSkillsPageRouter;