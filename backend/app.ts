import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRoute } from "./public/src/routes/authRoute";

const app = express();

// CORS must come before other middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);

export default app;