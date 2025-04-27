import React from 'react';

type FilterControlsProps = {
  currentFilter: 'All' | 'Low' | 'Medium' | 'High';
  onFilterChange: (filter: 'All' | 'Low' | 'Medium' | 'High') => void;
};

const FilterControls: React.FC<FilterControlsProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-controls">
      <span className="control-label">
        <i className="icon-filter"></i>
        Filter by Severity:
      </span>
      <div className="filter-buttons">
        {(['All', 'Low', 'Medium', 'High'] as const).map(filter => (
          <button
            key={filter}
            className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
            {filter !== 'All' && (
              <span className={`severity-dot ${filter.toLowerCase()}`}></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterControls;