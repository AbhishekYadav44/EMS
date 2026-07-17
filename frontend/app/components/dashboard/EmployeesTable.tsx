"use client";

import { Employee } from "../../types/employees";
import Link from "next/link";

interface Props {
    employees: Employee[];
    loading: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export default function EmployeeTable({
    employees,
    loading,
    onEdit,
    onDelete,
}: Props) {
    if (loading) {
        return (
            <div className="bg-slate-900 rounded-xl p-10 text-center text-slate-400">
                Loading employees...
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="bg-slate-900 rounded-xl p-10 text-center text-slate-400">
                No Employees Found
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">

            <table className="w-full">

                <thead className="bg-slate-800">

                    <tr>

                        <th className="px-5 py-4 text-left">Name</th>

                        <th className="px-5 py-4 text-left">Email</th>

                        <th className="px-5 py-4 text-left">Department</th>

                        <th className="px-5 py-4 text-left">Designation</th>

                        <th className="px-5 py-4 text-left">Role</th>

                        <th className="px-5 py-4 text-left">Status</th>

                        <th className="px-5 py-4 text-center">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {employees.map((employee) => (
                        <tr
                            key={employee._id}
                            className="border-t border-slate-800 hover:bg-slate-800/50 transition"
                        >
                            <td className="px-5 py-4 font-medium">
                                {employee.name}
                            </td>

                            <td className="px-5 py-4 text-slate-300">
                                {employee.email}
                            </td>

                            <td className="px-5 py-4">
                                {employee.department}
                            </td>

                            <td className="px-5 py-4">
                                {employee.designation}
                            </td>

                            <td className="px-5 py-4">
                                {employee.role}
                            </td>

                            <td className="px-5 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${employee.status === "ACTIVE"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    {employee.status}
                                </span>
                            </td>

                            <td className="px-5 py-4">

                                <div className="flex justify-center gap-2">

                                    <button
                                        onClick={() => onEdit?.(employee._id)}
                                        className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => onDelete?.(employee._id)}
                                        className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        href={`/admin/employees/reportees/${employee._id}`}
                                        className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-sm"
                                    >
                                        Reportees
                                    </Link>

                                </div>

                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}