import React, { useState } from 'react';

const AgentEngine = ({ agent }) => {
  const [engineSettings, setEngineSettings] = useState({
    generatePreciseTranscript: true,
    wordsBeforeInterrupt: 2,
    responseRate: 'Balanced',
    checkUserOnline: false,
    invokeMessageAfter: 30
  });

  const handleChange = (field, value) => {
    setEngineSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2>Engine Configuration</h2>
          <p>Configure conversation engine behavior and settings</p>
        </div>
        <button className="btn btn-primary">Save Settings</button>
      </div>

      <div className="settings-section">
        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Transcription & Interruptions</label>
            <p>Configure transcription accuracy and interruption handling</p>
          </div>
          <div style={{ width: '100%' }}>
            <label className="toggle-switch-setting" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                checked={engineSettings.generatePreciseTranscript}
                onChange={(e) => handleChange('generatePreciseTranscript', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span>Generate precise transcript</span>
            </label>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginLeft: '3rem' }}>
              Agent will try to generate more precise transcripts during interruptions
            </p>
          </div>
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Number of words to wait before interrupting</label>
            <p>Agent will not consider interruptions until these many words are spoken by the user</p>
          </div>
          <input
            type="number"
            className="setting-input"
            value={engineSettings.wordsBeforeInterrupt}
            onChange={(e) => handleChange('wordsBeforeInterrupt', parseInt(e.target.value) || 0)}
            min="1"
            style={{ width: '100%' }}
          />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Agent will not consider interruptions until these many words are spoken by the user
          </p>
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Voice Response Rate Configuration</label>
            <p>Configure the response rate for voice interactions</p>
          </div>
          <select
            className="setting-input"
            value={engineSettings.responseRate}
            onChange={(e) => handleChange('responseRate', e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="Rapid">Rapid</option>
            <option value="Balanced">Balanced</option>
            <option value="Slow">Slow</option>
          </select>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Rapid mode reduces latency but may affect accuracy. Balanced provides optimal performance. Slow mode prioritizes accuracy over speed.
          </p>
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>User Online Detection</label>
            <p>Configure user presence detection settings</p>
          </div>
          <div style={{ width: '100%' }}>
            <label className="toggle-switch-setting" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                checked={engineSettings.checkUserOnline}
                onChange={(e) => handleChange('checkUserOnline', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span>Check if user is online</span>
            </label>
            {engineSettings.checkUserOnline && (
              <div style={{ marginLeft: '3rem', marginTop: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                  Invoke message after (seconds)
                </label>
                <input
                  type="number"
                  className="setting-input"
                  value={engineSettings.invokeMessageAfter}
                  onChange={(e) => handleChange('invokeMessageAfter', parseInt(e.target.value) || 0)}
                  style={{ width: '100%' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentEngine;
