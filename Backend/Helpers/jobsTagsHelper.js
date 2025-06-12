import supabase from "../Configs/supabaseClient.js";

const addJobsTags = async(jobId, tags) => {
    const tagNames = []
    for(const tag of tags) {
        await supabase
        .from("jobsTags")
        .insert({job_id: jobId, tag_id: tag.tag_id})
        .select("*, tags(tag_name)");
        tagNames.push(tag.tag_name);
    }
    return tagNames;
}

const flattenTags = (data) => {
    const tagNames = [];
    for(const tagData of data) {
        tagNames.push(tagData.tag_name);
    }
    return tagNames;
}

const checkIfTagsExist = async(tags) => {
    const { data } = await supabase
    .from("tags")
    .select("*")
    .in("tag_name", tags);
    const matchedTags = flattenTags(data);
    return { data, matchedTags} ;
}

const addNewTags = async(tags, matchedTags) => {
    const newTagsData = [];
    for(const tag of tags) {
        if (matchedTags.indexOf(tag) == -1) {
            const { data } = await supabase
            .from("tags")
            .insert({tag_name: tag})
            .select("*");
            newTagsData.push({id: data[0].tag_id, tag_name: data[0].tag_name});
        }
    }
    const newTags = flattenTags(newTagsData);
    return { newTagsData, newTags};
}

export {checkIfTagsExist, addNewTags, addJobsTags, flattenTags};