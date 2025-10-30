import React from 'react';

const AgentSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'detail', label: 'Agent Detail' },
    { key: 'llm', label: 'LLM' },
    { key: 'audio', label: 'Audio' },
    { key: 'engine', label: 'Engine' },
    { key: 'call', label: 'Call' },
    { key: 'tools', label: 'Tools' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'inbound', label: 'Inbound' }
  ];

  return (
    <aside className="sidebar" style={{ borderRight: 'none', padding: '1rem 0' }}>
      <ul className="sidebar-menu">
        {tabs.map((t) => (
          <li
            key={t.key}
            className={`menu-item ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            <span>{t.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AgentSidebar;
