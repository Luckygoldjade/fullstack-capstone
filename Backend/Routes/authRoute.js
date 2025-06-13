import { registerUser, loginUser, passwordResetRequest, updatePassword, getUserFromToken, signOut } from "../Controllers/authController.js";
import { Router } from "express";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-routes
// https://expressjs.com/en/guide/routing.html

const authRouter = Router();

authRouter.get("/",  (req, res) => {
  res.render('index', {user: req.session.supabase});
})
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/password-reset-request", passwordResetRequest)
authRouter.post("/update-password", getUserFromToken, updatePassword)
authRouter.post("/sign-out", getUserFromToken, signOut)

export default authRouter;