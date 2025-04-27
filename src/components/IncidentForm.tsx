import React, { useState } from 'react';
import { Incident } from '../types/incident';

type IncidentFormProps = {
  onSubmit: (incident: Omit<Incident, 'id' | 'reportedDate'>) => void;
};

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<Incident, 'id' | 'reportedDate'>>({
    title: '',
    description: '',
    severity: 'Medium'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        severity: 'Medium'
      });
      setIsFormVisible(false);
    }
  };

  return (
    <div className={`incident-form-container ${isFormVisible ? 'visible' : ''}`}>
      {!isFormVisible ? (
        <button 
          className="btn-primary toggle-form-btn"
          onClick={() => setIsFormVisible(true)}
        >
          <i className="icon-plus"></i> Report New Incident
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="incident-form">
          <h3>
            <i className="icon-alert-triangle"></i>
            Report New AI Safety Incident
          </h3>
          
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="severity">Severity</label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <i className="icon-send"></i> Submit Report
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setIsFormVisible(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default IncidentForm;