"use client";

interface SearchBarProps {
  search: string;
  department: string;
  role: string;

  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onRoleChange: (value: string) => void;

  onAddEmployee: () => void;
}

export default function SearchBar({
  search,
  department,
  role,
  onSearchChange,
  onDepartmentChange,
  onRoleChange,
  onAddEmployee,
}: SearchBarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

      {/* Filters */}

      <div className="flex flex-col md:flex-row gap-4 flex-1">

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 rounded-lg border focus:border-blue-500 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        >
          <option value="">All Roles</option>
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="HR_MANAGER">HR Manager</option>
          <option value="EMPLOYEE">Employee</option>
        </select>

      </div>

      {/* Add Button */}

      <button
        onClick={onAddEmployee}
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700"
      >
        + Add Employee
      </button>

    </div>
  );
}