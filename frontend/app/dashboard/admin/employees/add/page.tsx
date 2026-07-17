"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


import Navbar from "@/app/components/dashboard/Navbar";
import Sidebar from "@/app/components/dashboard/Sidebar";
import EmployeeForm from "@/app/components/dashboard/EmployeeForm";

import { createEmployee } from "@/app/services/employee";

export default function AddEmployeePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);

      await createEmployee(data);

      alert("Employee Created Successfully");

      router.push("/dashboard/admin/employees");
    } catch (error: any) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
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

          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Add Employee
            </h1>

            <p className="text-slate-400 mt-2">
              Create a new employee account.
            </p>

          </div>

          <EmployeeForm
            onSubmit={handleSubmit}
            loading={loading}
          />

        </main>

      </div>

    </div>
  );
}