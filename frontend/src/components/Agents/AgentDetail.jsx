import React, { useState } from 'react';

const AgentDetail = ({ agent, onUpdate }) => {
  const [formData, setFormData] = useState({
    welcomeMessage: agent.welcomeMessage || 'Hello! Thank you for calling. How can I assist you today?',
    agentPrompt: agent.agentPrompt || agent.goal || '',
    promptVariables: {
      user_name: '',
      payment_mode: '',
      call_reason: ''
    }
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVariableChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      promptVariables: {
        ...prev.promptVariables,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    const updatedAgent = {
      ...agent,
      welcomeMessage: formData.welcomeMessage,
      agentPrompt: formData.agentPrompt
    };
    onUpdate(updatedAgent);
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2>Agent Detail</h2>
          <p>Configure agent welcome message and prompt settings</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      <div className="settings-section">
        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Agent Welcome Message</label>
            <p>The initial message the agent will say when a call starts</p>
          </div>
          <textarea
            className="setting-textarea"
            rows="4"
            value={formData.welcomeMessage}
            onChange={(e) => handleChange('welcomeMessage', e.target.value)}
            placeholder="Enter the welcome message for the agent"
            style={{ width: '100%' }}
          />
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Agent Prompt</label>
            <p>Define the system prompt that guides the agent's behavior and responses</p>
          </div>
          <textarea
            className="setting-textarea"
            rows="8"
            value={formData.agentPrompt}
            onChange={(e) => handleChange('agentPrompt', e.target.value)}
            placeholder="Enter the agent prompt that defines how it should behave..."
            style={{ width: '100%' }}
          />
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Prompt Variable Testing</label>
            <p>You can fill in your following prompt variables for testing</p>
          </div>
          
          <div style={{ width: '100%' }}>
            <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div className="setting-info" style={{ marginRight: 0, marginBottom: '0.5rem', width: '100%' }}>
                <label>user_name</label>
              </div>
              <input
                className="setting-input"
                type="text"
                value={formData.promptVariables.user_name}
                onChange={(e) => handleVariableChange('user_name', e.target.value)}
                placeholder="Enter user name"
                style={{ width: '100%' }}
              />
            </div>

            <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div className="setting-info" style={{ marginRight: 0, marginBottom: '0.5rem', width: '100%' }}>
                <label>payment_mode</label>
              </div>
              <input
                className="setting-input"
                type="text"
                value={formData.promptVariables.payment_mode}
                onChange={(e) => handleVariableChange('payment_mode', e.target.value)}
                placeholder="Enter payment mode"
                style={{ width: '100%' }}
              />
            </div>

            <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="setting-info" style={{ marginRight: 0, marginBottom: '0.5rem', width: '100%' }}>
                <label>call_reason</label>
              </div>
              <textarea
                className="setting-textarea"
                rows="3"
                value={formData.promptVariables.call_reason}
                onChange={(e) => handleVariableChange('call_reason', e.target.value)}
                placeholder="Enter call reason"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
