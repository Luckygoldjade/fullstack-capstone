import supabase from "../Configs/supabaseClient.js";

const getSkillNamesinArray = async(jobs) => {
    for(const job of jobs) {
        const skillRating = {};

        for (const jobSkill of job.jobsSkills ) {
            skillRating[[jobSkill.skill_id]] = jobSkill.rating;
        }

        job.skills = job.skills.map(skill => { 
            return { [skill["skill_name"]] : skillRating[`${skill["id"]}`] }
        });
        delete job["jobsSkills"];
    }
}

const getSkillswithJobId = async(job_id) => {
    const { data, error } = await supabase
    .from("jobsSkills")
    .select("skills(skill_name)")
    .eq("job_id", job_id)
    return {data, error}
}

const checkIfSkillsExist = async(skills) => {
    const { data } = await supabase
    .from("skills")
    .select("*")
    .in("skill_name", skills);
    return data;
}

const addSkillsId = async(skillsId, skills) => {
    for(const skill of skills) {
        const { data } = await supabase
        .from("skills")
        .insert({skill_name: skill})
        .select("*");
        skillsId.push({id: data[0].id, skill_name: skill});
    }
}

const getSkillsId = async(skillsData, skills) => {
    const skillsId = [];
    for(const skillData of skillsData) {
        const index = skills.indexOf(skillData.skill_name);
        if(index !== -1) {
            skillsId.push({id: skillData.id, skill_name: skillData.skill_name});
            skills.splice(index, 1);
        }
    }
    await addSkillsId(skillsId, skills);
    return skillsId;
}

const addJobsSkills = async (data, skillsId, skills) => {
    const skillNames = [];
    for(const skillId of skillsId) {
        await supabase
        .from("jobsSkills")
        .upsert({job_id: data[0].id, skill_id: skillId.id, rating: 0})
        .select("*, skills(skill_name)");

        skillNames.push({[skillId.skill_name]: skills[skillId.skill_name]});
    }
    return skillNames;
}

export {checkIfSkillsExist, addSkillsId, addJobsSkills, getSkillsId, getSkillswithJobId, getSkillNamesinArray};