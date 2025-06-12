import supabase from "../Configs/supabaseClient.js";
// Resources used:
// https://www.theodinproject.com/lessons/nodejs-controllers
// https://expressjs.com/en/guide/error-handling.html

// https://supabase.com/docs/reference/javascript/auth-signup
const registerUser = async(req, res) => {
    const { email, password, first_name, last_name } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password,
        options: {
            data: {
                first_name,
                last_name,
                email
            },
        },
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    // console.log(data.user);
    res.redirect("/");
    // res.status(200).json({ user: data.user });
}

// https://supabase.com/docs/reference/javascript/auth-signinwithpassword
const loginUser = async(req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
    // return res.status(401).json({ error: error.message });
        res.redirect("/")
    }

    const { data: userData, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)

    if (userError) {
        // return res.status(401).json({ error: error.message });
        res.redirect("/")
    }
    
    req.session.supabase = {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    user: userData[0],
    };

    // console.log(data.user, data.session.access_token)
    res.redirect("/dashboard");
    // res.status(200).json({ user: data.user,  token: data.session.access_token});
}

// https://supabase.com/docs/reference/javascript/auth-resetpasswordforemail
const passwordResetRequest = async(req, res) => {
    const { email } = req.body;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ user: data, error: error});
}

// https://supabase.com/docs/reference/javascript/auth-updateuser
const updatePassword = async(req, res) => {
    const { password } = req.body;
    const { data, error } = await supabase.auth.updateUser({ password })

    if (error) {
        return res.status(401).json({ error: error.message });
    }

    res.status(200).json({ user: data.user, error: error});
}

// https://supabase.com/docs/reference/javascript/auth-getuser
const getUserFromToken = async (req, res, next) => {
    if ( req.session.supabase.user ) {
        req.user = req.session.supabase.user;
    } else {
        const { token } = req.body;
        const { data: { user }, error } = await supabase.auth.getUser(token);
        
        if (error) {
            return res.status(401).json({ error: error.message });
        }
        req.user = user;
    }
    next();
}

const signOut = async (req, res) => {
  req.session.destroy((err) => {
        if (err) {
        console.error("Error destroying session:", err);
        }
    })
    res.redirect("/");
}

export { registerUser, loginUser, passwordResetRequest, updatePassword, getUserFromToken, signOut };