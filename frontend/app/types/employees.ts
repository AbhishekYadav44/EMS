export interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  role: string;
  status: string;
  joiningDate: string;
  isDeleted: boolean;
  reportingManager?: string;
}

export interface EmployeeResponse {
  success: boolean;
  totalEmployees: number;
  currentPage: number;
  totalPages: number;
  employees: Employee[];
}