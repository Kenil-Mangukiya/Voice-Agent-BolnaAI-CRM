import React, { useEffect, useMemo, useState } from "react";
import { Play } from "lucide-react";
import GradientSlider from "./GradientSlider";

interface AudioTabProps {
  data: any;
  onChange: (data: any) => void;
}

// Define language codes based on the provided images
const LANGUAGE_CODES: Record<string, string> = {
  "English (India)": "en-IN",
  "English (UK)": "en-GB",
  "English (US)": "en-US",
  "English": "en-US", // Default for assembly
  "Dutch": "nl-NL",
  "French": "fr-FR",
  "Malay": "ms-MY",
  "Indonesian": "id-ID",
  "Vietnamese": "vi-VN",
  "Thai": "th-TH",
  "Spanish": "es-ES",
  "Portuguese (Portugal)": "pt-PT",
  "Hindi": "hi-IN",
  "Bengali": "bn-IN",
  "Tamil": "ta-IN",
  "Telugu": "te-IN",
  "Gujarati": "gu-IN",
  "Kannada": "kn-IN",
  "Malayalam": "ml-IN",
  "Marathi": "mr-IN",
  "Punjabi": "pa-IN",
  "Odia": "or-IN",
  "English + French": "multi-fr",
  "English + Hindi": "multi-hi",
  "English + Spanish": "multi-es",
};

// Define models for each provider
const PROVIDER_MODELS: Record<string, { value: string; label: string }[]> = {
  azure: [
    { value: "azure", label: "Azure" },
  ],
  deepgram: [
    { value: "nova-2", label: "nova-2" },
  ],
  google: [
    { value: "latest_long", label: "latest_long" },
  ],
  assembly: [
    { value: "universal", label: "universal" },
  ],
  sarvam: [
    { value: "saaras:v2.5", label: "saaras:v2.5" },
    { value: "saarika:v2.5", label: "saarika:v2.5" },
  ],
};

// Define default models for each provider
const DEFAULT_MODELS: Record<string, string> = {
  azure: "azure",
  deepgram: "nova-2",
  google: "latest_long",
  assembly: "universal",
  sarvam: "saaras:v2.5",
};

// Define languages for each provider
const PROVIDER_LANGUAGES: Record<string, string[]> = {
  google: [
    "English (India)",
  ],
  deepgram: [
    "English (UK)",
    "English (India)",
    "English (US)",
    "English + French",
    "English + Hindi",
    "English + Spanish",
  ],
  azure: [
    "Dutch",
    "French",
    "Malay",
    "Indonesian",
    "Vietnamese",
    "Thai",
    "Spanish",
    "Portuguese (Portugal)",
  ],
  sarvam: [
    "English (India)",
    "Hindi",
    "Bengali",
    "Tamil",
    "Telugu",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Marathi",
    "Punjabi",
    "Odia",
  ],
  assembly: [
    "English",
  ],
};

// Default language for each provider
const DEFAULT_LANGUAGES: Record<string, string> = {
  google: "English (India)",
  deepgram: "English (India)",
  azure: "Dutch",
  sarvam: "English (India)",
  assembly: "English",
};

export const AudioTab = ({ data, onChange }: AudioTabProps) => {
  const currentProvider = data.languageProvider || "deepgram";
  const currentLanguage = data.language || DEFAULT_LANGUAGES[currentProvider];

  // Get available models for the current provider
  const availableModels = useMemo(() => {
    return PROVIDER_MODELS[currentProvider] || [];
  }, [currentProvider]);

  // Get available languages for the current provider
  const availableLanguages = useMemo(() => {
    return PROVIDER_LANGUAGES[currentProvider] || [];
  }, [currentProvider]);

  // When provider changes, update the model and language to the defaults for that provider
  useEffect(() => {
    const defaultModel = DEFAULT_MODELS[currentProvider];
    const defaultLanguage = DEFAULT_LANGUAGES[currentProvider];
    
    // Update model if not set or if current model is not available for new provider
    if (!data.languageModel || !availableModels.some(m => m.value === data.languageModel)) {
      if (defaultModel) {
        onChange({ languageModel: defaultModel });
      }
    }
    
    // Update language if not set or if current language is not available for new provider
    if (!data.language || !availableLanguages.includes(data.language)) {
      if (defaultLanguage) {
        onChange({ language: defaultLanguage });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProvider, availableModels, availableLanguages]);

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvider = e.target.value;
    const defaultModel = DEFAULT_MODELS[newProvider];
    const defaultLanguage = DEFAULT_LANGUAGES[newProvider];
    
    onChange({ 
      languageProvider: newProvider,
      languageModel: defaultModel,
      language: defaultLanguage,
    });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    const languageCode = LANGUAGE_CODES[selectedLanguage];
    
    onChange({ 
      language: selectedLanguage,
      languageCode: languageCode,
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Agent Audio Configuration</h3>
        <h4 className="text-base font-semibold mb-4 text-gray-700">Select language and transcriber</h4>
        <div className="space-y-4">
          {/* Language Provider - FIRST FIELD */}
          <div>
            <label htmlFor="language-provider" className="text-sm font-semibold text-gray-900 block mb-2">Language Provider</label>
            <select
              id="language-provider"
              value={currentProvider}
              onChange={handleProviderChange}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] mt-1.5"
            >
              <option value="deepgram">Deepgram</option>
              <option value="azure">Azure</option>
              <option value="google">Google</option>
              <option value="sarvam">Sarvam</option>
              <option value="assembly">Assembly</option>
            </select>
          </div>

          {/* Model - SECOND FIELD */}
          <div>
            <label htmlFor="language-model" className="text-sm font-semibold text-gray-900 block mb-2">Model</label>
            <select
              id="language-model"
              value={data.languageModel || DEFAULT_MODELS[currentProvider]}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ languageModel: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] mt-1.5"
            >
              {availableModels.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language - THIRD FIELD */}
          <div>
            <label htmlFor="language" className="text-sm font-semibold text-gray-900 block mb-2">Language</label>
            <select
              id="language"
              value={currentLanguage}
              onChange={handleLanguageChange}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] mt-1.5"
            >
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Keywords - Only shown for Deepgram provider */}
          {currentProvider === "deepgram" && (
            <div>
              <label htmlFor="keywords" className="text-sm font-semibold text-gray-900 block mb-2">Keywords</label>
              <input
                id="keywords"
                type="text"
                placeholder="Bruce-100"
                value={data.keywords || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ keywords: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] placeholder:text-gray-400 mt-1.5"
              />
              <p className="text-xs text-gray-600 mt-1.5">
                Enter certain keyword(s)/proper nouns you'd want to boost while understanding user speech
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Select voice</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="voice-provider" className="text-sm font-semibold text-gray-900 block mb-2">Provider</label>
            <select
              id="voice-provider"
              value={data.voiceProvider || "elevenlabs"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ voiceProvider: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] mt-1.5"
            >
              <option value="elevenlabs">ElevenLabs</option>
              <option value="azure">Azure</option>
              <option value="google">Google</option>
            </select>
          </div>

          <div>
            <label htmlFor="voice-model" className="text-sm font-semibold text-gray-900 block mb-2">Model</label>
            <select
              id="voice-model"
              value={data.voiceModel || "eleven-turbo-v2_5"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ voiceModel: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] mt-1.5"
            >
              <option value="eleven-turbo-v2_5">eleven_turbo_v2_5</option>
              <option value="eleven-multilingual">eleven_multilingual</option>
            </select>
          </div>

          <div>
            <label htmlFor="voice" className="text-sm font-semibold text-gray-900 block mb-2">Voice</label>
            <div className="flex gap-2 mt-1.5">
              <select
                id="voice"
                value={data.voice || "wendy"}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ voice: e.target.value })}
                className="flex-1 bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
              >
                <option value="wendy">Wendy</option>
                <option value="alice">Alice</option>
                <option value="bob">Bob</option>
              </select>
              <button className="w-10 h-10 rounded-full bg-[#4F46E5] text-white flex items-center justify-center hover:bg-[#4338CA] transition-all duration-200 hover:scale-110">
                <Play className="h-4 w-4 ml-0.5" />
              </button>
            </div>
          </div>

          <div>
            <GradientSlider
              label="Buffer Size"
              value={data.bufferSize || 250}
              onChange={(value: number) => onChange({ bufferSize: value })}
              min={1}
              max={400}
              step={1}
              description="Increasing buffer size enables agent to retain more utterance but increases latency"
            />
          </div>

          <div>
            <GradientSlider
              label="Speed rate"
              value={data.speedRate || 1}
              onChange={(value: number) => onChange({ speedRate: value })}
              min={0.7}
              max={1.2}
              step={0.05}
              description="The speed controls helps you adjust how fast or slow you want the agent speaks"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
