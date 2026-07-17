"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/authContext";


export default function Sidebar() {

    const { user } = useAuth();
    console.log("______________",user?.role)


    return (

        <aside
            className="
            w-64
            bg-slate-900
            min-h-screen
            p-5
            text-white
            "
        >

            <h2 className="text-lg font-bold mb-6">
                Menu
            </h2>


            <nav className="space-y-3">


                <Link
                    href="/dashboard"
                    className="block hover:text-blue-400"
                >
                    Dashboard
                </Link>



                <Link
                    href="/dashboard/employee/profile"
                    className="block hover:text-blue-400"
                >
                    Profile
                </Link>



                {
                    user?.role !== "EMPLOYEE" && (

                        <Link
                            href="/dashboard/admin/employees"
                            className="block hover:text-blue-400"
                        >
                            Employees
                        </Link>

                    )
                }


            </nav>


        </aside>

    );
}