import supabase from "../Configs/supabaseClient.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-controllers
// https://expressjs.com/en/guide/error-handling.html

const getCompany = async (req, res) => {
    const { data, error } = await supabase
    .from("company")
    .select("*");

    if (error) {
        // res.status(400).json({ error: error.message });
        return { error: error.message };
    }
    // res.status(200).json( data );
    return { data };
}


const addCompany = async (req, res) => {
    const { name, country, url, description } = req.body;
    const { data, error } = await supabase
    .from("company")
    .insert({ name, country, url, description })
    .select("*");

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json( data );
}

const deleteCompany = async (req, res) => {
    const { company_id } = req.body;
    const { data, error } = await supabase
    .from("company")
    .delete()
    .in("company_id", company_id)
    .select("*");

    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json( data );
}

const updateCompany = async (req, res) => {
    const { company_id, name, country, url, description } = req.body;
    const { data, error } = await supabase
    .from("company")
    .update({name, country, url, description})
    .eq('company_id', company_id)
    .select("*");

    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json( data );
}


export { getCompany, addCompany, deleteCompany, updateCompany };