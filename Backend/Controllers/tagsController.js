import supabase from "../Configs/supabaseClient.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-controllers
// https://expressjs.com/en/guide/error-handling.html

const getTags = async (req, res) => {
    const { data, error } = await supabase
    .from("tags")
    .select("*");

    if (error) {
        return res.status(400).json({ error: error.message });
    }
    // res.status(200).json( data );
    return { data };
}


const addTags = async (req, res) => {
    const { tag_name } = req.body;
    const { data, error } = await supabase
    .from("tags")
    .insert({ tag_name })
    .select("*");

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json( data );
}

const deleteTags = async (req, res) => {
    const { id } = req.body;
    const { data, error } = await supabase
    .from("tags")
    .delete()
    .in("tag_id", id)
    .select("*");

    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json( data );
}

const updateTags = async (req, res) => {
    const { id, tag_name } = req.body;
    const { data, error } = await supabase
    .from("tags")
    .update({tag_name})
    .eq("tag_id", id)
    .select("*");

    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json( data );
}


export { getTags, addTags, deleteTags, updateTags };