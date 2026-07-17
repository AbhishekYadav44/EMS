"use client";

import Navbar from "../../components/dashboard/Navbar";
import { useEffect, useState } from "react";
import api from "../../lib/axios";
import Link from "next/link";


export default function EmployeeDashboard() {

    const [employee, setEmployee] = useState<any>(null);


    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                console.log("TOKEN:", token);


                const res = await api.get("/profile/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });


                console.log("PROFILE:", res.data);

                setEmployee(res.data.employee);


            } catch (error: any) {

                console.log(
                    error.response?.data || error.message
                );

            }

        };


        fetchProfile();

    }, []);



    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />


            <div className="p-8">

                <h1 className="text-3xl font-bold">
                    Employee Dashboard
                </h1>


                <div className="mt-8 bg-slate-900 p-6 rounded-xl">

                    {
                        employee ? (

                            <>
                                <h2 className="text-xl">
                                    Welcome {employee.name}
                                </h2>

                                <p className="text-slate-400">
                                    Email: {employee.email}
                                </p>

                                <p className="text-slate-400">
                                    Role: {employee.role}
                                </p>

                            </>

                        ) : (

                            <p>
                                Loading...
                            </p>

                        )
                    }


                </div>
                <Link
 href="/dashboard/employee/profile"
 className="bg-blue-600 px-5 py-3 rounded-lg inline-block mt-5"
>
 View Profile
</Link>


            </div>


        </div>

    )

}