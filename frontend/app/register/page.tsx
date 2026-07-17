"use client";


import { useState } from "react";
import api from "../lib/axios";
import { useRouter } from "next/navigation";



export default function Register() {


    const router = useRouter();



    const [form, setForm] = useState<any>({});



    const change = (e: any) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        })

    }



    const register = async () => {


        try {


            await api.post(
                "/auth/register",
                form
            );



            alert("Registration successful");

            router.push("/login");



        } catch (err) {

            alert("Registration failed");

        }



    }



    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-950">


            <div className="bg-slate-900 p-8 rounded-xl w-100">


                <h1 className="text-3xl text-white font-bold mb-5">
                    Create Account
                </h1>



                {
                    [
                        "name",
                        "email",
                        "password",
                        "phone",
                        "department",
                        "designation",
                        "salary"
                    ].map((field) => (


                        <input

                            key={field}

                            name={field}

                            placeholder={field}

                            className="w-full p-3 mb-3 bg-slate-800 rounded"

                            onChange={change}

                        />


                    ))

                }



                <select

                    name="role"

                    onChange={change}

                    className="w-full p-3 mb-4 bg-slate-800 rounded"

                >


                    <option value="">
                        Select Role
                    </option>


                    <option value="SUPER_ADMIN">
                        SUPER ADMIN
                    </option>


                    <option value="HR_MANAGER">
                        HR MANAGER
                    </option>


                    <option value="EMPLOYEE">
                        EMPLOYEE
                    </option>



                </select>




                <button

                    onClick={register}

                    className="w-full bg-blue-600 p-3 rounded"

                >

                    Register

                </button>


            </div>


        </div>

    )


}