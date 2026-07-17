"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../../../components/dashboard/Navbar";
import Sidebar from "../../../components/dashboard/Sidebar";
import EmployeeTable from "../../../components/dashboard/EmployeesTable";
import SearchBar from "../../../components/dashboard/SearchBar";
import Pagination from "../../../components/dashboard/Pagination";

import { getEmployees, deleteEmployee } from "@/app/services/employee";
import { Employee } from "../../../types/employees";

export default function EmployeesPage() {
    const router = useRouter();

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        fetchEmployees();
    }, [page, search, department, role]);

    const fetchEmployees = async () => {
        try {
            setLoading(true);

            const data = await getEmployees(
                page,
                search,
                department,
                role
            );

            setEmployees(data.employees);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {

        const ok = window.confirm(
            "Delete this employee?"
        );

        if (!ok) return;

        if(role !== "SUPER_AMDIN"){
            alert("you cannot delete users!");
            return;
        }


        try {

            const res = await deleteEmployee(id);

            if (res.success) {

                alert("Employee deleted successfully");

                fetchEmployees();

            } else {

                alert(res.message);

            }


        } catch (err: any) {

            alert(
                err.response?.data?.message ||
                "Something went wrong"
            );

        }
    };
    const handleEdit = (id: string) => {
        console.log("edit handler")
        router.push(`/dashboard/admin/employees/edit/${id}`);
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-white">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    <div className="flex justify-between items-center mb-8">

                        <div>

                            <h1 className="text-3xl font-bold">
                                Employees
                            </h1>

                            <p className="text-slate-400 mt-2">
                                Manage all employees in your organization.
                            </p>

                        </div>

                    </div>

                    <SearchBar
                        search={search}
                        department={department}
                        role={role}
                        onSearchChange={(value) => {
                            setPage(1);
                            setSearch(value);
                        }}
                        onDepartmentChange={(value) => {
                            setPage(1);
                            setDepartment(value);
                        }}
                        onRoleChange={(value) => {
                            setPage(1);
                            setRole(value);
                        }}
                        onAddEmployee={() =>
                            router.push("/dashboard/admin/employees/add")
                        }
                    />

                    <EmployeeTable
                        employees={employees}
                        loading={loading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />

                </main>

            </div>

        </div>
    );
}