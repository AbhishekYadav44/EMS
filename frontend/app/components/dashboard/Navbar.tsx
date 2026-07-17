"use client";


import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";


export default function Navbar() {


    const { logout } = useAuth();

    const router = useRouter();


    return (

        <header className="
h-16 
bg-slate-900 
border-b 
border-slate-800
flex 
items-center 
justify-between
px-6
">


            <h1 className="text-xl font-bold">
                EMS Portal
            </h1>



            <button

                onClick={() => {

                    logout();

                    

                }}

                className="
bg-red-500
px-4
py-2
rounded-lg
"

            >

                Logout

            </button>



        </header>

    )

}