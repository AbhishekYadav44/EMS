"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Dashboard() {

    const router = useRouter();


    useEffect(() => {

        const user = JSON.parse(
            localStorage.getItem("user") || "{}"
        );


        if (!user.role) {
            router.push("/login");
            return;
        }


        switch (user.role) {

            case "SUPER_ADMIN":
                router.push("/dashboard/admin");
                break;


            case "HR_MANAGER":
                router.push("/dashboard/hr");
                break;


            default:
                router.push("/dashboard/employee");

        }



    }, []);



    return (

        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

            Loading Dashboard...

        </div>

    )


}