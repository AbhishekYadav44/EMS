"use client";

import { useState } from "react";
import api from "../lib/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import Link from "next/link";


export default function Login() {


    const router = useRouter();

    const { login } = useAuth();


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");




    const handleLogin = async () => {


        try {

            setLoading(true);
            setError("");

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


            const role = res.data.user.role;



            if(role === "SUPER_ADMIN"){

                router.push("/dashboard/admin");

            }
            else if(role === "HR_MANAGER"){

                router.push("/dashboard/manager");

            }
            else{

                router.push("/dashboard/employee");

            }



        } 
        catch(error){

            setError("Invalid email or password");

        }
        finally{

            setLoading(false);

        }

    }





    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">


            <div className="w-full max-w-md">


                {/* Back Button */}

                <button

                    onClick={() => router.back()}

                    className="mb-6 text-slate-400 hover:text-white flex items-center gap-2"

                >

                    ← Back

                </button>





                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">


                    {/* Heading */}


                    <div className="mb-8">


                        <h1 className="text-3xl font-bold text-white">
                            Welcome Back
                        </h1>


                        <p className="text-slate-400 mt-2">
                            Login to your Employee Portal account
                        </p>


                    </div>





                    {
                        error && (

                            <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">

                                {error}

                            </div>

                        )
                    }





                    <input

                        className="w-full p-3 mb-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"

                        placeholder="Email address"

                        type="email"

                        value={email}

                        onChange={(e)=>setEmail(e.target.value)}

                    />





                    <input

                        className="w-full p-3 mb-6 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"

                        placeholder="Password"

                        type="password"

                        value={password}

                        onChange={(e)=>setPassword(e.target.value)}

                    />





                    <button

                        onClick={handleLogin}

                        disabled={loading}

                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-3 rounded-lg font-semibold transition"

                    >

                        {
                            loading 
                            ? "Logging in..."
                            : "Login"
                        }


                    </button>





                    {/* Register Link */}


                    <p className="text-center text-slate-400 mt-6">


                        Don't have an account?

                        req admin to create account!
                        


                    </p>




                </div>


            </div>


        </div>

    )

}