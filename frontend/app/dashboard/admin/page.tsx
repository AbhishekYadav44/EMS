"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import api from "../../lib/axios";
import { useAuth } from "@/app/context/authContext";

interface Employee {
  _id: string;
  department: string;
  name: string;
  designation: string;
  role: string;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalEmployees: 0,
    departments: 0,
    activeUsers: 0,
  });

  const [recentEmployees, setRecentEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetchDashboard();
  }, []);
const {user} = useAuth()
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/employees?limit=1000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const employees: Employee[] = res.data.employees;

      const departments = new Set(
        employees.map((emp) => emp.department)
      );

      setStats({
        totalEmployees: res.data.totalEmployees,
        departments: departments.size,
        activeUsers: employees.length,
      });

      setRecentEmployees(employees.slice(0, 5));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          {/* Header */}

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">
                {user?.role} Dashboard
              </h1>

              <p className="text-slate-400 mt-2">
                Welcome back 👋 Manage your organization efficiently.
              </p>
            </div>

            <Link
              href="/dashboard/admin/employees/add"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-medium transition"
            >
              + Add Employee
            </Link>
          </div>

          {/* Stats */}

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <p className="text-slate-400">
                Total Employees
              </p>

              <h2 className="text-5xl font-bold mt-4">
                {loading ? "--" : stats.totalEmployees}
              </h2>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <p className="text-slate-400">
                Departments
              </p>

              <h2 className="text-5xl font-bold mt-4">
                {loading ? "--" : stats.departments}
              </h2>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <p className="text-slate-400">
                Active Employees
              </p>

              <h2 className="text-5xl font-bold mt-4">
                {loading ? "--" : stats.activeUsers}
              </h2>
            </div>
          </div>

          {/* Quick Actions + Recent Employees */}

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Quick Actions */}

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h2 className="text-xl font-semibold mb-5">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <Link
                  href="/dashboard/admin/employees/add"
                  className="block w-full text-center bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Employee
                </Link>

                <Link
                  href="/dashboard/admin/employees"
                  className="block w-full text-center bg-slate-800 py-3 rounded-lg hover:bg-slate-700 transition"
                >
                  View Employees
                </Link>

                <Link
                  href="/dashboard/admin/organization-tree"
                  className="block w-full text-center bg-slate-800 py-3 rounded-lg hover:bg-slate-700 transition"
                >
                  Organization Tree
                </Link>

                <Link
                  href="/dashboard/admin/employees/deleted"
                  className="block w-full text-center bg-red-600 py-3 rounded-lg hover:bg-red-700 transition"
                >
                  Deleted Employees
                </Link>
              </div>
            </div>

            {/* Recent Employees */}

            <div className="lg:col-span-2 bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">
                  Recent Employees
                </h2>

                <Link
                  href="/dashboard/admin/employees"
                  className="text-blue-400 hover:text-blue-300"
                >
                  View All
                </Link>
              </div>

              {loading ? (
                <p className="text-slate-400">
                  Loading...
                </p>
              ) : recentEmployees.length === 0 ? (
                <p className="text-slate-400">
                  No Employees Found
                </p>
              ) : (
                <div className="space-y-4">
                  {recentEmployees.map((emp) => (
                    <div
                      key={emp._id}
                      className="flex justify-between items-center bg-slate-800 rounded-lg px-4 py-3"
                    >
                      <div>
                        <h3 className="font-semibold">
                          {emp.name}
                        </h3>

                        <p className="text-sm text-slate-400">
                          {emp.designation}
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-blue-600 text-sm">
                        {emp.role}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}