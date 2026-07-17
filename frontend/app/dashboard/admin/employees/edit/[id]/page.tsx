"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "@/app/components/dashboard/Navbar";
import Sidebar from "@/app/components/dashboard/Sidebar";
import EmployeeForm from "@/app/components/dashboard/EmployeeForm";

import api from "@/app/lib/axios";

import {
    getEmployeeById,
    updateEmployee,
} from "@/app/services/employee";

import { assignManager } from "@/app/services/organisation";

interface Manager {
    _id: string;
    name: string;
    role: string;
}

export default function EditEmployeePage() {
    const router = useRouter();
    const params = useParams();

    const id = params.id as string;

    const [employee, setEmployee] = useState<any>(null);

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [managers, setManagers] = useState<Manager[]>([]);
    const [managerId, setManagerId] = useState("");

    useEffect(() => {
        fetchEmployee();
        fetchManagers();
    }, []);

    const fetchEmployee = async () => {
        try {
            const res = await getEmployeeById(id);

            setEmployee(res.employee);

            if (res.employee.reportingManager) {
                if (
                    typeof res.employee.reportingManager === "object"
                ) {
                    setManagerId(res.employee.reportingManager._id);
                } else {
                    setManagerId(res.employee.reportingManager);
                }
            }
        } catch (err) {
            console.log(err);

            alert("Employee not found");

            router.push("/admin/employees");
        } finally {
            setPageLoading(false);
        }
    };

    const fetchManagers = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/employees?limit=1000", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const filtered = res.data.employees.filter(
                (emp: any) =>
                    emp.role === "SUPER_ADMIN" ||
                    emp.role === "HR_MANAGER"
            );

            setManagers(filtered);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (data: any) => {
        try {
            setLoading(true);

            await updateEmployee(id, data);

            if (managerId) {
                await assignManager(id, managerId);
            }

            alert("Employee Updated Successfully");

            router.push("/dashboard/admin/employees");
        } catch (err: any) {
            console.log(err);

            alert(
                err?.response?.data?.message ??
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xl">
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
                            Update employee details and reporting manager.
                        </p>

                    </div>

                    <EmployeeForm
                        initialData={employee}
                        loading={loading}
                        onSubmit={handleSubmit}
                        isEdit
                        managers={managers}
                        managerId={managerId}
                        setManagerId={setManagerId}
                    />

                </main>

            </div>

        </div>
    );
}