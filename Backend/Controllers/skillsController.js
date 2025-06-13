import supabase from "../Configs/supabaseClient.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-controllers
// https://expressjs.com/en/guide/error-handling.html

const getSkills = async (req, res) => {
    const { data, error } = await supabase
    .from("skills")
    .select("*");

    if (error) {
        // res.status(400).json({ error: error.message });
        return { error: error.message };
    }
    // res.status(200).json( data );
    return { data };
}


const addSkills = async (req, res) => {
    const { skill_name } = req.body;
    const { data, error } = await supabase
    .from("skills")
    .insert({ skill_name })
    .select("*");

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json( data );
}

const deleteSkills = async (req, res) => {
    const { id } = req.body;
    const { data, error } = await supabase
    .from("skills")
    .delete()
    .in("id", id)
    .select("*");

    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json( data );
}

const updateSkills = async (req, res) => {
    const { id, skill_name } = req.body;
    const { data, error } = await supabase
    .from("skills")
    .update({skill_name})
    .eq('id', id)
    .select("*");

    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json( data );
}

const getSkillById = async (req, res) => {
    const skill_name = req.body.skill_name;
    const { data, error } = await supabase
    .from("skills")
    .select("id")
    .eq("skill_name", skill_name)
    .single();

    if (error) {
        // res.status(400).json({ error: error.message });
        return { error: error.message };
    }
    // res.status(200).json( data );
    return { data };
}

const addSkillSingle = async (req, res) => {
    const skill_name = req.body.skill_name;
    const { data, error } = await supabase
    .from("skills")
    .insert({ skill_name })
    .select("*")
    .single();

    if (error) {
        // res.status(400).json({ error: error.message });
        return { error: error.message };
    }
    // res.status(200).json( data );
    return { data };
}

export { getSkills, addSkills, deleteSkills, updateSkills, getSkillById, addSkillSingle};