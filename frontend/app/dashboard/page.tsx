"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Dashboard() {

    const router = useRouter();


    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            router.push("/login");
            return;
        }


        const user = JSON.parse(storedUser);


        console.log("DASHBOARD ROLE:", user.role);


        if (user.role === "SUPER_ADMIN") {
            router.replace("/dashboard/admin");
        }
        else if (user.role === "HR_MANAGER") {
            router.replace("/dashboard/manager");
        }
        else {
            router.replace("/dashboard/employee");
        }


    }, [router]);



    return (

        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

            Loading Dashboard...

        </div>

    )


}