import React, { useState } from 'react';
import { Incident } from '../types/incident';
import IncidentItem from './IncidentItem';
import FilterControls from './FilterControls';
import SortControls from './SortControls';

type IncidentListProps = {
    incidents: Incident[];
    onUpdateIncident: (id: string, updatedIncident: Partial<Incident>) => void;
    onDeleteIncident: (id: string) => void;
  };



const IncidentList: React.FC<IncidentListProps> = ({ incidents }) => {
  const [filter, setFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredIncidents = incidents.filter(incident => 
    filter === 'All' ? true : incident.severity === filter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reportedDate);
    const dateB = new Date(b.reportedDate);
    return sortOrder === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="incident-list-container">
      <div className="list-controls">
        <FilterControls currentFilter={filter} onFilterChange={setFilter} />
        <SortControls currentSort={sortOrder} onSortChange={setSortOrder} />
      </div>
      
      {sortedIncidents.length === 0 ? (
        <div className="no-incidents">
          <i className="icon-check-circle"></i>
          <p>No incidents found matching your criteria</p>
        </div>
      ) : (
        <ul className="incident-list">
          {sortedIncidents.map(incident => (
            <IncidentItem key={incident.id} incident={incident} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentList;