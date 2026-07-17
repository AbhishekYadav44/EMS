// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'HR_MANAGER' | 'EMPLOYEE';
  profileImage?: string;
  department?: string;
  designation?: string;
  phone?: string;
  salary?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Employee Types
export interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  role: 'SUPER_ADMIN' | 'HR_MANAGER' | 'EMPLOYEE';
  status: 'ACTIVE' | 'INACTIVE';
  reportingManager?: string | null;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  role: 'SUPER_ADMIN' | 'HR_MANAGER' | 'EMPLOYEE';
  status: 'ACTIVE' | 'INACTIVE';
}

// Dashboard Types
export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  departmentCount: number;
}

// Organization Hierarchy
export interface OrgNode {
  id: string;
  name: string;
  designation: string;
  department: string;
  role: string;
  children?: OrgNode[];
}
