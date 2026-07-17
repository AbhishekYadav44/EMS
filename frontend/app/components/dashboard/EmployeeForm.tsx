"use client";

import { useState, useEffect } from "react";

interface EmployeeFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading: boolean;
  isEdit?: boolean;
}

export default function EmployeeForm({
  initialData,
  onSubmit,
  loading,
  isEdit = false,
}: EmployeeFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    role: "EMPLOYEE",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
        phone: initialData.phone || "",
        department: initialData.department || "",
        designation: initialData.designation || "",
        salary: initialData.salary?.toString() || "",
        role: initialData.role || "EMPLOYEE",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      ...form,
      salary: Number(form.salary),
    };

    if (isEdit) {
      delete payload.password;
      delete payload.email;
    }

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 rounded-xl p-8 border border-slate-800 space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2 text-sm text-slate-300">
            Full Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-slate-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            disabled={isEdit}
            onChange={handleChange}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 disabled:opacity-60"
          />
        </div>

        {!isEdit && (
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3"
            />
          </div>
        )}

        <div>
          <label className="block mb-2 text-sm text-slate-300">
            Phone
          </label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-slate-300">
            Department
          </label>

          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-slate-300">
            Designation
          </label>

          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-slate-300">
            Salary
          </label>

          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-slate-300">
            Role
          </label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3"
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="HR_MANAGER">HR Manager</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>

      </div>

      <button
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Employee"
          : "Create Employee"}
      </button>
    </form>
  );
}