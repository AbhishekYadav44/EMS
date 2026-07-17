import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import organizationRoutes from "./routes/organizationRoutes.js"

dotenv.config()

const app = express();

const dburl = process.env.DB_URL as string;

app.use(express.json())
app.use(
    cors({
        origin: "https://ems-sooty-one.vercel.app",
        credentials: true,
    })
);
async function main() {
    await mongoose.connect(dburl)
}

app.get("/", (req, res) => {
    res.send("hello this is home page")
})

app.use("/api/auth", userRoutes)
app.use("/api/employees", employeeRoutes)
app.use("/api/profile", profileRoutes);
app.use("/api/organization", organizationRoutes);

main().then(() => {
    console.log("db connected")
}).catch((e) => {
    console.log("db connection failed!", e)
})
app.listen(8080, () => {
    console.log("server started!")
})