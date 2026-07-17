"use client";

import { useState } from "react";

interface Manager {
    _id: string;
    name: string;
    role: string;
}

interface Props {
    initialData?: any;
    loading: boolean;
    onSubmit: (data: any) => void;

    isEdit?: boolean;

    managers?: Manager[];
    managerId?: string;
    setManagerId?: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmployeeForm({
    initialData,
    loading,
    onSubmit,
    isEdit = false,
    managers = [],
    managerId = "",
    setManagerId,
}: Props) {
    const [form, setForm] = useState({
        name: initialData?.name || "",
        email: initialData?.email || "",
        password: "",
        phone: initialData?.phone || "",
        department: initialData?.department || "",
        designation: initialData?.designation || "",
        salary: initialData?.salary || "",
        role: initialData?.role || "EMPLOYEE",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: any = {
            ...form,
        };

        if (isEdit) {
            delete payload.password;
        }

        onSubmit(payload);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-slate-900 rounded-xl p-8 space-y-6 max-w-4xl"
        >
            <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <label className="text-sm text-slate-300">Name</label>

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm text-slate-300">Email</label>

                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={isEdit}
                        className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                        required
                    />
                </div>

                {!isEdit && (
                    <div>
                        <label className="text-sm text-slate-300">
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                            required
                        />
                    </div>
                )}

                <div>
                    <label className="text-sm text-slate-300">Phone</label>

                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                    />
                </div>

                <div>
                    <label className="text-sm text-slate-300">
                        Department
                    </label>

                    <input
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                    />
                </div>

                <div>
                    <label className="text-sm text-slate-300">
                        Designation
                    </label>

                    <input
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                    />
                </div>

                <div>
                    <label className="text-sm text-slate-300">
                        Salary
                    </label>

                    <input
                        type="number"
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                    />
                </div>

                <div>
                    <label className="text-sm text-slate-300">
                        Role
                    </label>

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                    >
                        <option value="EMPLOYEE">Employee</option>
                        <option value="HR_MANAGER">HR Manager</option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                    </select>
                </div>

                {isEdit && setManagerId && (
                    <div className="md:col-span-2">
                        <label className="text-sm text-slate-300">
                            Reporting Manager
                        </label>

                        <select
                            value={managerId}
                            onChange={(e) => setManagerId(e.target.value)}
                            className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                        >
                            <option value="">Select Manager</option>

                            {managers.map((manager) => (
                                <option
                                    key={manager._id}
                                    value={manager._id}
                                >
                                    {manager.name} ({manager.role})
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <button
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
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