import { Router } from "express";
import { getCompany } from "../Controllers/companyController.js";
import { getTags } from "../Controllers/tagsController.js";
import { getSkills } from "../Controllers/skillsController.js";
import { getJobs } from "../Controllers/jobsController.js";

const jobPageRouter = Router();

jobPageRouter.get("/", async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    const { data: applications } = await getJobs();

    const { data: companies } = await getCompany();

    const { data: tags } = await getTags();

    const { data: skills } = await getSkills();
    
    res.render('applications', { applications, companies, skills, tags });
});

jobPageRouter.get("/create", async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    
    const { data: companies } = await getCompany();

    const { data: tags } = await getTags();

    const { data: skills } = await getSkills();
    
    res.render('jobs', { companies, skills, tags });
});

export default jobPageRouter;