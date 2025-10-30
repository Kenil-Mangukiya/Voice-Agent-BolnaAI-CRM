import React from 'react';

const AgentList = ({ agents, onAdd, onOpen }) => {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Agents</h1>
          <p>Manage and create your AI Agents.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={onAdd}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Add Agent
          </button>
        </div>
      </div>``

      <div className="calls-table">
        <table>
          <thead>
            <tr>
              <th>Agent Name</th>
              <th>Use Case</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '3rem' }}>
                  <div className="empty-state">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <h3>No agents yet</h3>
                    <p>Create your first AI agent to get started</p>
                    <button className="btn btn-primary" onClick={onAdd}>
                      Create Agent
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              agents.map((agent) => (
                <tr key={agent.id}>
                  <td>
                    <div className="customer-cell">
                      <div className="customer-avatar">
                        {agent.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <div className="customer-name">{agent.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="issue-badge">{agent.role}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${agent.status === 'Active' ? 'status-completed' : 'status-missed'}`}>
                      {agent.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onOpen(agent)}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AgentList;
