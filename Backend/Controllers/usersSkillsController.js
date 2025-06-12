import supabase from "../Configs/supabaseClient.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-controllers
// https://expressjs.com/en/guide/error-handling.html

const getUsersSkills = async (req, res) => {
    const { data, error } = await supabase
    .from("usersSkills")
    .select("*, skills(skill_name)");

    if (error) {
        // res.status(400).json({ error: error.message });
        return { error: error.message };
    }
    // res.status(200).json( data );
    return { data };
}


const addUsersSkills = async (req, res) => {
    const user_id = req.user.id;
    const { skill_id, rating } = req.body;
    const { data, error } = await supabase
    .from("usersSkills")
    .insert({ user_id, skill_id, rating })
    .select("*");

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }

    // res.status(200).json( data );
    res.redirect("/skills");
}

const deleteUsersSkills = async (req, res) => {
    const skill_id = [req.params.skill_id];
    const { data, error } = await supabase
    .from("usersSkills")
    .delete()
    .in("skill_id", skill_id)
    .eq("user_id", req.user.id)
    .select("*");

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }
    // res.status(200).json( data );
    res.redirect("/skills");
}

const updateUsersSkills = async (req, res) => {
    const { skill_id, rating } = req.body;
    const { data, error } = await supabase
    .from("usersSkills")
    .update({ rating })
    .eq('user_id', req.user.id)
    .eq('skill_id', skill_id)
    .select("*");

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }
    // res.status(200).json( data );
    res.redirect("/skills");
}


export { getUsersSkills, addUsersSkills, deleteUsersSkills, updateUsersSkills };