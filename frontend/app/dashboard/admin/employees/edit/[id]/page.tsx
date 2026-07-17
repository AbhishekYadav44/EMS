"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "@/app/components/dashboard/Navbar";
import Sidebar from "@/app/components/dashboard/Sidebar";
import EmployeeForm from "@/app/components/dashboard/EmployeeForm";

import {
  getEmployeeById,
  updateEmployee,
} from "@/app/services/employee";

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await getEmployeeById(id);

      setEmployee(res.employee);
    } catch (err) {
      console.log(err);
      alert("Employee not found");
      router.push("/admin/employees");
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);

      await updateEmployee(id, data);

      alert("Employee Updated Successfully");

      router.push("/admin/employees");
    } catch (err: any) {
      console.log(err);

      alert(
        err?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Edit Employee
            </h1>

            <p className="text-slate-400 mt-2">
              Update employee details.
            </p>

          </div>

          <EmployeeForm
            initialData={employee}
            loading={loading}
            onSubmit={handleSubmit}
            isEdit
          />

        </main>

      </div>

    </div>
  );
}