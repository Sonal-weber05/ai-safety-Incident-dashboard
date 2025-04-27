export type Incident = {
    id: string;
    title: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
    reportedDate: string;
  };