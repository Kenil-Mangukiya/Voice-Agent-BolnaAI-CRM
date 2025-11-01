import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import config from "../config/config.js";
import axios from "axios";
import { validateAgentRequest } from "../utils/agentValidation.js";

// Get all voices from Bolna AI API
const listAgentVoices = asyncHandler(async (req: any, res: any) => {
    // Get userId from authenticated request (set by authMiddleware)
    const userId = req.userId;
    
    // Validate common requirements (authentication, API key)
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    try {
        // Make GET request to Bolna AI API to fetch all voices
        const response = await axios.get(
            `${config.bolnaAiUrl}/me/voices`,
            {
                headers: {
                    'Authorization': `Bearer ${config.bolnaAiApiKey}`
                }
            }
        );

        console.log(`Fetched ${response.data?.length || 0} voices from Bolna`);
        
        return res.status(200).json(new apiResponse(200, "Voices fetched successfully", response.data || []));
    } catch (error: any) {
        console.error('Error fetching voices:', error);
        
        // Handle axios errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to fetch voices';
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

export { listAgentVoices };