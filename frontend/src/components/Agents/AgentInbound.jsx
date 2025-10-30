import React, { useState } from 'react';

const AgentInbound = ({ agent }) => {
  const [inboundSettings, setInboundSettings] = useState({
    matchIncomingCalls: false,
    dataSource: '',
    allowOnlyFromDatabase: false,
    maxCallsPerNumber: 1,
    alwaysAllowList: ''
  });

  const handleChange = (field, value) => {
    setInboundSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2>Inbound Settings</h2>
          <p>Configure inbound call handling and spam prevention</p>
        </div>
        <button className="btn btn-primary">Save Settings</button>
      </div>

      <div className="settings-section">
        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Inbound agent settings</label>
            <p>Configure how incoming calls are matched and processed</p>
          </div>
          <div style={{ width: '100%' }}>
            <label className="toggle-switch-setting" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                checked={inboundSettings.matchIncomingCalls}
                onChange={(e) => handleChange('matchIncomingCalls', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span>Match incoming calls to users and preload data</span>
            </label>
            
            {inboundSettings.matchIncomingCalls && (
              <div style={{ marginLeft: '3rem', marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                  Select data source
                </label>
                <select
                  className="setting-input"
                  value={inboundSettings.dataSource}
                  onChange={(e) => handleChange('dataSource', e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="">Select data source</option>
                  <option value="crm">CRM Database</option>
                  <option value="csv">CSV File</option>
                  <option value="api">API Endpoint</option>
                  <option value="database">External Database</option>
                </select>
              </div>
            )}

            <label className="toggle-switch-setting" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="checkbox"
                checked={inboundSettings.allowOnlyFromDatabase}
                onChange={(e) => handleChange('allowOnlyFromDatabase', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span>Allow incoming phone calls only from the chosen database</span>
            </label>
          </div>
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Spam Prevention Settings</label>
            <p>Configure spam prevention and call rate limiting</p>
          </div>
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                Maximum calls allowed per phone number
              </label>
              <input
                type="number"
                className="setting-input"
                value={inboundSettings.maxCallsPerNumber}
                onChange={(e) => handleChange('maxCallsPerNumber', parseInt(e.target.value) || 0)}
                min="-1"
                style={{ width: '100%' }}
              />
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Enter -1 to allow unlimited calls.
              </p>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                Always-allow list
              </label>
              <textarea
                className="setting-textarea"
                rows="4"
                value={inboundSettings.alwaysAllowList}
                onChange={(e) => handleChange('alwaysAllowList', e.target.value)}
                placeholder="Enter phone numbers (one per line) that should always be allowed to call"
                style={{ width: '100%' }}
              />
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Enter phone numbers one per line. These numbers will bypass spam prevention limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentInbound;
