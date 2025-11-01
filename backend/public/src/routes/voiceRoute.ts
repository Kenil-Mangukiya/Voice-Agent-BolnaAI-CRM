import express from "express";
import { listAgentVoices } from "../controllers/agentVoiceControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const voiceRouter = express.Router();

// All voice routes require authentication
voiceRouter.use(authMiddleware);

voiceRouter.get("/list", listAgentVoices);

export default voiceRouter;

