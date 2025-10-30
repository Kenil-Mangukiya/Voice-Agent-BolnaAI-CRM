import React, { useState } from 'react';

const AgentCall = ({ agent }) => {
  const [callSettings, setCallSettings] = useState({
    telephonyProvider: 'Plivo',
    voicemailDetection: true,
    timeToAnalyzeVoicemail: 2.5,
    hangupOnSilence: false,
    hangupSilenceTime: 15,
    hangupUsingPrompt: false,
    hangupPrompt: 'I notice you haven\'t responded in a while. Is there anything else I can help you with?',
    hangupMessage: 'Call will now disconnect',
    callTermination: 600
  });

  const handleChange = (field, value) => {
    setCallSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2>Call Configuration</h2>
          <p>Configure telephony and call handling settings</p>
        </div>
        <button className="btn btn-primary">Save Settings</button>
      </div>

      <div className="settings-section">
        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Telephony Provider</label>
            <p>Select the telephony provider for making and receiving calls</p>
          </div>
          <select
            className="setting-input"
            value={callSettings.telephonyProvider}
            onChange={(e) => handleChange('telephonyProvider', e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="Plivo">Plivo</option>
            <option value="Twilio">Twilio</option>
            <option value="Vonage">Vonage</option>
          </select>
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Voicemail detection</label>
            <p>Enable automatic detection and handling of voicemail responses</p>
          </div>
          <label className="toggle-switch-setting" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              checked={callSettings.voicemailDetection}
              onChange={(e) => handleChange('voicemailDetection', e.target.checked)}
            />
            <span className="toggle-slider"></span>
            <span>Enable voicemail detection</span>
          </label>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginLeft: '3rem' }}>
            When enabled, the agent will detect when a call goes to voicemail and handle it appropriately
          </p>
        </div>

        {callSettings.voicemailDetection && (
          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>Time to analyze voicemail</label>
              <p>Duration in seconds to wait before analyzing voicemail</p>
            </div>
            <input
              type="number"
              className="setting-input"
              value={callSettings.timeToAnalyzeVoicemail}
              onChange={(e) => handleChange('timeToAnalyzeVoicemail', parseFloat(e.target.value) || 0)}
              step="0.1"
              min="0"
              style={{ width: '100%' }}
            />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              2.5 seconds
            </p>
          </div>
        )}

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Call hangup modes</label>
            <p>Configure how calls should be terminated</p>
          </div>
          <div style={{ width: '100%' }}>
            <label className="toggle-switch-setting" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                checked={callSettings.hangupOnSilence}
                onChange={(e) => handleChange('hangupOnSilence', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span>Hangup calls on user silence</span>
            </label>
            {callSettings.hangupOnSilence && (
              <div style={{ marginLeft: '3rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                  Time (seconds)
                </label>
                <input
                  type="number"
                  className="setting-input"
                  value={callSettings.hangupSilenceTime}
                  onChange={(e) => handleChange('hangupSilenceTime', parseInt(e.target.value) || 0)}
                  style={{ width: '100%' }}
                />
              </div>
            )}

            <label className="toggle-switch-setting" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                checked={callSettings.hangupUsingPrompt}
                onChange={(e) => handleChange('hangupUsingPrompt', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span>Hangup calls using a prompt</span>
            </label>
            {callSettings.hangupUsingPrompt && (
              <div style={{ marginLeft: '3rem', marginBottom: '1rem' }}>
                <textarea
                  className="setting-textarea"
                  rows="4"
                  value={callSettings.hangupPrompt}
                  onChange={(e) => handleChange('hangupPrompt', e.target.value)}
                  placeholder="Enter the hangup prompt..."
                  style={{ width: '100%' }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Call hangup message</label>
            <p>Message to display when call is being terminated</p>
          </div>
          <textarea
            className="setting-textarea"
            rows="3"
            value={callSettings.hangupMessage}
            onChange={(e) => handleChange('hangupMessage', e.target.value)}
            placeholder="Call will now disconnect"
            style={{ width: '100%' }}
          />
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Call Termination</label>
            <p>Maximum call duration in seconds before automatic termination</p>
          </div>
          <input
            type="number"
            className="setting-input"
            value={callSettings.callTermination}
            onChange={(e) => handleChange('callTermination', parseInt(e.target.value) || 0)}
            min="60"
            style={{ width: '100%' }}
          />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            600 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentCall;
