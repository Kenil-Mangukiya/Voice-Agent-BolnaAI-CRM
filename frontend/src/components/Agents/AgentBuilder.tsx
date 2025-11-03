import { useState } from "react";
import { Check, FileText, Settings, Brain, Headphones, Phone, Play, Wrench, BarChart3, PhoneIncoming, Bot } from "lucide-react";
import { AgentTab } from "./AgentTab";
import { LLMTab } from "./LLMTab";
import { AudioTab } from "./AudioTab";
import { EngineTab } from "./EngineTab";
import { CallTab } from "./CallTab";
import { ToolsTab } from "./ToolsTab";
import { AnalyticsTab } from "./AnalyticsTab";
import { createAgent } from "../../services/apis/agentAPI";

interface AgentBuilderProps {
  mode: "scratch" | "template";
  onClose: () => void;
  onSave: (agent: any) => void;
}

type TabId = "agent" | "llm" | "audio" | "engine" | "call" | "tools" | "analytics";

interface Tab {
  id: TabId;
  label: string;
  completed: boolean;
  icon?: any;
}

const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const AgentBuilder = ({ mode, onClose, onSave }: AgentBuilderProps) => {
  const [currentTab, setCurrentTab] = useState<TabId>("agent");
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "agent", label: "Agent", completed: false, icon: FileText },
    { id: "llm", label: "LLM", completed: false, icon: Brain },
    { id: "audio", label: "Audio", completed: false, icon: Headphones },
    { id: "engine", label: "Engine", completed: false, icon: Settings },
    { id: "call", label: "Call", completed: false, icon: Phone },
    { id: "tools", label: "Tools", completed: false, icon: Wrench },
    { id: "analytics", label: "Analytics", completed: false, icon: BarChart3 },
  ]);

  const [agentData, setAgentData] = useState<any>({
    welcomeMessage: "Hello this is a demo call from Yogreet LLM"
  });
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const currentTabIndex = tabs.findIndex((tab) => tab.id === currentTab);
  const completedCount = tabs.filter((tab) => tab.completed).length;
  const progressPercentage = (completedCount / tabs.length) * 100;
  const displayStep = `${completedCount} of ${tabs.length}`;

  const markTabComplete = (tabId: TabId) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === tabId ? { ...tab, completed: true } : tab))
    );
  };

  const handleNext = () => {
    // Validate fields based on current tab
    if (currentTab === "agent") {
      const errors: any = {};
      if (!agentData.name || agentData.name.trim() === "") {
        errors.name = "Agent name is required";
      }
      if (!agentData.prompt || agentData.prompt.trim() === "") {
        errors.prompt = "Prompt is required";
      }
      
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
    }
    
    if (currentTab === "audio") {
      const errors: any = {};
      if (!agentData.selectedVoiceId || agentData.selectedVoiceId.trim() === "") {
        errors.voice = "Voice is required";
      }
      
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
    }
    
    setValidationErrors({});
    markTabComplete(currentTab);
    const nextIndex = currentTabIndex + 1;
    if (nextIndex < tabs.length) {
      setCurrentTab(tabs[nextIndex].id);
    }
  };

  const handleSave = async () => {
    // Validate required fields
    const errors: any = {};
    if (!agentData.name || !agentData.name.trim()) {
      errors.name = "Agent name is required";
    }
    if (!agentData.prompt || !agentData.prompt.trim()) {
      errors.prompt = "Prompt is required";
    }
    if (!agentData.selectedVoiceId || !agentData.selectedVoiceId.trim()) {
      errors.voice = "Voice selection is required";
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // Navigate to the audio tab if voice is missing
      if (errors.voice) {
        setCurrentTab("audio");
      }
      return;
    }

    setIsSaving(true);

    try {
      // Build agent_config
      const agent_config = {
        agent_name: agentData.name.trim(),
        agent_welcome_message: agentData.welcomeMessage || "Hello this is a demo call from Yogreet LLM",
        agent_type: agentData.useCase || "other",
        webhook_url: agentData.webhookUrl || null,
        tasks: [
          {
            task_type: "conversation",
            toolchain: {
              execution: "parallel",
              pipelines: [
                ["transcriber", "llm", "synthesizer"]
              ]
            },
            task_config: {
              generate_precise_transcript: agentData.generatePreciseTranscript || false,
              number_of_words_for_interruption: agentData.interruptionThreshold ?? 5,
              check_if_user_online: agentData.userOnlineCheck !== false,
              check_user_online_message: agentData.onlineMessage || "Hey, are you still there",
              trigger_user_online_message_after: agentData.invokeAfter ?? 10,
              call_terminate: agentData.callDuration ?? 300,
              hangup_after_silence: agentData.hangupOnSilence ? agentData.hangupTime : null,
              call_hangup_message: agentData.hangupPrompt || null,
              voicemail_detection_time: agentData.voicemailDetection ? agentData.voicemailTime : null,
              voicemail: agentData.voicemailDetection || false,
              use_fillers: false,
              dtmf_enabled: false,
              ambient_noise: false,
              inbound_limit: -1,
              backchanneling: false,
              optimize_latency: true,
              incremental_delay: 200,
              hangup_after_LLMCall: false,
            },
            tools_config: {
              input: {
                format: "wav",
                provider: agentData.telephonyProvider || "plivo"
              },
              output: {
                format: "wav",
                provider: agentData.telephonyProvider || "plivo"
              },
              api_tools: agentData.selectedTools || null,
              llm_agent: {
                agent_type: "simple_llm_agent",
                agent_flow_type: "streaming",
                llm_config: {
                  provider: agentData.llmModel || "openai",
                  model: agentData.llmVariant || "gpt-4o-mini",
                  temperature: agentData.temperature || 0.7,
                  max_tokens: agentData.tokens || 4096,
                  top_p: 0.9,
                  top_k: 0,
                  min_p: 0.1,
                  presence_penalty: 0,
                  frequency_penalty: 0,
                  family: agentData.llmModel || "openai",
                  request_json: false,
                  agent_flow_type: "streaming",
                  ...(agentData.customAnalyticsList && agentData.customAnalyticsList.length > 0 && {
                    custom_analytics: agentData.customAnalyticsList
                  })
                }
              },
              synthesizer: {
                stream: true,
                caching: true,
                provider: (() => {
                  // Normalize provider name - Bolna API expects lowercase
                  return (agentData.voiceProvider || "elevenlabs").toLowerCase();
                })(),
                buffer_size: agentData.bufferSize || 400,
                audio_format: "wav",
                provider_config: (() => {
                  const provider = (agentData.voiceProvider || "elevenlabs").toLowerCase();
                  
                  switch (provider) {
                    case 'elevenlabs':
                      // ElevenLabs format with dynamic values
                      return {
                        model: agentData.voiceModel || "eleven_turbo_v2_5",
                        speed: agentData.speedRate || 1.0,
                        voice: agentData.voice || "",
                        voice_id: agentData.voiceId || "",
                        temperature: agentData.voiceTemperature || 0.5,
                        similarity_boost: agentData.similarityBoost || 0.5
                      };
                    case 'rime':
                      // Rime uses ONLY voice_id and model
                      return {
                        voice_id: agentData.voiceId || "",
                        model: agentData.voiceModel || ""
                      };
                    case 'polly':
                      // Polly format
                      return {
                        voice: agentData.voice || "",
                        language: agentData.languageCode || "en-US",
                        engine: agentData.voiceModel || "neural",
                        speed: agentData.speedRate || 1.0
                      };
                    case 'azuretts':
                    case 'google':
                    case 'deepgram':
                    case 'sarvam':
                    case 'smallest':
                      const config: any = {
                        voice_id: agentData.voiceId || ""
                      };
                      if (agentData.speedRate && agentData.speedRate !== 1.0) {
                        config.speed = agentData.speedRate;
                      }
                      return config;
                    case 'inworld':
                      const inworldConfig: any = {
                        voice: agentData.voice || ""
                      };
                      if (agentData.speedRate && agentData.speedRate !== 1.0) {
                        inworldConfig.speed = agentData.speedRate;
                      }
                      return inworldConfig;
                    default:
                      // Default to ElevenLabs format
                      return {
                        model: agentData.voiceModel || "eleven_turbo_v2_5",
                        speed: agentData.speedRate || 1.0,
                        voice: agentData.voice || "",
                        voice_id: agentData.voiceId || "",
                        temperature: agentData.voiceTemperature || 0.5,
                        similarity_boost: agentData.similarityBoost || 0.5
                      };
                  }
                })()
              },
              transcriber: {
                task: "transcribe",
                model: agentData.languageModel || "nova-2",
                stream: true,
                encoding: "linear16",
                keywords: agentData.keywords || "",
                language: agentData.languageCode || "en-IN",
                provider: agentData.languageProvider || "deepgram",
                endpointing: 100,
                sampling_rate: 16000
              }
            }
          }
        ]
      };

      // Build agent_prompts
      const agent_prompts = {
        task_1: {
          system_prompt: agentData.prompt
        }
      };

      // Call the API
      const payload = {
        agent_config,
        agent_prompts
      };

      // Debug: Log the payload structure
      console.log('Sending agent creation payload:', JSON.stringify(payload, null, 2));
      console.log('Agent name:', agent_config.agent_name);
      console.log('Agent type:', agent_config.agent_type);
      console.log('Voice Provider:', agentData.voiceProvider);
      console.log('Synthesizer Config:', JSON.stringify({
        provider: agent_config.tasks[0].tools_config.synthesizer.provider,
        provider_config: agent_config.tasks[0].tools_config.synthesizer.provider_config,
        buffer_size: agent_config.tasks[0].tools_config.synthesizer.buffer_size
      }, null, 2));

      const response = await createAgent(payload as any);
      console.log('Agent created successfully:', response);
      
      // Extract agent data from response
      // Backend returns: { success, statusCode, message, data: { id, bolnaAgentId, agentName, ... } }
      // API interceptor already extracts response.data, so response is the full backend response
      const agentResponseData = response?.data || {};
      
      // Call the onSave callback with the response
      onSave({
        id: agentResponseData.id || agentResponseData.bolnaAgentId || Date.now().toString(),
        name: agentResponseData.agentName || agentData.name,
        useCase: agentResponseData.agentType || agentData.useCase || "other",
        status: (agentResponseData.status || "active") as "active" | "inactive",
      });
    } catch (error: any) {
      console.error('Error creating agent:', error);
      alert(error.message || 'Failed to create agent. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case "agent":
        return (
          <AgentTab
            data={agentData}
            onChange={(data: any) => {
              setAgentData({ ...agentData, ...data });
              // Clear validation errors when user types
              if (data.hasOwnProperty('name') && validationErrors.name) {
                setValidationErrors({ ...validationErrors, name: undefined });
              }
              if (data.hasOwnProperty('prompt') && validationErrors.prompt) {
                setValidationErrors({ ...validationErrors, prompt: undefined });
              }
            }}
            errors={validationErrors}
          />
        );
      case "llm":
        return (
          <LLMTab
            data={agentData}
            onChange={(data: any) => setAgentData({ ...agentData, ...data })}
          />
        );
      case "audio":
        return (
          <AudioTab
            data={agentData}
            onChange={(data: any) => {
              setAgentData({ ...agentData, ...data });
              // Clear validation errors when user selects a voice
              if (data.hasOwnProperty('selectedVoiceId') && validationErrors.voice) {
                setValidationErrors({ ...validationErrors, voice: undefined });
              }
            }}
            onClose={onClose}
            errors={validationErrors}
          />
        );
      case "engine":
        return (
          <EngineTab
            data={agentData}
            onChange={(data: any) => setAgentData({ ...agentData, ...data })}
          />
        );
      case "call":
        return (
          <CallTab
            data={agentData}
            onChange={(data: any) => setAgentData({ ...agentData, ...data })}
          />
        );
      case "tools":
        return (
          <ToolsTab
            data={agentData}
            onChange={(data: any) => setAgentData({ ...agentData, ...data })}
          />
        );
      case "analytics":
        return (
          <AnalyticsTab
            data={agentData}
            onChange={(data: any) => setAgentData({ ...agentData, ...data })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full min-h-[700px] bg-white">
      {/* Vertical Sidebar Navigation */}
      <div className="w-64 border-r border-gray-200 bg-gray-50 p-6 flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {agentData.name && <Bot className="h-5 w-5 text-[#4F46E5]" />}
            <h2 className="text-xl font-bold text-gray-900">
              {agentData.name || "Agent Setup"}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{displayStep}</span>
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4F46E5] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          {tabs.map((tab, index) => {
            const isActive = currentTab === tab.id;
            const isPast = index < currentTabIndex;
            const isClickable = tab.completed || isActive;
            
            return (
              <button
                key={tab.id}
                onClick={() => isClickable && setCurrentTab(tab.id)}
                disabled={!isClickable}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden",
                  isActive && "bg-[#4F46E5] text-white shadow-lg scale-105",
                  !isActive && tab.completed && "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer",
                  !isActive && !tab.completed && isPast && "bg-gray-100 text-gray-700 opacity-50 cursor-not-allowed",
                  !isActive && !tab.completed && !isPast && "bg-white text-gray-600 opacity-30 cursor-not-allowed"
                )}
              >
                {/* Completion indicator */}
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  isActive && "bg-white/20 text-white",
                  !isActive && tab.completed && "bg-green-500 text-white",
                  !isActive && !tab.completed && "bg-gray-300 text-gray-600"
                )}>
                  {tab.completed ? (
                    <Check className="h-5 w-5" />
                  ) : tab.icon ? (
                    <tab.icon className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>

                {/* Label */}
                <span className={cn(
                  "font-medium transition-all duration-300",
                  isActive && "font-semibold"
                )}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            Complete all steps to create your agent
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl">
            {renderTabContent()}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between items-center max-w-3xl">
            <button
              onClick={() => currentTabIndex > 0 && setCurrentTab(tabs[currentTabIndex - 1].id)}
              disabled={currentTabIndex === 0}
              className={cn(
                "px-6 py-3 font-medium rounded-lg transition-all duration-200",
                currentTabIndex > 0 
                  ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#4F46E5]" 
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              Previous Step
            </button>
            {currentTabIndex < tabs.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[#4F46E5] text-white font-semibold rounded-lg shadow-lg hover:bg-[#4338CA] transition-all duration-200 hover:scale-[1.02] min-w-[120px]"
              >
                Next Step
              </button>
            ) : (
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg min-w-[120px] hover:bg-green-700 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Agent"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
