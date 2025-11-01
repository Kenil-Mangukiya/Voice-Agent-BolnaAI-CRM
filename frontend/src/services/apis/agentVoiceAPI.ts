import api from '../../config/api';
import { getErrorDetails } from '../../utils/apiUtils';

/**
 * Voice API Service
 * Handles all voice-related API calls
 */

export interface BolnaVoice {
  id: string;
  voice_id: string;
  provider: string;
  name: string;
  model: string;
  accent: string;
}

export const getAllVoices = async (): Promise<BolnaVoice[]> => {
  try {
    const response: any = await api.get('/voice/list');
    console.log('Get all voices response:', response);
    
    // Check if response has the nested data property and it's an array
    if (response && response.data && response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    // Return empty array if data is not available or not an array
    return [];
  } catch (error) {
    throw getErrorDetails(error);
  }
};

export default {
  getAllVoices,
};
