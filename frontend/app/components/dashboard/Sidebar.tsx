"use client";


import Link from "next/link";


export default function Sidebar() {


    return (

        <aside
            className="
w-64
bg-slate-900
min-h-screen
p-5
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
                    href="/dashboard/profile"
                    className="block hover:text-blue-400"
                >
                    Profile
                </Link>



                <Link
                    href="/dashboard/employees"
                    className="block hover:text-blue-400"
                >
                    Employees
                </Link>


            </nav>


        </aside>

    )


}