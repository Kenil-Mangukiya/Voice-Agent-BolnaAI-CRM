import express from "express";
import { registerUser, authGoogleUser, logInUser } from "../controllers/authController";
import upload from "../middlewares/multerMiddleware";

const authRoute = express.Router();

authRoute.post("/register", upload.any(), registerUser);
authRoute.post("/google", authGoogleUser);
authRoute.post("/login", logInUser);

export { authRoute };