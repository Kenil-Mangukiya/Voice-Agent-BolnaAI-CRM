import express from "express";
import { createAgent, updateAgent, deleteAgent, getAllAgents } from "../controllers/agentControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const agentRoute = express.Router();

// All agent routes require authentication
agentRoute.use(authMiddleware);

agentRoute.get("/all", getAllAgents);
agentRoute.post("/create", createAgent);
agentRoute.put("/update/:agentId", updateAgent);
agentRoute.delete("/delete/:agentId", deleteAgent);

export { agentRoute };
