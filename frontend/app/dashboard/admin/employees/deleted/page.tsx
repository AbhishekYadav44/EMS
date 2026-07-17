"use client";

import { useEffect, useState } from "react";

import Navbar from "@/app/components/dashboard/Navbar";
import Sidebar from "@/app/components/dashboard/Sidebar";

import {
  getDeletedEmployees,
  restoreEmployee,
  permanentDeleteEmployee,
} from "@/app/services/employee";

import { Employee } from "../../../../types/employees";

export default function DeletedEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeletedEmployees();
  }, []);

  const fetchDeletedEmployees = async () => {
    try {
      setLoading(true);

      const res = await getDeletedEmployees();

      setEmployees(res.employees);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id: string) => {
    if (!confirm("Restore this employee?")) return;

    try {
      await restoreEmployee(id);

      alert("Employee Restored");

      fetchDeletedEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    if (
      !confirm(
        "This employee will be deleted permanently.\nContinue?"
      )
    )
      return;

    try {
      await permanentDeleteEmployee(id);

      alert("Employee Deleted Permanently");

      fetchDeletedEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          <h1 className="text-3xl font-bold">
            Deleted Employees
          </h1>

          <p className="text-slate-400 mt-2 mb-8">
            Restore or permanently delete employees.
          </p>

          {loading ? (
            <div className="text-center py-10">
              Loading...
            </div>
          ) : employees.length === 0 ? (
            <div className="bg-slate-900 rounded-xl p-10 text-center text-slate-400">
              No Deleted Employees
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-800">

              <table className="w-full">

                <thead className="bg-slate-900">

                  <tr>

                    <th className="text-left px-5 py-4">
                      Name
                    </th>

                    <th className="text-left px-5 py-4">
                      Email
                    </th>

                    <th className="text-left px-5 py-4">
                      Department
                    </th>

                    <th className="text-left px-5 py-4">
                      Role
                    </th>

                    <th className="text-center px-5 py-4">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {employees.map((emp) => (

                    <tr
                      key={emp._id}
                      className="border-t border-slate-800 hover:bg-slate-900"
                    >

                      <td className="px-5 py-4">
                        {emp.name}
                      </td>

                      <td className="px-5 py-4">
                        {emp.email}
                      </td>

                      <td className="px-5 py-4">
                        {emp.department}
                      </td>

                      <td className="px-5 py-4">
                        {emp.role}
                      </td>

                      <td className="px-5 py-4">

                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() =>
                              handleRestore(emp._id)
                            }
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                          >
                            Restore
                          </button>

                          <button
                            onClick={() =>
                              handlePermanentDelete(emp._id)
                            }
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                          >
                            Permanent Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </main>

      </div>

    </div>
  );
}