import { useState } from "react";
import { Check, FileText, Settings, Brain, Headphones, Phone, Play, Wrench, BarChart3, PhoneIncoming, Bot } from "lucide-react";
import { AgentTab } from "./AgentTab";
import { LLMTab } from "./LLMTab";
import { AudioTab } from "./AudioTab";
import { EngineTab } from "./EngineTab";
import { CallTab } from "./CallTab";
import { ToolsTab } from "./ToolsTab";
import { AnalyticsTab } from "./AnalyticsTab";

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

  const currentTabIndex = tabs.findIndex((tab) => tab.id === currentTab);
  const progressPercentage = ((currentTabIndex + 1) / tabs.length) * 100;

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
    
    setValidationErrors({});
    markTabComplete(currentTab);
    const nextIndex = currentTabIndex + 1;
    if (nextIndex < tabs.length) {
      setCurrentTab(tabs[nextIndex].id);
    }
  };

  const handleSave = () => {
    const agent = {
      id: Date.now().toString(),
      name: agentData.name || "New Agent",
      useCase: agentData.useCase || "Custom Agent",
      status: "active" as const,
    };
    onSave(agent);
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
              if (data.name && validationErrors.name) {
                setValidationErrors({ ...validationErrors, name: undefined });
              }
              if (data.prompt && validationErrors.prompt) {
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
            onChange={(data: any) => setAgentData({ ...agentData, ...data })}
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
            <span>{currentTabIndex + 1} of {tabs.length}</span>
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
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg min-w-[120px] hover:bg-green-700 transition-all duration-200 hover:scale-[1.02]"
              >
                Save Agent
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
