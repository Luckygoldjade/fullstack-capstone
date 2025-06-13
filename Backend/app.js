import express from "express";
import "dotenv/config";
import authRouter from "./Routes/authRoute.js";
import jobRouter from "./Routes/jobsRoute.js";
import skillRouter from "./Routes/skillsRoute.js";
import contactRouter from "./Routes/contactsRoute.js";
import tagRouter from "./Routes/tagsRoute.js";
import session from "express-session";
import { fileURLToPath } from "url";
import { join, dirname} from "path";
import dashboardRouter from "./Routes/dashboardRoute.js";
import usersSkillsRouter from "./Routes/usersSkillsRoute.js";
import jobPageRouter from "./Routes/jobsPageRoute.js";
import skillPageRouter from "./Routes/skillsPageRoute.js";
import contactPageRouter from "./Routes/contactPageRoute.js";
import jobsSkillsRouter from "./Routes/jobsSkillsPageRoute.js";

const app = express();
const PORT = process.env.PORT;
const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const assetsPath = join(__dirName, "..", "Frontend", "public");

app.set("views", join(__dirName, "..", "Frontend", "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(assetsPath));

app.use(session({
    secret: "JobScript",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false
    }
}))

app.use("/", authRouter);
app.use("/", dashboardRouter);
app.use("/jobs", jobPageRouter);
app.use("/skills", skillPageRouter);
app.use("/jobsskills", jobsSkillsRouter);
app.use("/contacts", contactPageRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/skills", skillRouter);
app.use("/api/usersskills", usersSkillsRouter);
app.use("/api/tags", tagRouter);
app.use("/api/contacts", contactRouter);

app.listen(PORT, () => {console.log(`Listening on PORT: ${PORT}`)});