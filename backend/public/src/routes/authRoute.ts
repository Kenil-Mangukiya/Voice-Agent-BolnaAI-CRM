import express from "express";
import { registerUser } from "../controllers/authController";
import upload from "../middlewares/multerMiddleware";

const authRoute = express.Router();

// Use any() to allow register without avatar, fields() to handle with optional file
authRoute.post("/register", upload.any(), registerUser);

export { authRoute };