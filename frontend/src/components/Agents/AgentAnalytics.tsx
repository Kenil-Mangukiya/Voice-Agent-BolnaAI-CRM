import React, { useState } from 'react';

const AgentAnalytics = ({ agent }) => {
  const [analyticsSettings, setAnalyticsSettings] = useState({
    summarization: true,
    extraction: false,
    customPrompt: '',
    webhookEnabled: false,
    webhookUrl: ''
  });

  const handleChange = (field, value) => {
    setAnalyticsSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2>Analytics Configuration</h2>
          <p>Configure post-call analytics and webhook integration</p>
        </div>
        <button className="btn btn-primary">Save Settings</button>
      </div>

      <div className="settings-section">
        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Post call tasks</label>
            <p>Configure tasks to be performed after each call completes</p>
          </div>
          <div style={{ width: '100%' }}>
            <label className="toggle-switch-setting" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                checked={analyticsSettings.summarization}
                onChange={(e) => handleChange('summarization', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span>Summarization</span>
            </label>
            <label className="toggle-switch-setting" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="checkbox"
                checked={analyticsSettings.extraction}
                onChange={(e) => handleChange('extraction', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span>Extraction</span>
            </label>
          </div>
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Custom Analytics Prompt</label>
            <p>Define a custom prompt for analytics extraction. Use variables like {`{user_name}`} and {`{payment_mode}`} in your prompt</p>
          </div>
          <textarea
            className="setting-textarea"
            rows="6"
            value={analyticsSettings.customPrompt}
            onChange={(e) => handleChange('customPrompt', e.target.value)}
            placeholder={`Example: Extract user_name and payment_mode from the conversation. User name: {user_name}, Payment mode: {payment_mode}`}
            style={{ width: '100%' }}
          />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Available variables: user_name, payment_mode, call_reason, and other custom variables
          </p>
        </div>

        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
            <label>Webhook integration</label>
            <p>Configure webhook to receive execution data</p>
          </div>
          <div style={{ width: '100%' }}>
            <label className="toggle-switch-setting" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                checked={analyticsSettings.webhookEnabled}
                onChange={(e) => handleChange('webhookEnabled', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span>Push all execution data to webhook</span>
            </label>
            {analyticsSettings.webhookEnabled && (
              <div style={{ marginLeft: '3rem', marginTop: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                  Agent webhook URL
                </label>
                <input
                  type="url"
                  className="setting-input"
                  value={analyticsSettings.webhookUrl}
                  onChange={(e) => handleChange('webhookUrl', e.target.value)}
                  placeholder="https://yourapi.com/webhook"
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

export default AgentAnalytics;
