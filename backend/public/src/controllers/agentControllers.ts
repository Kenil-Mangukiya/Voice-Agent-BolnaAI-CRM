import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import config from "../config/config.js";
import prisma from "../db/prisma.js";
import axios from "axios";
import { validateAgentRequest, validateAgentData, validateAgentOwnership } from "../utils/agentValidation.js";

// Create agent using Bolna AI API and store in database
const createAgent = asyncHandler(async (req: any, res: any) => {
    const {
        agent_config,
        agent_prompts
    } = req.body;

    // Get userId from authenticated request (set by authMiddleware)
    const userId = req.userId;
    
    // Validate common requirements (authentication, API key)
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    // Validate agent data
    const dataValidationError = validateAgentData(agent_config, agent_prompts);
    if (dataValidationError) {
        return res.status(dataValidationError.status).json(dataValidationError.error);
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
        where: { id: userId! }
    });

    if (!user) {
        return res.status(404).json(new apiError(404, "User not found", [], ""));
    }

    // Prepare agent data for Bolna API
    const agentData = {
        agent_config,
        agent_prompts
    };

    try {
        // Log the full payload being sent to Bolna API
        console.log('='.repeat(80));
        console.log('PAYLOAD BEING SENT TO BOLNA API:');
        console.log('='.repeat(80));
        console.log(JSON.stringify(agentData, null, 2));
        console.log('='.repeat(80));
        
        // Log synthesizer config specifically
        if (agent_config?.tasks?.[0]?.tools_config?.synthesizer) {
            console.log('Synthesizer Config:');
            console.log(JSON.stringify({
                provider: agent_config.tasks[0].tools_config.synthesizer.provider,
                provider_config: agent_config.tasks[0].tools_config.synthesizer.provider_config,
                buffer_size: agent_config.tasks[0].tools_config.synthesizer.buffer_size
            }, null, 2));
        }
        
        // Make request to Bolna AI API
        const response = await axios.post(
            `${config.bolnaAiUrl}/v2/agent`,
            agentData,
            {
                headers: {
                    'Authorization': `Bearer ${config.bolnaAiApiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Agent created successfully in Bolna:', response.data);

        // Extract agent ID from Bolna response
        const bolnaAgentId = response.data.agent_id;
        const bolnaStatus = response.data.status || 'created';

        // Save agent to database
        const savedAgent = await prisma.agent.create({
            data: {
                userId: userId,
                bolnaAgentId: bolnaAgentId,
                agentName: agent_config.agent_name,
                agentType: agent_config.agent_type,
                agentConfig: agent_config as any,
                agentPrompts: agent_prompts as any,
                status: bolnaStatus
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });

        console.log('Agent saved to database:', savedAgent.id);
        
        return res.status(200).json(new apiResponse(200, "Agent created successfully", {
            id: savedAgent.id,
            bolnaAgentId: savedAgent.bolnaAgentId,
            agentName: savedAgent.agentName,
            agentType: savedAgent.agentType,
            status: savedAgent.status,
            createdAt: savedAgent.createdAt,
            user: savedAgent.user
        }));
    } catch (error: any) {
        console.error('='.repeat(80));
        console.error('ERROR CREATING AGENT IN BOLNA:');
        console.error('='.repeat(80));
        
        // Handle axios errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Bolna API Error Response:');
            console.error('Status:', error.response.status);
            console.error('Status Text:', error.response.statusText);
            console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
            console.error('='.repeat(80));
            
            const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to create agent';
            const statusCode = error.response.status || 500;
            return res.status(statusCode).json(new apiError(statusCode, errorMessage, [], ""));
        } else if (error.request) {
            // The request was made but no response was received
            return res.status(503).json(new apiError(503, "No response from Bolna AI service", [], ""));
        } else {
            // Something happened in setting up the request that triggered an Error
            return res.status(500).json(new apiError(500, error.message || "Error setting up request to Bolna AI", [], ""));
        }
    }
});

// Update agent using Bolna AI API and update in database
const updateAgent = asyncHandler(async (req: any, res: any) => {
    const { agentId } = req.params; // Get agent ID from URL params
    const {
        agent_config,
        agent_prompts
    } = req.body;

    // Get userId from authenticated request (set by authMiddleware)
    const userId = req.userId;
    
    // Validate common requirements (authentication, API key)
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    // Validate agent data
    const dataValidationError = validateAgentData(agent_config, agent_prompts);
    if (dataValidationError) {
        return res.status(dataValidationError.status).json(dataValidationError.error);
    }

    // Validate agent ownership
    const ownershipResult = await validateAgentOwnership(agentId, userId!);
    if ('error' in ownershipResult) {
        return res.status(ownershipResult.status).json(ownershipResult.error);
    }
    const existingAgent = ownershipResult.agent;

    // Prepare agent data for Bolna API
    const agentData = {
        agent_config,
        agent_prompts
    };

    try {
        // Make PUT request to Bolna AI API to update agent
        const response = await axios.put(
            `${config.bolnaAiUrl}/v2/agent/${existingAgent.bolnaAgentId}`,
            agentData,
            {
                headers: {
                    'Authorization': `Bearer ${config.bolnaAiApiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Agent updated successfully in Bolna:', response.data);

        // Extract status from Bolna response
        const bolnaStatus = response.data.status || 'updated';

        // Update agent in database
        const updatedAgent = await prisma.agent.update({
            where: { id: agentId },
            data: {
                agentName: agent_config.agent_name,
                agentType: agent_config.agent_type,
                agentConfig: agent_config as any,
                agentPrompts: agent_prompts as any,
                status: bolnaStatus
                // updatedAt is automatically updated by Prisma
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });

        console.log('Agent updated in database:', updatedAgent.id);
        
        return res.status(200).json(new apiResponse(200, "Agent updated successfully", {
            id: updatedAgent.id,
            bolnaAgentId: updatedAgent.bolnaAgentId,
            agentName: updatedAgent.agentName,
            agentType: updatedAgent.agentType,
            status: updatedAgent.status,
            updatedAt: updatedAgent.updatedAt,
            user: updatedAgent.user
        }));
    } catch (error: any) {
        console.error('Error updating agent:', error);
        
        // Handle axios errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to update agent';
            const statusCode = error.response.status || 500;
            return res.status(statusCode).json(new apiError(statusCode, errorMessage, [], ""));
        } else if (error.request) {
            // The request was made but no response was received
            return res.status(503).json(new apiError(503, "No response from Bolna AI service", [], ""));
        } else {
            // Something happened in setting up the request that triggered an Error
            return res.status(500).json(new apiError(500, error.message || "Error setting up request to Bolna AI", [], ""));
        }
    }
});

// Delete agent from Bolna AI API and database
const deleteAgent = asyncHandler(async (req: any, res: any) => {
    const { agentId } = req.params; // Get agent ID from URL params

    // Get userId from authenticated request (set by authMiddleware)
    const userId = req.userId;
    
    // Validate common requirements (authentication, API key)
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    // Validate agent ownership
    const ownershipResult = await validateAgentOwnership(agentId, userId!);
    if ('error' in ownershipResult) {
        return res.status(ownershipResult.status).json(ownershipResult.error);
    }
    const existingAgent = ownershipResult.agent;

    try {
        // Make DELETE request to Bolna AI API to delete agent
        const response = await axios.delete(
            `${config.bolnaAiUrl}/v2/agent/${existingAgent.bolnaAgentId}`,
            {
                headers: {
                    'Authorization': `Bearer ${config.bolnaAiApiKey}`
                }
            }
        );

        console.log('Agent deleted successfully in Bolna:', response.data);

        // Delete agent from database after successful Bolna deletion
        await prisma.agent.delete({
            where: { id: agentId }
        });

        console.log('Agent deleted from database:', agentId);
        
        return res.status(200).json(new apiResponse(200, "Agent deleted successfully", {
            message: "Agent and all related data deleted successfully",
            agentId: agentId,
            bolnaAgentId: existingAgent.bolnaAgentId
        }));
    } catch (error: any) {
        console.error('Error deleting agent:', error);
        
        // Handle axios errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to delete agent';
            const statusCode = error.response.status || 500;
            return res.status(statusCode).json(new apiError(statusCode, errorMessage, [], ""));
        } else if (error.request) {
            // The request was made but no response was received
            return res.status(503).json(new apiError(503, "No response from Bolna AI service", [], ""));
        } else {
            // Something happened in setting up the request that triggered an Error
            return res.status(500).json(new apiError(500, error.message || "Error setting up request to Bolna AI", [], ""));
        }
    }
});

// Get all agents from Bolna AI API (not from database)
const getAllAgents = asyncHandler(async (req: any, res: any) => {
    // Get userId from authenticated request (set by authMiddleware)
    const userId = req.userId;
    
    // Validate common requirements (authentication, API key)
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    try {
        // Make GET request to Bolna AI API to fetch all agents
        const response = await axios.get(
            `${config.bolnaAiUrl}/v2/agent/all`,
            {
                headers: {
                    'Authorization': `Bearer ${config.bolnaAiApiKey}`
                }
            }
        );

        console.log(`Fetched ${response.data?.length || 0} agents from Bolna`);
        
        return res.status(200).json(new apiResponse(200, "Agents fetched successfully", response.data || []));
    } catch (error: any) {
        console.error('Error fetching agents:', error);
        
        // Handle axios errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to fetch agents';
            const statusCode = error.response.status || 500;
            return res.status(statusCode).json(new apiError(statusCode, errorMessage, [], ""));
        } else if (error.request) {
            // The request was made but no response was received
            return res.status(503).json(new apiError(503, "No response from Bolna AI service", [], ""));
        } else {
            // Something happened in setting up the request that triggered an Error
            return res.status(500).json(new apiError(500, error.message || "Error setting up request to Bolna AI", [], ""));
        }
    }
});

const getAgentById = asyncHandler(async (req: any, res: any) => {
    // Use hardcoded agent ID for now as requested
    const agentId = "01338a59-87f0-4376-b928-41c19c93f200";
    const userId = req.userId;

    // Validate common requirements (authentication, API key)
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    try {
        // Make request to Bolna AI API to get agent details
        const response = await axios.get(
            `${config.bolnaAiUrl}/v2/agent/${agentId}`,
            {
                headers: {
                    'Authorization': `Bearer ${config.bolnaAiApiKey}`
                }
            }
        );

        console.log(`Fetched agent details for ID: ${agentId}`);
        
        return res.status(200).json(new apiResponse(200, "Agent fetched successfully", response.data || {}));
    } catch (error: any) {
        console.error('Error fetching agent:', error);
        
        // Handle axios errors
        if (error.response) {
            const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to fetch agent';
            const statusCode = error.response.status || 500;
            return res.status(statusCode).json(new apiError(statusCode, errorMessage, [], ""));
        } else if (error.request) {
            return res.status(503).json(new apiError(503, "No response from Bolna AI service", [], ""));
        } else {
            return res.status(500).json(new apiError(500, error.message || "Error setting up request to Bolna AI", [], ""));
        }
    }
});

export { createAgent, updateAgent, deleteAgent, getAllAgents, getAgentById };
