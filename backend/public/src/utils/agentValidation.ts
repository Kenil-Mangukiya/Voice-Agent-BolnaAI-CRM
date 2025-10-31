import apiError from "./apiError.js";
import config from "../config/config.js";
import prisma from "../db/prisma.js";

/**
 * Validates common requirements for agent operations
 * @param userId - User ID from authenticated request
 * @returns Error response if validation fails, null if valid
 */
export const validateAgentRequest = (userId: string | undefined): { status: number; error: apiError } | null => {
    // Check if user is authenticated
    if (!userId) {
        return {
            status: 401,
            error: new apiError(401, "User not authenticated", [], "")
        };
    }

    // Check if Bolna AI API key is configured
    if (!config.bolnaAiApiKey) {
        return {
            status: 500,
            error: new apiError(500, "Bolna AI API key is not configured", [], "")
        };
    }

    return null; // All validations passed
};

/**
 * Validates agent ownership and existence
 * @param agentId - Agent ID to check
 * @param userId - User ID to verify ownership
 * @returns Agent object if valid, null with error if invalid
 */
export const validateAgentOwnership = async (
    agentId: string,
    userId: string
): Promise<{ agent: any } | { status: number; error: apiError }> => {
    // Find agent in database
    const agent = await prisma.agent.findUnique({
        where: { id: agentId },
        include: { user: true }
    });

    if (!agent) {
        return {
            status: 404,
            error: new apiError(404, "Agent not found", [], "")
        };
    }

    // Verify the agent belongs to the authenticated user
    if (agent.userId !== userId) {
        return {
            status: 403,
            error: new apiError(403, "You don't have permission to perform this action on this agent", [], "")
        };
    }

    return { agent };
};

/**
 * Validates agent configuration data
 * @param agent_config - Agent configuration object
 * @param agent_prompts - Agent prompts object
 * @returns Error response if validation fails, null if valid
 */
export const validateAgentData = (
    agent_config: any,
    agent_prompts: any
): { status: number; error: apiError } | null => {
    // Validation
    if (!agent_config || !agent_prompts) {
        return {
            status: 400,
            error: new apiError(400, "agent_config and agent_prompts are required", [], "")
        };
    }

    // Validate required agent_config fields
    if (!agent_config.agent_name || !agent_config.agent_type) {
        return {
            status: 400,
            error: new apiError(400, "agent_name and agent_type are required in agent_config", [], "")
        };
    }

    return null; // All validations passed
};

