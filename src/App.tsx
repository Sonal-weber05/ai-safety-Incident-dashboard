import React, { useState, useEffect } from 'react';
import './styles/main.css';
import './styles/animations.css';
import './styles/theme.css';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';
import { Incident } from './types/incident';
import { generateMockIncidents } from './utils';

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API call
        const mockIncidents = generateMockIncidents(5);
        setIncidents(mockIncidents);
      } catch (error) {
        console.error('Error loading incidents:', error);
      }
    };

    loadData();
  }, []);

  const addIncident = (newIncident: Omit<Incident, 'id' | 'reportedDate'>) => {
    const incident: Incident = {
      ...newIncident,
      id: generateId(),
      reportedDate: new Date().toISOString()
    };
    setIncidents([incident, ...incidents]);
  };

  const updateIncident = (id: string, updatedIncident: Partial<Incident>) => {
    setIncidents(incidents.map(inc => 
      inc.id === id ? { ...inc, ...updatedIncident } : inc
    ));
  };

  const deleteIncident = (id: string) => {
    setIncidents(incidents.filter(inc => inc.id !== id));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`app ${theme}-theme`}>
      <header className="app-header">
        <div className="header-content">
          <h1 className="title-with-icon">
            <i className="icon-shield"></i>
            AI Safety Incident Dashboard
          </h1>
          <p className="subtitle">Monitor and report AI system safety issues</p>
        </div>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <i className={`icon-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
        </button>
      </header>
      
      <main className="dashboard-container">
        <div className="controls-section">
          <IncidentForm onSubmit={addIncident} />
        </div>
        <div className="incidents-section">
          <IncidentList 
            incidents={incidents} 
            onUpdateIncident={updateIncident}
            onDeleteIncident={deleteIncident}
          />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} AI Safety Foundation. All incidents are confidential.</p>
        <p className="version">Version {process.env.REACT_APP_VERSION || '1.0.0'}</p>
      </footer>
    </div>
  );
};

// Helper function to generate unique IDs
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

export default App;