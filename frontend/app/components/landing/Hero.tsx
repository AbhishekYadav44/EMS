"use client";


import Link from "next/link";


const Hero = () => {

  return (

    <section className="px-8 py-20">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">


        {/* LEFT */}

        <div>


          <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm">
            Smart Employee Management Solution
          </span>


          <h1 className="mt-6 text-5xl font-bold leading-tight">

            Manage Your Workforce
            <span className="text-blue-500">
              {" "}Smarter & Faster
            </span>

          </h1>


          <p className="mt-6 text-slate-400 text-lg max-w-xl">

            EMS Portal helps organizations manage employees,
            roles, departments, profiles and reporting hierarchy
            from one secure platform.

          </p>



          <div className="mt-8 flex gap-4">


            <Link
              href="/register"
              className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
            >
              Get Started
            </Link>


            <Link
              href="/login"
              className="px-7 py-3 rounded-xl border border-slate-700 hover:bg-slate-900"
            >
              Login
            </Link>


          </div>


        </div>




        {/* RIGHT DASHBOARD MOCKUP */}


        <div className="relative">


          <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl p-6">


            <div className="flex justify-between items-center">

              <h2 className="font-semibold">
                Employee Dashboard
              </h2>


              <span className="text-green-400 text-sm">
                Active
              </span>

            </div>



            <div className="grid grid-cols-2 gap-4 mt-8">


              <div className="bg-slate-800 p-5 rounded-xl">

                <p className="text-slate-400 text-sm">
                  Employees
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  250+
                </h3>

              </div>



              <div className="bg-slate-800 p-5 rounded-xl">

                <p className="text-slate-400 text-sm">
                  Departments
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  12
                </h3>

              </div>


            </div>



            <div className="mt-5 bg-slate-800 rounded-xl p-5">


              <p className="text-slate-400 text-sm">
                Organization Status
              </p>


              <div className="mt-4 space-y-3">


                <div className="flex justify-between">
                  <span>
                    HR Team
                  </span>
                  <span className="text-green-400">
                    Online
                  </span>
                </div>


                <div className="flex justify-between">
                  <span>
                    Employees
                  </span>

                  <span>
                    98%
                  </span>

                </div>



              </div>


            </div>



          </div>


        </div>



      </div>


    </section>

  )

}


export default Hero;