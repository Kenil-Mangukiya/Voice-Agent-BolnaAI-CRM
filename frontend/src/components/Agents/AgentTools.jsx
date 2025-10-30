import React, { useState } from 'react';

const AgentTools = ({ agent }) => {
  const [tools, setTools] = useState([]);

  return (
    <div>
      <div className="section-header">
        <div>
          <h2>Function Tools</h2>
          <p>Configure external tools and API integrations</p>
        </div>
        <button className="btn btn-primary">Save Settings</button>
      </div>

      <div className="settings-section">
        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Function Tools for LLM Models</label>
            <p>Connect external tools or APIs that your language model can call during conversations</p>
          </div>
          <button 
            type="button"
            className="btn btn-secondary"
            onClick={() => alert('Select functions feature coming soon!')}
          >
            Select functions
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentTools;
