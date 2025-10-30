import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRoute } from "./public/src/routes/authRoute";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use("/api/auth", authRoute);

export default app;