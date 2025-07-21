export interface User {
  id: string;
  username: string;
  type: 'supervisor' | 'admin' | 'accountant' | 'viewer';
  companies: string[];
}

export interface Company {
  id: string;
  name: string;
  database: string;
  status: 'active' | 'inactive';
}