import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRoute } from "./public/src/routes/authRoute";
import { agentRoute } from "./public/src/routes/agentRoute";
import asyncHandler from "./public/src/utils/asyncHandler";
import apiResponse from "./public/src/utils/apiResponse";
import prisma from "./public/src/db/prisma";

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

// Health check route
app.get("/api/health", asyncHandler(async (req, res) => {
    // Check database connection
    try {
        await prisma.$queryRaw`SELECT 1`;
        console.log("✅ Database: Connected");
    } catch (error) {
        console.error("❌ Database: Connection failed");
        throw new Error("Database connection failed");
    }
    
    return res.status(200).json(new apiResponse(200, "Server is healthy", {
        status: "ok",
        database: "connected",
        timestamp: new Date().toISOString()
    }));
}));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/agent", agentRoute);

export default app;