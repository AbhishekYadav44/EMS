"use client";

import Link from "next/link";


const Hero = () => {
  return (

    <section className="px-8 lg:px-16 py-20">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">


        {/* LEFT CONTENT */}

        <div>


          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20">

            <span className="h-2 w-2 rounded-full bg-green-400"></span>

            Smart Employee Management System

          </div>



          <h1 className="mt-7 text-5xl lg:text-6xl font-bold leading-tight">


            Manage Employees


            <br />


            <span className="text-blue-500">
              Efficiently & Securely
            </span>


          </h1>




          <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">


            A centralized employee portal to manage profiles,
            roles, departments, attendance and organizational
            activities with ease.



          </p>




          <div className="mt-8 flex gap-4">


            <Link
              href="/register"
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg shadow-blue-600/30"
            >
              Get Started
            </Link>



            <Link
              href="/login"
              className="px-8 py-3 rounded-xl border border-slate-700 hover:bg-slate-900"
            >
              Login
            </Link>



          </div>





          {/* STATS */}


          <div className="mt-12 flex gap-10">


            <div>

              <h3 className="text-3xl font-bold">
                250+
              </h3>

              <p className="text-sm text-slate-400">
                Employees
              </p>

            </div>




            <div>

              <h3 className="text-3xl font-bold">
                15+
              </h3>

              <p className="text-sm text-slate-400">
                Departments
              </p>

            </div>




            <div>

              <h3 className="text-3xl font-bold">
                24/7
              </h3>

              <p className="text-sm text-slate-400">
                Access
              </p>

            </div>


          </div>



        </div>






        {/* RIGHT DASHBOARD */}



        <div className="relative">


          <div className="absolute inset-0 bg-blue-600 blur-[120px] opacity-20"></div>



          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">



            {/* Header */}

            <div className="flex justify-between items-center">


              <div>

                <p className="text-sm text-slate-400">
                  Employee Dashboard
                </p>


                <h2 className="text-xl font-semibold">
                  Welcome Back
                </h2>


              </div>



              <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                Active
              </div>


            </div>





            {/* Cards */}


            <div className="grid grid-cols-2 gap-4 mt-8">


              <div className="bg-slate-800 rounded-xl p-5">


                <p className="text-sm text-slate-400">
                  Total Employees
                </p>


                <h3 className="text-3xl font-bold mt-2">
                  250
                </h3>


              </div>




              <div className="bg-slate-800 rounded-xl p-5">


                <p className="text-sm text-slate-400">
                  Departments
                </p>


                <h3 className="text-3xl font-bold mt-2">
                  12
                </h3>


              </div>



            </div>





            {/* Activity */}


            <div className="mt-5 bg-slate-800 rounded-xl p-5">


              <p className="text-sm text-slate-400">
                Recent Updates
              </p>



              <div className="mt-4 space-y-4">


                <div className="flex justify-between">

                  <span>
                    New employee added
                  </span>

                  <span className="text-green-400">
                    Done
                  </span>

                </div>




                <div className="flex justify-between">

                  <span>
                    Profile updated
                  </span>

                  <span>
                    Today
                  </span>

                </div>




                <div className="flex justify-between">

                  <span>
                    Department assigned
                  </span>

                  <span>
                    Completed
                  </span>

                </div>



              </div>


            </div>



          </div>



        </div>



      </div>


    </section>

  );
};


export default Hero;