import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import EmployeeRoute from "./routes/EmployeeRoute.js";
dotenv.config();

const app = express();
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(EmployeeRoute);

app.listen(5000, () => {
    console.log("Server up and running.");
});