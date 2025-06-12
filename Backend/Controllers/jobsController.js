import supabase from "../Configs/supabaseClient.js";
import { checkIfCompanyExist } from "../Helpers/jobsCompanyHelper.js";
import { checkIfSkillsExist, addJobsSkills, getSkillsId, getSkillNamesinArray } from "../Helpers/jobsSkillsHelper.js";
import { addJobsTags, addNewTags, checkIfTagsExist, flattenTags } from "../Helpers/jobsTagsHelper.js";
import { addCompany } from "./companyController.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-controllers
// https://expressjs.com/en/guide/error-handling.html

// https://supabase.com/docs/reference/javascript/select
const getJobs = async (req, res) => {
    const { data, error } = await supabase
    .from("jobs")
    .select("*,  skills(*), jobsSkills(*), tags(tag_name), company(name)");

    if (error) {
        // res.status(400).json({ error: error.message });
        return { error: error.message };
    }

    await getSkillNamesinArray(data);
    for(const job of data) {
        job.tags = flattenTags(job.tags);
    }

    // res.status(200).json( data );
    return { data };
}

// https://supabase.com/docs/reference/javascript/insert
const addJobs = async (req, res) => {
    const user_id = req.user.id;
    const { title, status, salary, benefits, location, url, description, date_posted, company_name, skills, tags } = req.body;
    const companyData = await checkIfCompanyExist(company_name);

    let company_id;
    if (companyData.length === 0) {
        const { data: addedCompany } = await supabase
        .from("company")
        .insert({ name: company_name })
        .select();
        console.log(addCompany);
        company_id = addedCompany[0].company_id;
    } else {
        company_id = companyData[0].company_id;
    }

    const { data, error } = await supabase
    .from("jobs")
    .insert({ title, status, salary, benefits, location, url, description, date_posted, user_id, company_id })
    .select();

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }
    const skillNames = skills ?? [];
    const matchedSkills = await checkIfSkillsExist(skillNames);
    const skillsId = await getSkillsId(matchedSkills, skillNames);
    const addedSkillNames = await addJobsSkills(data, skillsId, skills);

    const { data: matchedTagsData, matchedTags } = await checkIfTagsExist(tags ?? []);
    const { newTagsData } = await addNewTags(tags ?? [], matchedTags);
    const matchedTagsNames = await addJobsTags(data[0].id, matchedTagsData);
    const newTagsNames = await addJobsTags(data[0].id, newTagsData);

    data[0].skills = addedSkillNames;
    data[0].tags = matchedTagsNames.concat(newTagsNames);

    // res.status(200).json( data );
    res.redirect("/jobs");
}

// https://supabase.com/docs/reference/javascript/delete
const deleteJobs = async (req, res) => {
    const id = [req.params.job_id];
    const { data, error } = await supabase
    .from("jobs")
    .delete()
    .in("id", id)
    .eq("user_id", req.user.id)
    .select("*,  skills(*), jobsSkills(*)");

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }

    await getSkillNamesinArray(data);
    // res.status(200).json( data );
    res.redirect("/jobs")
}

// https://supabase.com/docs/reference/javascript/update
const updateJobs = async (req, res) => {
    const user_id = req.user.id;
    const { id, title, status, salary, benefits, location, url, description, date_posted, company_name, skills, tags } = req.body;
    const companyData = await checkIfCompanyExist(company_name);
    let company_id;
    if (companyData.length === 0) {
        const { data: addedCompany } = await supabase
        .from("company")
        .insert({ name: company_name })
        .select();
        console.log(addCompany);
        company_id = addedCompany[0].company_id;
    } else {
        company_id = companyData[0].company_id;
    }

    const { data, error } = await supabase
    .from("jobs")
    .update({title, status, salary, benefits, location, url, description, date_posted, user_id, company_id})
    .eq('id', id)
    .select("*,  skills(*), jobsSkills(*)");

    const skillNames = skills ?? [];
    const matchedSkills = await checkIfSkillsExist(skillNames);
    const skillsId = await getSkillsId(matchedSkills, skillNames);
    const skillsData = await addJobsSkills(data, skillsId, skills);

    await supabase
    .from("jobsSkills")
    .delete()
    .not("skill_id", "in", `(${skillsId.map(skill => skill.id).join(",")})`)
    .eq("job_id", id);

    const { data: matchedTagsData, matchedTags } = await checkIfTagsExist(tags ?? []);
    const { newTagsData } = await addNewTags(tags ?? [], matchedTags);
    const tagsData = matchedTagsData.concat(newTagsData);
    const newTagsNames = await addJobsTags(data[0].id, tagsData);

    await supabase
    .from("jobsTags")
    .delete()
    .not("tag_id", "in", `(${tagsData.map(tag => tag.tag_id).join(",")})`)
    .eq("job_id", id);

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }
    delete data[0]["jobsSkills"];
    data[0].skills = skillsData;
    data[0].tags = newTagsNames;
    // res.status(200).json( data );
    res.redirect("/jobs")
}


export { getJobs, addJobs, deleteJobs, updateJobs };