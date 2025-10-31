import React from "react";
import GradientSlider from "./GradientSlider";

interface LLMTabProps {
  data: any;
  onChange: (data: any) => void;
}

export const LLMTab = ({ data, onChange }: LLMTabProps) => {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-6 text-gray-900">LLM Configuration</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="llm-model" className="text-base font-semibold text-gray-900 block mb-2">Model</label>
            <select
              id="llm-model"
              value={data.llmModel || "azure"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ llmModel: e.target.value })}
              className="w-full h-12 bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
            >
              <option value="azure">Azure</option>
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
              <option value="gemini">Google Gemini</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="llm-variant" className="text-base font-semibold text-gray-900 block mb-2">Model Variant</label>
            <select
              id="llm-variant"
              value={data.llmVariant || "gpt-4.1-mini-claude"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ llmVariant: e.target.value })}
              className="w-full h-12 bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
            >
              <option value="gpt-4.1-mini-claude">gpt-4.1 mini claude</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <GradientSlider
          label="Tokens generated on each LLM output"
          value={data.tokens || 450}
          onChange={(value: number) => onChange({ tokens: value })}
          min={50}
          max={1000}
          step={50}
          unit=" tokens"
          description="Increasing tokens enables longer responses for richer AI-craft but increases latency"
        />
      </div>

      <div className="space-y-3">
        <GradientSlider
          label="Temperature"
          value={data.temperature || 0.2}
          onChange={(value: number) => onChange({ temperature: value })}
          min={0}
          max={1}
          step={0.1}
          description="Increasing temperature enables heightened creativity, but increases chance of deviation from prompt"
        />
      </div>

      <div className="space-y-2">
        <label className="text-base font-semibold text-gray-900 block mb-2">Add knowledge base</label>
        <select
          value={data.knowledgeBase || "none"}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ knowledgeBase: e.target.value })}
          className="w-full h-12 bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
        >
          <option value="none">None</option>
          <option value="custom">Custom Knowledge Base</option>
        </select>
      </div>
    </div>
  );
};
