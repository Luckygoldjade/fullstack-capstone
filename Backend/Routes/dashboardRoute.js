import { Router } from "express";
import { getJobs } from "../Controllers/jobsController.js";
import { statusCounter } from "../Helpers/statusHelper.js";
import { getUsersContacts } from "../Controllers/contactsController.js";
import { getSkills } from "../Controllers/skillsController.js";
import { getLearning } from "../Helpers/learningHelper.js";
import { getUsersSkills } from "../Controllers/usersSkillsController.js";

const dashboardRouter = Router();

dashboardRouter.get('/dashboard', async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    
    const { data: jobdata } = await getJobs();
    const statusCounts = statusCounter(jobdata);

    const { data: contacts } = await getUsersContacts(req, res);

    const { data: skills } = await getSkills();

    const { data: usersSkills } = await getUsersSkills();

    const learning = await getLearning(skills, usersSkills);
    
    res.render('dashboard', { email: req.session.supabase.user.email, jobApps: jobdata, statusCounts, contacts, skills: usersSkills, learning});
});

export default dashboardRouter;