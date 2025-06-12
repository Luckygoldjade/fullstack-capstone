import { Router } from "express";
import { getUserFromToken } from "../Controllers/authController.js";
import { addContacts, deleteContacts, getUsersContacts } from "../Controllers/contactsController.js";
import { addProfiles, getProfiles, updateProfiles } from "../Controllers/profilesController.js";

const contactPageRouter = Router();

contactPageRouter.get("/", async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    const { data: userContacts } = await getUsersContacts(req, res);
    const { data: allContacts } =  await getProfiles(req, res);

    res.render('contacts', { userContacts, allContacts });
});

contactPageRouter.post("/update", getUserFromToken, async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }

    await updateProfiles(req, res)

    res.redirect("/contacts");
})

contactPageRouter.post("/delete/:contact_id", getUserFromToken, async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }
    await deleteContacts(req, res);
})

contactPageRouter.post("/add", getUserFromToken, async (req, res) => {
    if (!req.session.supabase) {
        return res.redirect('/');
    }

    if (req.body.existing_contact.trim().length === 0) {
        const { data } = await addProfiles(req, res);
        req.body.contact_id = data[0].profile_id
    } else {
        req.body.contact_id = parseInt(req.body.existing_contact);
    }
    await addContacts(req, res);
})

export default contactPageRouter;