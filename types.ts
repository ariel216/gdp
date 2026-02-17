
export type ViewType = 
  | 'dashboard' 
  | 'inbox' 
  | 'pending'
  | 'outbox' 
  | 'users' 
  | 'entities'
  | 'offices' 
  | 'reports' 
  | 'reports-generator'
  | 'settings' 
  | 'create-process' 
  | 'create-document'
  | 'doc-detail' 
  | 'search' 
  | 'roadmaps' 
  | 'records' 
  | 'register-correspondence' 
  | 'tracking'
  | 'procurement'
  | 'providers';

export interface Entity {
  id: string;
  name: string;
  sigla: string;
  type: 'Pública' | 'Privada' | 'Descentralizada' | 'Autárquica';
  address: string;
  phone: string;
  officeCount: number;
  status: 'Activo' | 'Inactivo';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  office: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  avatar?: string;
}

export interface Document {
  id: string;
  nuri: string;
  title: string;
  type: string;
  sender: string;
  originOffice: string;
  status: string;
  priority: 'Baja' | 'Media' | 'Alta' | 'Urgente';
  date: string;
  daysDelay?: number;
}
