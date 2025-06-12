import supabase from "../Configs/supabaseClient.js";
import { addSkillSingle, getSkillById } from "./skillsController.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-controllers
// https://expressjs.com/en/guide/error-handling.html

const getJobsSkills = async (req, res) => {
    const { data, error } = await supabase
    .from("jobsSkills")
    .select("*, jobs!inner(user_id, title, company(name)), skills(skill_name)")
    .filter("jobs.user_id", "eq", req.user.id);

    if (error) {
        // res.status(400).json({ error: error.message });
        return { error: error.message };
    }
    // res.status(200).json( data );
    return { data };
}


const addJobsSkills = async (req, res) => {
    const { job_id, rating } = req.body;
    const { data: skillData } = await getSkillById(req, res);
    let skill_id;
    if (!skillData) {
         const { data } = await addSkillSingle(req, res);
         skill_id = data.id;
    } else {
        skill_id = skillData.id;
    }
    const { data, error } = await supabase
    .from("jobsSkills")
    .insert({ job_id, skill_id, rating })
    .select("*");

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }

    // res.status(200).json( data );
    res.redirect("/jobsskills");
}

const deleteJobsSkills = async (req, res) => {
    const job_id = [req.params.job_id];
    const skill_id = [req.params.skill_id];
    const { data, error } = await supabase
    .from("jobsSkills")
    .delete()
    .in("skill_id", skill_id)
    .eq("job_id", job_id)
    .select("*");

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }
    // res.status(200).json( data );
    res.redirect("/jobsskills");
}

const updateJobsSkills = async (req, res) => {
    const { job_id, skill_id, rating } = req.body;
    const { data, error } = await supabase
    .from("jobsSkills")
    .update({ rating })
    .eq('job_id', job_id)
    .eq('skill_id', skill_id)
    .select("*");

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }
    // res.status(200).json( data );
    res.redirect("/jobsskills");
}


export { getJobsSkills, addJobsSkills, deleteJobsSkills, updateJobsSkills };