"use client";


import { useState } from "react";
import api from "../lib/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";



export default function Login() {


    const router = useRouter();

    const { login } = useAuth();



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const handleLogin = async () => {


        try {


            const res = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );



            login(
                res.data.token,
                res.data.user
            );



            router.push("/dashboard");



        } catch (error) {

            alert("Invalid credentials");

        }


    }




    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-950">


            <div className="bg-slate-900 p-8 rounded-xl w-100">


                <h1 className="text-3xl font-bold text-white mb-6">
                    Login
                </h1>



                <input

                    className="w-full p-3 mb-4 bg-slate-800 rounded"

                    placeholder="Email"

                    onChange={(e) => setEmail(e.target.value)}

                />



                <input

                    className="w-full p-3 mb-4 bg-slate-800 rounded"

                    placeholder="Password"

                    type="password"

                    onChange={(e) => setPassword(e.target.value)}

                />




                <button

                    onClick={handleLogin}

                    className="w-full bg-blue-600 p-3 rounded"

                >

                    Login

                </button>


            </div>


        </div>

    )


}