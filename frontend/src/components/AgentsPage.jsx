import React, { useState } from 'react';
import AgentList from './Agents/AgentList';
import AgentForm from './Agents/AgentForm';
import AgentManage from './Agents/AgentManage';

const AgentsPage = ({ isActive }) => {
  const [mode, setMode] = useState('list'); // list | form | manage
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Roadside Helper',
      role: 'Roadside Assistance',
      status: 'Active',
      languages: ['English', 'Hindi'],
      goal: 'Assist customers with roadside emergencies',
      nextSteps: 'Dispatch service provider',
      faqs: '',
      transcript: ''
    }
  ]);

  const handleAddAgent = () => setMode('form');

  const handleSaveAgent = (agentData) => {
    const newAgent = {
      id: agents.length + 1,
      ...agentData,
      status: 'Active'
    };
    const updatedAgents = [...agents, newAgent];
    setAgents(updatedAgents);
    setSelectedAgent(newAgent);
    setMode('manage');
  };

  const handleOpenAgent = (agent) => {
    setSelectedAgent(agent);
    setMode('manage');
  };

  const handleBack = () => {
    setMode('list');
    setSelectedAgent(null);
  };

  const handleUpdateAgent = (updatedAgent) => {
    setAgents(agents.map(a => a.id === updatedAgent.id ? updatedAgent : a));
    setSelectedAgent(updatedAgent);
  };

  return (
    <div className={`page-content ${isActive ? 'active' : ''}`}>
      {mode === 'list' && (
        <AgentList 
          agents={agents} 
          onAdd={handleAddAgent} 
          onOpen={handleOpenAgent} 
        />
      )}
      {mode === 'form' && (
        <>
          <AgentList 
            agents={agents} 
            onAdd={handleAddAgent} 
            onOpen={handleOpenAgent} 
          />
          <AgentForm 
            onCancel={handleBack} 
            onSave={handleSaveAgent} 
            isModal={true}
          />
        </>
      )}
      {mode === 'manage' && selectedAgent && (
        <AgentManage 
          agent={selectedAgent} 
          onBack={handleBack}
          onUpdate={handleUpdateAgent}
        />
      )}
    </div>
  );
};

export default AgentsPage;