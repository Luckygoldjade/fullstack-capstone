import supabase from "../Configs/supabaseClient.js";

const checkIfCompanyExist = async(name) => {
    const { data } = await supabase
    .from("company")
    .select("*")
    .eq("name", name);
    return data;
}

export { checkIfCompanyExist }