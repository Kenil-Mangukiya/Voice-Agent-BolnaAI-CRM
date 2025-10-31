import React, { useState } from "react";
import { X } from "lucide-react";

interface AnalyticsTabProps {
  data: any;
  onChange: (data: any) => void;
}

export const AnalyticsTab = ({ data, onChange }: AnalyticsTabProps) => {
  const [showModal, setShowModal] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    key: "",
    type: "freeflow",
    prompt: "",
  });

  const handleSaveAnalytics = () => {
    // Save logic here
    onChange({ customAnalytics: analyticsData });
    setShowModal(false);
    setAnalyticsData({ key: "", type: "freeflow", prompt: "" });
  };

  return (
    <>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Analytical Configuration</h3>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Post call tasks</h3>
        <p className="text-sm text-gray-600 mb-6">
          Choose tasks to get executed after the agent conversation is complete
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
            <div>
              <label className="font-medium text-gray-900 block">Summarization</label>
              <p className="text-sm text-gray-600 mt-1">
                Generate a summary of the conversation automatically
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={data.summarization || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ summarization: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#4F46E5] 
                            rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white 
                            after:rounded-full after:h-6 after:w-6 after:transition-all 
                            peer-checked:bg-[#4F46E5]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
            <div>
              <label className="font-medium text-gray-900 block">Extraction</label>
              <p className="text-sm text-gray-600 mt-1">
                Extract structured information from the conversation according to a custom prompt provided
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={data.extraction || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ extraction: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#4F46E5] 
                            rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white 
                            after:rounded-full after:h-6 after:w-6 after:transition-all 
                            peer-checked:bg-[#4F46E5]"></div>
            </label>
          </div>

          {data.extraction && (
            <div className="ml-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label htmlFor="extraction-prompt" className="text-sm font-semibold text-gray-900 block mb-2">Extraction Prompt</label>
              <input
                id="extraction-prompt"
                type="text"
                placeholder="Cost name : Valid the name of the user"
                value={data.extractionPrompt || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ extractionPrompt: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] placeholder:text-gray-400 mt-2"
              />
              <p className="text-xs text-gray-600 mt-2">
                If user is paying for card. Card. Cost yield: NA
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Custom Analytics</h3>
        <p className="text-sm text-gray-600 mb-6">
          Add call tasks to extract data from the call
        </p>

        <div className="border-t border-gray-200 pt-4">
          <button 
            onClick={() => setShowModal(true)}
            className="text-sm text-[#4F46E5] hover:underline"
          >
            + Extract custom analytics
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Push all execution data to webhook</h3>
        <p className="text-sm text-gray-600 mb-4">
          Automatically receive all execution data for this agent using webhook
        </p>

        <div>
          <label htmlFor="webhook-url" className="text-sm font-semibold text-gray-900 block mb-2">Your webhook URL</label>
          <input
            id="webhook-url"
            type="url"
            placeholder="https://your-webhook-url.com"
            value={data.webhookUrl || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ webhookUrl: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] placeholder:text-gray-400 mt-1.5"
          />
        </div>
      </div>
    </div>

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
        <div className="bg-white rounded-xl border border-gray-200 shadow-xl max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Extract custom analytics</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="analytics-key" className="text-sm font-semibold text-gray-900 block mb-2">
                  Key for this analytics <span className="text-gray-600 font-normal">(Added as a separate column)</span>
                </label>
                <input
                  id="analytics-key"
                  type="text"
                  placeholder="e.g. 'sentiment_score'"
                  value={analyticsData.key}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnalyticsData({ ...analyticsData, key: e.target.value })}
                  className="w-full bg-white border border-[#4F46E5] rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] placeholder:text-gray-400"
                />
              </div>

              <div>
                <label htmlFor="analytics-type" className="text-sm font-semibold text-gray-900 block mb-2">Analytics Type</label>
                <select
                  id="analytics-type"
                  value={analyticsData.type}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAnalyticsData({ ...analyticsData, type: e.target.value })}
                  className="w-full h-12 bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
                >
                  <option value="freeflow">Freeflow (default)</option>
                  <option value="structured">Structured</option>
                </select>
              </div>

              <div>
                <label htmlFor="analytics-prompt" className="text-sm font-semibold text-gray-900 block mb-2">Prompt for this analytics</label>
                <textarea
                  id="analytics-prompt"
                  placeholder="e.g. 'Analyze the sentiment of the conversation and provide a score from -1 to 1. Only reply with score, either 1 or -1.'"
                  value={analyticsData.prompt}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnalyticsData({ ...analyticsData, prompt: e.target.value })}
                  className="w-full min-h-[120px] bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] placeholder:text-gray-400 resize-y"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAnalytics}
                className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};
