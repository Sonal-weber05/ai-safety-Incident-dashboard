import React, { useState } from 'react';
import { Incident } from '../types/incident';

type IncidentItemProps = {
  incident: Incident;
};

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const severityClass = `severity-${incident.severity.toLowerCase()}`;
  const reportedDate = new Date(incident.reportedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <li className={`incident-item ${severityClass} ${isExpanded ? 'expanded' : ''}`}>
      <div className="incident-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="severity-indicator"></div>
        <h3 className="incident-title">{incident.title}</h3>
        <span className="incident-date">{reportedDate}</span>
        <button className="toggle-details">
          {isExpanded ? (
            <i className="icon-chevron-up"></i>
          ) : (
            <i className="icon-chevron-down"></i>
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="incident-details">
          <div className="description">
            <h4>Description:</h4>
            <p>{incident.description}</p>
          </div>
          <div className="actions">
            <button className="btn-secondary">
              <i className="icon-edit"></i> Edit
            </button>
            <button className="btn-secondary">
              <i className="icon-flag"></i> Escalate
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default IncidentItem;