import express from "express";
import { createAgent, updateAgent, deleteAgent, getAllAgents, getAgentById } from "../controllers/agentControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const agentRoute = express.Router();

// All agent routes require authentication
agentRoute.use(authMiddleware);

agentRoute.get("/all", getAllAgents);
agentRoute.get("/:agentId", getAgentById);
agentRoute.post("/create", createAgent);
agentRoute.put("/update/:agentId", updateAgent);
agentRoute.delete("/delete/:agentId", deleteAgent);

export { agentRoute };
