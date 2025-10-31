import React from "react";
import GradientSlider from "./GradientSlider";

interface CallTabProps {
  data: any;
  onChange: (data: any) => void;
}

export const CallTab = ({ data, onChange }: CallTabProps) => {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Call Configuration</h3>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Telephony Provider</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="telephony-provider" className="text-sm font-semibold text-gray-900 block mb-2">Provider</label>
            <select
              id="telephony-provider"
              value={data.telephonyProvider || "plivo"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ telephonyProvider: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] mt-1.5"
            >
              <option value="plivo">Plivo</option>
              <option value="twilio">Twilio</option>
              <option value="vonage">Vonage</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Voicemail detection</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-semibold text-gray-900 block">Automatically disconnect call on voicemail detection</label>
              <p className="text-xs text-gray-600 mt-1">
                Time allotted to analyze if the call has been answered by a machine. The default value is 2500 ms.
              </p>
            </div>
            <input
              type="checkbox"
              checked={data.voicemailDetection || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ voicemailDetection: e.target.checked })}
              className="h-5 w-5"
            />
          </div>

          <div>
            <GradientSlider
              label="Time (seconds)"
              value={data.voicemailTime || 2.5}
              onChange={(value: number) => onChange({ voicemailTime: value })}
              min={1}
              max={10}
              step={0.5}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Call hangup modes</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-semibold text-gray-900 block">Hangup calls on user silence</label>
              <p className="text-xs text-gray-600 mt-1">
                Call will hangup if the user is not speaking
              </p>
            </div>
            <input
              type="checkbox"
              checked={data.hangupOnSilence !== false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ hangupOnSilence: e.target.checked })}
              className="h-5 w-5"
            />
          </div>

          <div>
            <GradientSlider
              label="Time (seconds)"
              value={data.hangupTime || 10}
              onChange={(value: number) => onChange({ hangupTime: value })}
              min={5}
              max={60}
              step={5}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-semibold text-gray-900 block">Hangup calls using a prompt</label>
              <p className="text-xs text-gray-600 mt-1">
                Call will hangup as per the prompted prompt
              </p>
            </div>
            <input
              type="checkbox"
              checked={data.hangupOnPrompt || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ hangupOnPrompt: e.target.checked })}
              className="h-5 w-5"
            />
          </div>

          {data.hangupOnPrompt && (
            <div>
              <label htmlFor="hangup-prompt" className="text-sm font-semibold text-gray-900 block mb-2">Hangup Prompt</label>
              <textarea
                id="hangup-prompt"
                placeholder="You are an AI assistant determining if a conversation is complete..."
                value={data.hangupPrompt || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange({ hangupPrompt: e.target.value })}
                className="w-full min-h-[100px] bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] placeholder:text-gray-400 resize-y mt-1.5"
              />
            </div>
          )}

          <div>
            <label htmlFor="hangup-message" className="text-sm font-semibold text-gray-900 block mb-2">Call hangup message</label>
            <textarea
              id="hangup-message"
              placeholder="Call will now disconnect"
              value={data.hangupMessage || ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange({ hangupMessage: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] placeholder:text-gray-400 resize-none mt-1.5"
              rows={2}
            />
            <p className="text-xs text-gray-600 mt-1.5">
              Provide the final agent message just before hanging up
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Call Termination</h3>
        <div className="space-y-4">
          <div>
            <GradientSlider
              label="Time (seconds)"
              value={data.callDuration || 300}
              onChange={(value: number) => onChange({ callDuration: value })}
              min={60}
              max={600}
              step={30}
              description="The call ends after 300 seconds of call time"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
