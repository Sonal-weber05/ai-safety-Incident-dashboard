import { Incident } from './types/incident';

// Generate mock incidents for development
export const generateMockIncidents = (count: number): Incident[] => {
  const severities: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];
  const mockTitles = [
    'Model Bias Detected',
    'Unauthorized Data Access',
    'Algorithmic Fairness Issue',
    'Security Vulnerability',
    'Performance Degradation',
    'Ethical Concern Reported',
    'User Privacy Breach',
    'Inappropriate Content Generation',
    'System Failure',
    'Bias in Training Data'
  ];
  
  const mockDescriptions = [
    'The model showed significant bias against certain demographic groups during testing.',
    'Unauthorized access to sensitive user data was detected in the logs.',
    'Algorithm was found to be unfairly favoring certain outcomes over others.',
    'Security vulnerability could allow injection attacks on the API.',
    'Performance has degraded by more than 20% since last deployment.',
    'Ethical concerns were raised about the potential misuse of this technology.',
    'User privacy was compromised due to insufficient data anonymization.',
    'System generated inappropriate content when prompted with certain inputs.',
    'Complete system failure occurred during peak load testing.',
    'Training data was found to contain significant sampling bias.'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `mock-${i}-${Date.now()}`,
    title: mockTitles[i % mockTitles.length],
    description: mockDescriptions[i % mockDescriptions.length],
    severity: severities[i % severities.length],
    reportedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Debounce function for performance optimization
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<F>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Local storage helper functions
export const saveToLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// Severity level utilities
export const getSeverityColor = (severity: 'Low' | 'Medium' | 'High'): string => {
  const colors = {
    Low: '#2ecc71',
    Medium: '#f39c12',
    High: '#e74c3c'
  };
  return colors[severity];
};

export const getSeverityLevel = (score: number): 'Low' | 'Medium' | 'High' => {
  if (score >= 7) return 'High';
  if (score >= 4) return 'Medium';
  return 'Low';
};