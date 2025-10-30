import React, { useState } from 'react';

const AgentAudio = ({ agent }) => {
  const [audioSettings, setAudioSettings] = useState({
    language: 'Hindi',
    provider: 'Deepgram',
    model: 'nova-2',
    keywords: 'JEE: 20, Medical: 20, NEET: 20, Engineering: 20',
    voiceProvider: 'Elevenlabs',
    voiceModel: 'eleven_turbo_v2_5',
    voice: 'Saira - Young Casual Voice',
    bufferSize: 181,
    speedRate: 1
  });

  const handleChange = (field, value) => {
    setAudioSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2>Audio Configuration</h2>
          <p>Configure voice and audio transcription settings</p>
        </div>
        <button className="btn btn-primary">Save Settings</button>
      </div>

      <div className="settings-section">
        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Select language and transcriber</label>
            <p>Configure the language and transcription provider</p>
          </div>
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Language</label>
              <select
                className="setting-input"
                value={audioSettings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Bengali">Bengali</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Provider</label>
              <input
                className="setting-input"
                type="text"
                value={audioSettings.provider}
                readOnly
                style={{ width: '100%', backgroundColor: 'var(--bg-secondary)' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Model</label>
              <input
                className="setting-input"
                type="text"
                value={audioSettings.model}
                onChange={(e) => handleChange('model', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Keywords</label>
              <input
                className="setting-input"
                type="text"
                value={audioSettings.keywords}
                onChange={(e) => handleChange('keywords', e.target.value)}
                placeholder="JEE: 20, Medical: 20, NEET: 20, Engineering: 20"
                style={{ width: '100%' }}
              />
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Boosting keywords helps improve recognition accuracy for specific terms important to your use case
              </p>
            </div>
          </div>
        </div>

        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Select voice</label>
            <p>Choose the voice provider and voice model</p>
          </div>
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Provider</label>
              <input
                className="setting-input"
                type="text"
                value={audioSettings.voiceProvider}
                readOnly
                style={{ width: '100%', backgroundColor: 'var(--bg-secondary)' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Model</label>
              <input
                className="setting-input"
                type="text"
                value={audioSettings.voiceModel}
                onChange={(e) => handleChange('voiceModel', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Voice</label>
              <input
                className="setting-input"
                type="text"
                value={audioSettings.voice}
                onChange={(e) => handleChange('voice', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => alert('Voice selection feature coming soon!')}
            >
              More voices
            </button>
          </div>
        </div>

        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Buffer Size</label>
            <p>Audio buffer configuration</p>
          </div>
          <input
            type="number"
            className="setting-input"
            value={audioSettings.bufferSize}
            onChange={(e) => handleChange('bufferSize', parseInt(e.target.value) || 0)}
            style={{ width: '100%' }}
          />
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Speed rate</label>
            <p>Speech rate multiplier</p>
          </div>
          <input
            type="number"
            className="setting-input"
            value={audioSettings.speedRate}
            onChange={(e) => handleChange('speedRate', parseFloat(e.target.value) || 1)}
            step="0.1"
            min="0.5"
            max="2"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentAudio;
