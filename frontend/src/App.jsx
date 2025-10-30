import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import AgentsPage from './components/AgentsPage';
import CallsPage from './components/CallsPage';
import AnalyticsPage from './components/AnalyticsPage';
import CRMPage from './components/CRMPage';
import InvoicingPage from './components/InvoicingPage';
import SettingsPage from './components/SettingsPage';
import TeamPage from './components/TeamPage';
import SupportPage from './components/SupportPage';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage isActive={true} />;
      case 'agents':
        return <AgentsPage isActive={true} />;
      case 'calls':
        return <CallsPage isActive={true} />;
      case 'analytics':
        return <AnalyticsPage isActive={true} />;
      case 'crm':
        return <CRMPage isActive={true} />;
      case 'invoicing':
        return <InvoicingPage isActive={true} />;
      case 'settings':
        return <SettingsPage isActive={true} />;
      case 'team':
        return <TeamPage isActive={true} />;
      case 'support':
        return <SupportPage isActive={true} />;
      default:
        return <DashboardPage isActive={true} />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
