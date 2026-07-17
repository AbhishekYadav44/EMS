"use client";


import Navbar from "../../components/dashboard/Navbar";


export default function EmployeeDashboard() {


    return (

        <div className="min-h-screen bg-slate-950 text-white">


            <Navbar />


            <div className="p-8">


                <h1 className="text-3xl font-bold">
                    Employee Dashboard
                </h1>


                <div className="mt-8 bg-slate-900 p-6 rounded-xl">

                    <h2>
                        Welcome Employee
                    </h2>


                    <p className="text-slate-400 mt-2">
                        View your profile and update details.
                    </p>


                </div>


            </div>


        </div>

    )

}