import { Router } from "express";
import { addUsersSkills, deleteUsersSkills, getUsersSkills, updateUsersSkills } from "../Controllers/usersSkillsController.js";
import { getUserFromToken } from "../Controllers/authController.js";
import { addSkillSingle, getSkillById, getSkills } from "../Controllers/skillsController.js";
import supabase from "../Configs/supabaseClient.js";

const skillPageRouter = Router();

skillPageRouter.get("/", async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    const { data: userSkills } = await getUsersSkills();
    const { data: allSkills } = await getSkills();

    res.render('usersskills', { userSkills, allSkills });
});

skillPageRouter.post("/update", getUserFromToken, async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    updateUsersSkills(req, res);
})

skillPageRouter.post("/delete/:skill_id", getUserFromToken, async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    deleteUsersSkills(req, res);
})

skillPageRouter.post("/add", getUserFromToken, async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    const { data } = await getSkillById(req, res);

    if (!data) {
        const { data: newData } = await addSkillSingle(req, res);
        req.body.skill_id = newData.id;
    } else {
        req.body.skill_id = data.id;
    }
    addUsersSkills(req, res);
})

export default skillPageRouter;