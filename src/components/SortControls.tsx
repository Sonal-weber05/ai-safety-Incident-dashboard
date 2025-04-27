import React from 'react';

type SortControlsProps = {
  currentSort: 'newest' | 'oldest';
  onSortChange: (sort: 'newest' | 'oldest') => void;
};

const SortControls: React.FC<SortControlsProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="sort-controls">
      <span className="control-label">
        <i className="icon-sort"></i>
        Sort by Date:
      </span>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest')}
        className="sort-select"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
};

export default SortControls;