import supabase from "../Configs/supabaseClient.js";

const getProfiles = async (req, res) => {
    const { data, error } = await supabase
    .from("profiles")
    .select("*");

    if (error) {
        // res.status(400).json({ error: error.message });
        return { error: error.message };
    }
    // res.status(200).json( data );
    return { data };
}

const updateProfiles = async (req, res) => {
    const { contact_id, first_name, last_name, email } = req.body;
    const { data, error } = await supabase
    .from("profiles")
    .update({ first_name, last_name, email })
    .eq('profile_id', contact_id);

    if (error) {
    // res.status(400).json({ error: error.message });
        return { error: error.message };
    }
    // res.status(200).json( data );
    return { data };
}

const addProfiles = async (req, res) => {
    const { first_name, last_name, email } = req.body;
    const { data, error } = await supabase
    .from("profiles")
    .insert({ first_name, last_name, email })
    .select("*");

    if (error) {
    // res.status(400).json({ error: error.message });
        return { error: error.message };
    }
    // res.status(200).json( data );
    return { data };
}

export { getProfiles, updateProfiles, addProfiles };