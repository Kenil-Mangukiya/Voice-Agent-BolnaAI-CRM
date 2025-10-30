import React, { useState } from 'react';

const AgentForm = ({ onCancel, onSave, isModal = false }) => {
  const [agent, setAgent] = useState({
    name: '',
    languages: ['English'],
    goal: '',
    nextSteps: '',
    faqs: '',
    transcript: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agent.name.trim()) {
      alert('Please enter an agent name.');
      return;
    }
    if (!agent.goal.trim()) {
      alert('Please describe what you want to achieve in this call.');
      return;
    }
    if (!agent.nextSteps.trim()) {
      alert('Please describe the ideal next steps after this call.');
      return;
    }
    onSave(agent);
  };

  const handleLangToggle = (lang) => {
    setAgent((prev) => {
      const exists = prev.languages.includes(lang);
      return {
        ...prev,
        languages: exists
          ? prev.languages.filter((l) => l !== lang)
          : [...prev.languages, lang]
      };
    });
  };

  const handleChange = (field, value) => {
    setAgent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formContent = (
    <>
      <div className="modal-header">
        <div>
          <h2>Create Roadside Assistance Agent</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Select your use case and let AI build your agent.
          </p>
        </div>
        <button className="modal-close" onClick={onCancel}>
          ×
        </button>
      </div>

      <div style={{ padding: '0 2rem', marginBottom: '1.5rem' }}>
        <button 
          type="button"
          className="btn btn-primary" 
          style={{ marginRight: '1rem' }}
          onClick={(e) => {
            e.preventDefault();
            alert('Auto Build Agent feature coming soon!');
          }}
        >
          Auto Build Agent
        </button>
        <button 
          type="button"
          className="btn btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            alert('Pre-built Agents feature coming soon!');
          }}
        >
          Pre-built Agents
        </button>
      </div>

      <form onSubmit={handleSubmit} className="modal-form" style={{ paddingTop: 0 }}>
        <div className="settings-section" style={{ maxWidth: '100%', border: 'none', padding: '0 2rem' }}>
          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>Name of Agent *</label>
              <p>Give your agent a descriptive name</p>
            </div>
            <input
              className="setting-input"
              placeholder="Enter agent name"
              value={agent.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>Languages *</label>
              <p>Select the languages your agent should support</p>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', width: '100%' }}>
              {['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati'].map((lang) => (
                <label key={lang} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={agent.languages.includes(lang)}
                    onChange={() => handleLangToggle(lang)}
                  />
                  <span>{lang}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>What do you want to achieve in this call? *</label>
              <p>Be descriptive as you would to a human assistant</p>
            </div>
            <textarea
              className="setting-textarea"
              placeholder="Example: Help customers with roadside emergencies like flat tires, dead batteries, lockouts, and towing services. Collect accurate location, vehicle details, and insurance information..."
              rows="5"
              value={agent.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>Ideal Next Steps after this call *</label>
              <p>Describe what should happen after the call completes</p>
            </div>
            <textarea
              className="setting-textarea"
              placeholder="Example: Dispatch appropriate service provider (towing, tire repair, battery jumpstart) based on the issue. Send confirmation SMS with ETA and service provider details. Update CRM system with case details..."
              rows="4"
              value={agent.nextSteps}
              onChange={(e) => handleChange('nextSteps', e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>FAQs / Business Documents / Any information</label>
              <p>Add any relevant FAQs, policies, or documents that the agent should know</p>
            </div>
            <textarea
              className="setting-textarea"
              placeholder="Example: Q: What services do you provide? A: We provide 24/7 roadside assistance including tire changes, battery jumpstarts, lockout services, fuel delivery, and towing..."
              rows="6"
              value={agent.faqs}
              onChange={(e) => handleChange('faqs', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>Sample Transcript</label>
              <p>Provide a sample conversation to help the agent understand the tone and flow</p>
            </div>
            <textarea
              className="setting-textarea"
              placeholder="Example: Agent: Hello! Thank you for calling Roadside Assistance. How can I help you today? Customer: Hi, I have a flat tire. Agent: I understand. Can you please tell me your current location? Customer: I'm on Highway 101 near mile marker 45..."
              rows="6"
              value={agent.transcript}
              onChange={(e) => handleChange('transcript', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="modal-actions" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Generate Agent
            </button>
          </div>
        </div>
      </form>
    </>
  );

  if (isModal) {
    return (
      <div 
        className="modal" 
        style={{ display: 'flex' }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onCancel();
          }
        }}
      >
        <div className="modal-content" style={{ maxWidth: '900px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Create Roadside Assistance Agent</h1>
          <p>Select your use case and let AI build your agent.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button className="btn btn-primary" style={{ marginRight: '1rem' }}>
          Auto Build Agent
        </button>
        <button className="btn btn-secondary">Pre-built Agents</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="settings-section" style={{ maxWidth: '700px' }}>
          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>Name of Agent *</label>
              <p>Give your agent a descriptive name</p>
            </div>
            <input
              className="setting-input"
              placeholder="Enter agent name"
              value={agent.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>Languages *</label>
              <p>Select the languages your agent should support</p>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', width: '100%' }}>
              {['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati'].map((lang) => (
                <label key={lang} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={agent.languages.includes(lang)}
                    onChange={() => handleLangToggle(lang)}
                  />
                  <span>{lang}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>What do you want to achieve in this call? *</label>
              <p>Be descriptive as you would to a human assistant</p>
            </div>
            <textarea
              className="setting-textarea"
              placeholder="Example: Help customers with roadside emergencies like flat tires, dead batteries, lockouts, and towing services. Collect accurate location, vehicle details, and insurance information..."
              rows="5"
              value={agent.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>Ideal Next Steps after this call *</label>
              <p>Describe what should happen after the call completes</p>
            </div>
            <textarea
              className="setting-textarea"
              placeholder="Example: Dispatch appropriate service provider (towing, tire repair, battery jumpstart) based on the issue. Send confirmation SMS with ETA and service provider details. Update CRM system with case details..."
              rows="4"
              value={agent.nextSteps}
              onChange={(e) => handleChange('nextSteps', e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>FAQs / Business Documents / Any information</label>
              <p>Add any relevant FAQs, policies, or documents that the agent should know</p>
            </div>
            <textarea
              className="setting-textarea"
              placeholder="Example: Q: What services do you provide? A: We provide 24/7 roadside assistance including tire changes, battery jumpstarts, lockout services, fuel delivery, and towing..."
              rows="6"
              value={agent.faqs}
              onChange={(e) => handleChange('faqs', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="setting-info" style={{ marginRight: 0, marginBottom: '1rem', width: '100%' }}>
              <label>Sample Transcript</label>
              <p>Provide a sample conversation to help the agent understand the tone and flow</p>
            </div>
            <textarea
              className="setting-textarea"
              placeholder="Example: Agent: Hello! Thank you for calling Roadside Assistance. How can I help you today? Customer: Hi, I have a flat tire. Agent: I understand. Can you please tell me your current location? Customer: I'm on Highway 101 near mile marker 45..."
              rows="6"
              value={agent.transcript}
              onChange={(e) => handleChange('transcript', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Generate Agent
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgentForm;
