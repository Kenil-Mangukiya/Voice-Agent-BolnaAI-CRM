import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import config from "../config/config.js";
import axios from "axios";
import { validateAgentRequest } from "../utils/agentValidation.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

        console.log(`Fetched ${response.data?.data?.length || 0} voices from Bolna`);
        
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

// Import all voices from Bolna AI into our database
const importAllVoices = asyncHandler(async (req: any, res: any) => {
    const userId = req.userId;
    
    // Validate common requirements
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    try {
        // Fetch all voices from Bolna AI
        const response = await axios.get(
            `${config.bolnaAiUrl}/me/voices`,
            {
                headers: {
                    'Authorization': `Bearer ${config.bolnaAiApiKey}`
                }
            }
        );

        const voices = response.data?.data || [];
        console.log(`Importing ${voices.length} voices into database...`);

        let importedCount = 0;
        let skippedCount = 0;

        // Use upsert to import or update each voice
        for (const voice of voices) {
            try {
                await prisma.agent_Voice.upsert({
                    where: { bolnaVoiceId: voice.id },
                    update: {
                        provider: voice.provider,
                        name: voice.name,
                        model: voice.model,
                        voice_id: voice.voice_id,
                        accent: voice.accent || '',
                        language_code: voice.language_code || null
                    },
                    create: {
                        bolnaVoiceId: voice.id,
                        provider: voice.provider,
                        name: voice.name,
                        model: voice.model,
                        voice_id: voice.voice_id,
                        accent: voice.accent || '',
                        language_code: voice.language_code || null
                    }
                });
                importedCount++;
            } catch (error: any) {
                console.error(`Error importing voice ${voice.id}:`, error.message);
                skippedCount++;
            }
        }

        console.log(`Import complete: ${importedCount} imported, ${skippedCount} skipped`);
        
        return res.status(200).json(new apiResponse(200, "Voices imported successfully", {
            total: voices.length,
            imported: importedCount,
            skipped: skippedCount
        }));
    } catch (error: any) {
        console.error('Error importing voices:', error);
        
        if (error.response) {
            const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to import voices';
            const statusCode = error.response.status || 500;
            return res.status(statusCode).json(new apiError(statusCode, errorMessage, [], ""));
        } else if (error.request) {
            return res.status(503).json(new apiError(503, "No response from Bolna AI service", [], ""));
        } else {
            return res.status(500).json(new apiError(500, error.message || "Error setting up request to Bolna AI", [], ""));
        }
    }
});

// Get all voices from our database (much faster than Bolna API)
const getAllVoicesFromDB = asyncHandler(async (req: any, res: any) => {
    const userId = req.userId;
    
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    try {
        const voices = await prisma.agent_Voice.findMany({
            orderBy: { name: 'asc' }
        });

        return res.status(200).json(new apiResponse(200, "Voices fetched successfully", { data: voices }));
    } catch (error: any) {
        console.error('Error fetching voices from DB:', error);
        return res.status(500).json(new apiError(500, "Failed to fetch voices from database", [], ""));
    }
});

// Add a voice to user's collection
const addUserVoice = asyncHandler(async (req: any, res: any) => {
    const userId = req.userId;
    const { agentVoiceId } = req.body;
    
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    if (!agentVoiceId) {
        return res.status(400).json(new apiError(400, "agentVoiceId is required", [], ""));
    }

    try {
        // Check if voice exists in Agent_Voice table
        const voice = await prisma.agent_Voice.findUnique({
            where: { id: agentVoiceId }
        });

        if (!voice) {
            return res.status(404).json(new apiError(404, "Voice not found", [], ""));
        }

        // Add voice to user's collection
        await prisma.userVoice.create({
            data: {
                userId: userId,
                agentVoiceId: agentVoiceId
            }
        });

        return res.status(200).json(new apiResponse(200, "Voice added successfully", null));
    } catch (error: any) {
        // Handle unique constraint violation (already added)
        if (error.code === 'P2002') {
            return res.status(409).json(new apiError(409, "Voice already added", [], ""));
        }
        console.error('Error adding voice:', error);
        return res.status(500).json(new apiError(500, "Failed to add voice", [], ""));
    }
});

// Remove a voice from user's collection
const removeUserVoice = asyncHandler(async (req: any, res: any) => {
    const userId = req.userId;
    const { agentVoiceId } = req.params;
    
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    try {
        await prisma.userVoice.deleteMany({
            where: {
                userId: userId,
                agentVoiceId: agentVoiceId
            }
        });

        return res.status(200).json(new apiResponse(200, "Voice removed successfully", null));
    } catch (error: any) {
        console.error('Error removing voice:', error);
        return res.status(500).json(new apiError(500, "Failed to remove voice", [], ""));
    }
});

// Get user's selected voices
const getUserVoices = asyncHandler(async (req: any, res: any) => {
    const userId = req.userId;
    
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    try {
        const userVoices = await prisma.userVoice.findMany({
            where: { userId: userId },
            include: {
                agentVoice: true
            }
        });

        // Transform to match the format expected by frontend
        const voices = userVoices.map((uv) => ({
            id: uv.agentVoice.bolnaVoiceId,
            agentVoiceId: uv.agentVoice.id, // Add the internal database ID
            provider: uv.agentVoice.provider,
            name: uv.agentVoice.name,
            model: uv.agentVoice.model,
            voice_id: uv.agentVoice.voice_id,
            accent: uv.agentVoice.accent,
            language_code: uv.agentVoice.language_code
        }));

        return res.status(200).json(new apiResponse(200, "User voices fetched successfully", { data: voices }));
    } catch (error: any) {
        console.error('Error fetching user voices:', error);
        return res.status(500).json(new apiError(500, "Failed to fetch user voices", [], ""));
    }
});

// Generate TTS audio preview
const generateTTSPreview = asyncHandler(async (req: any, res: any) => {
    const userId = req.userId;
    const { provider, provider_config, text } = req.body;
    
    // Validate common requirements
    const validationError = validateAgentRequest(userId);
    if (validationError) {
        return res.status(validationError.status).json(validationError.error);
    }

    // Validate required fields
    if (!provider || !provider_config || !text) {
        return res.status(400).json(new apiError(400, "provider, provider_config, and text are required", [], ""));
    }

    if (!provider_config.model || !provider_config.voice_id || !provider_config.voice) {
        return res.status(400).json(new apiError(400, "provider_config must include model, voice_id, and voice", [], ""));
    }

    try {
        // Make POST request to Bolna AI TTS API
        const response = await axios.post(
            `${config.bolnaAiUrl}/user/tts_sample`,
            {
                provider: provider,
                provider_config: provider_config,
                text: text
            },
            {
                headers: {
                    'Authorization': `Bearer ${config.bolnaAiApiKey}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer' // Important: This handles binary audio data
            }
        );

        // Send the audio data back to frontend
        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Length': response.data.length
        });
        
        return res.status(200).send(response.data);
    } catch (error: any) {
        console.error('Error generating TTS preview:', error);
        
        // Handle axios errors
        if (error.response) {
            const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to generate audio preview';
            const statusCode = error.response.status || 500;
            return res.status(statusCode).json(new apiError(statusCode, errorMessage, [], ""));
        } else if (error.request) {
            return res.status(503).json(new apiError(503, "No response from Bolna AI service", [], ""));
        } else {
            return res.status(500).json(new apiError(500, error.message || "Error setting up request to Bolna AI", [], ""));
        }
    }
});

export { listAgentVoices, importAllVoices, getAllVoicesFromDB, addUserVoice, removeUserVoice, getUserVoices, generateTTSPreview };