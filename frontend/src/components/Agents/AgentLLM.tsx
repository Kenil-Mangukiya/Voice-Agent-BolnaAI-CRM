import React, { useState } from 'react';

const AgentLLM = ({ agent }) => {
  const [llmSettings, setLlmSettings] = useState({
    model: 'Azure',
    tokens: 408,
    temperature: 0.2,
    knowledgeBase: []
  });

  const handleChange = (field, value) => {
    setLlmSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2>LLM Configuration</h2>
          <p>Configure the language model settings for this agent</p>
        </div>
        <button className="btn btn-primary">Save Settings</button>
      </div>

      <div className="settings-section">
        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Choose LLM model</label>
            <p>Select the language model provider and model</p>
          </div>
          <select
            className="setting-input"
            value={llmSettings.model}
            onChange={(e) => handleChange('model', e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="Azure">Azure</option>
            <option value="gpt-4.1-mini cluster">gpt-4.1-mini cluster</option>
          </select>
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Tokens generated on each LLM output</label>
            <p>Increasing tokens enables longer responses from the language model</p>
          </div>
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              {llmSettings.tokens}
            </div>
            <input
              type="number"
              className="setting-input"
              value={llmSettings.tokens}
              onChange={(e) => handleChange('tokens', parseInt(e.target.value) || 0)}
              style={{ width: '100%' }}
            />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Increasing tokens enables longer responses from the language model
            </p>
          </div>
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Temperature</label>
            <p>Increasing temperature enables heightened creativity and variability in responses</p>
          </div>
          <div style={{ width: '100%' }}>
            <input
              type="number"
              className="setting-input"
              value={llmSettings.temperature}
              onChange={(e) => handleChange('temperature', parseFloat(e.target.value) || 0)}
              step="0.1"
              min="0"
              max="2"
              style={{ width: '100%' }}
            />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Increasing temperature enables heightened creativity and variability in responses
            </p>
          </div>
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Add knowledge base</label>
            <p>Connect external knowledge sources to enhance agent responses</p>
          </div>
          <div style={{ width: '100%', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => alert('Select Knowledge Base feature coming soon!')}
            >
              Select Knowledge Base
            </button>
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => alert('Add FAQs & Guardrails feature coming soon!')}
            >
              Add FAQs & Guardrails
            </button>
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => alert('Learn more about knowledge bases')}
            >
              Learn more
            </button>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Edit block for / Add a new block for FAQs & Guardrails
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentLLM;
