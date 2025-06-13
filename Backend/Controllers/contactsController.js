import supabase from "../Configs/supabaseClient.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-controllers
// https://expressjs.com/en/guide/error-handling.html

const getContacts = async (req, res) => {
    const { data, error } = await supabase
    .from("contacts")
    .select("*, profiles(*)");

    if (error) {
        // res.status(400).json({ error: error.message });
        return { error: error.message }
    }
    // res.status(200).json( data );
    return { data } 
}

const getUsersContacts = async (req, res) => {
    const { data, error } = await supabase
    .from("contacts")
    .select("*, profiles(*)")
    .eq("user_id", req.session.supabase.user.id);

    if (error) {
        // res.status(400).json({ error: error.message });
        return { error: error.message }
    }
    // res.status(200).json( data );
    return { data } 
}

const addContacts = async (req, res) => {
    const { contact_id } = req.body;
    const { data, error } = await supabase
    .from("contacts")
    .insert({ contact_id })
    .select("*");

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }

    // res.status(200).json( data );
    res.redirect("/contacts");
}

const deleteContacts = async (req, res) => {
    const contact_id = [req.params.contact_id];
    const { data, error } = await supabase
    .from("contacts")
    .delete()
    .in("contact_id", contact_id)
    .eq("user_id", req.user.id)
    .select("*");

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }
    // res.status(200).json( data );
    res.redirect("/contacts");
}

export { getContacts, addContacts, deleteContacts, getUsersContacts };