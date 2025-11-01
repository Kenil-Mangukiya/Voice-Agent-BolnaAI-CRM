import React, { useState, useEffect } from 'react';
import { getAllVoices, type BolnaVoice } from '../services/apis/agentVoiceAPI';

interface VoiceLabPageProps {
  isActive: boolean;
}

const VoiceLabPage: React.FC<VoiceLabPageProps> = ({ isActive }) => {
  const [voices, setVoices] = useState<BolnaVoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isActive) {
      fetchVoices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const fetchVoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllVoices();
      setVoices(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch voices');
      console.error('Error fetching voices:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isActive ? 'block' : 'hidden'}`}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice Lab</h1>
          <p className="text-gray-600">Explore and test voices</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Voices Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voices.map((voice) => (
              <div
                key={voice.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{voice.name}</h3>
                    <p className="text-sm text-gray-600">{voice.accent}</p>
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                    {voice.provider}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Model:</span>
                    <span className="text-sm text-gray-900 ml-2">{voice.model}</span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">Voice ID:</span>
                    <span className="text-sm text-gray-900 ml-2">{voice.voice_id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && voices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No voices available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceLabPage;

