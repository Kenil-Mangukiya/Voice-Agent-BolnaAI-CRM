import React from "react";
import { Play } from "lucide-react";
import GradientSlider from "./GradientSlider";

interface AudioTabProps {
  data: any;
  onChange: (data: any) => void;
}

export const AudioTab = ({ data, onChange }: AudioTabProps) => {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Agent Audio Configuration</h3>
        <h4 className="text-base font-semibold mb-4 text-gray-700">Select language and transcriber</h4>
        <div className="space-y-4">
          <div>
            <label htmlFor="language" className="text-sm font-semibold text-gray-900 block mb-2">Language</label>
            <select
              id="language"
              value={data.language || "english-india"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ language: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] mt-1.5"
            >
              <option value="english-india">English (India)</option>
              <option value="english-us">English (US)</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>

          <div>
            <label htmlFor="transcriber-provider" className="text-sm font-semibold text-gray-900 block mb-2">Provider</label>
            <select
              id="transcriber-provider"
              value={data.transcriberProvider || "deepgram"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ transcriberProvider: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] mt-1.5"
            >
              <option value="deepgram">Deepgram</option>
              <option value="whisper">Whisper</option>
              <option value="azure">Azure</option>
            </select>
          </div>

          <div>
            <label htmlFor="transcriber-model" className="text-sm font-semibold text-gray-900 block mb-2">Model</label>
            <select
              id="transcriber-model"
              value={data.transcriberModel || "nova-2"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ transcriberModel: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] mt-1.5"
            >
              <option value="nova-2">nova 2</option>
              <option value="nova">nova</option>
              <option value="base">base</option>
            </select>
          </div>

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
              value={data.bufferSize || 200}
              onChange={(value: number) => onChange({ bufferSize: value })}
              min={50}
              max={500}
              step={50}
              description="Increasing buffer size enables agent to retain more utterance but increases latency"
            />
          </div>

          <div>
            <GradientSlider
              label="Speed rate"
              value={data.speedRate || 1}
              onChange={(value: number) => onChange({ speedRate: value })}
              min={0.5}
              max={2}
              step={0.1}
              description="The speed controls helps you adjust how fast or slow you want the agent speaks"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
