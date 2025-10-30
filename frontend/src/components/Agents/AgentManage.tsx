import React, { useState } from 'react';
import AgentSidebar from './AgentSidebar';
import AgentDetail from './AgentDetail';
import AgentLLM from './AgentLLM';
import AgentAudio from './AgentAudio';
import AgentEngine from './AgentEngine';
import AgentCall from './AgentCall';
import AgentTools from './AgentTools';
import AgentAnalytics from './AgentAnalytics';
import AgentInbound from './AgentInbound';

const AgentManage = ({ agent, onBack, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('detail');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{agent.name}</h1>
          <p>Manage and configure this agent.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '250px 1fr', 
        gap: '0',
        marginTop: '2rem',
        borderTop: '1px solid var(--border-color)'
      }}>
        <AgentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="main-content" style={{ padding: '2rem', borderLeft: '1px solid var(--border-color)' }}>
          {activeTab === 'detail' && <AgentDetail agent={agent} onUpdate={onUpdate} />}
          {activeTab === 'llm' && <AgentLLM agent={agent} />}
          {activeTab === 'audio' && <AgentAudio agent={agent} />}
          {activeTab === 'engine' && <AgentEngine agent={agent} />}
          {activeTab === 'call' && <AgentCall agent={agent} />}
          {activeTab === 'tools' && <AgentTools agent={agent} />}
          {activeTab === 'analytics' && <AgentAnalytics agent={agent} />}
          {activeTab === 'inbound' && <AgentInbound agent={agent} />}
        </div>
      </div>
    </div>
  );
};

export default AgentManage;
