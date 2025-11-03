import express from "express";
import { listAgentVoices, importAllVoices, getAllVoicesFromDB, addUserVoice, removeUserVoice, getUserVoices, generateTTSPreview } from "../controllers/agentVoiceControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const voiceRouter = express.Router();

// All voice routes require authentication
voiceRouter.use(authMiddleware);

voiceRouter.get("/list", listAgentVoices);
voiceRouter.post("/import", importAllVoices);
voiceRouter.get("/all", getAllVoicesFromDB);
voiceRouter.post("/add", addUserVoice);
voiceRouter.delete("/remove/:agentVoiceId", removeUserVoice);
voiceRouter.get("/my-voices", getUserVoices);
voiceRouter.post("/preview", generateTTSPreview);

export default voiceRouter;

