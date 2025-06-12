
const getLearning = async (skills, usersSkills) => {
    const learning = [];

    const skillRates = {}

    for (const skillRate of usersSkills) {
        skillRates[skillRate.skill_id] = skillRate.rating;
    }

    for (const skill of skills) {
        if (!skillRates.hasOwnProperty(skill.id.toString())) {
            learning.push(skill.skill_name);
        }
        else if (skillRates.hasOwnProperty(skill.id) && skillRates[skill.id.toString()] < 4) {
            learning.push(skill.skill_name);
        }
    }

    return learning;
}

export { getLearning };