export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  severity: 'High' | 'Medium' | 'Low';
  type: string;
  source: string;
  timestamp: string;
  status: string;
}
