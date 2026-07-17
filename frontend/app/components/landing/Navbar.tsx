"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full px-8 lg:px-16 py-5 flex items-center justify-between border-b border-slate-800">

      {/* Logo */}

      <div className="flex items-center gap-3">

        <div className="h-11 w-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
          <span className="text-2xl font-bold">
            EMS
          </span>
        </div>


        <div>
          <h1 className="text-xl font-bold">
            Employee Portal
          </h1>

          <p className="text-xs text-slate-400">
            Management System
          </p>
        </div>

      </div>



      {/* Navigation */}

      <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">


        <Link 
          href="/"
          className="hover:text-white transition"
        >
          Home
        </Link>


        <Link 
          href="#features"
          className="hover:text-white transition"
        >
          Features
        </Link>


        <Link 
          href="#about"
          className="hover:text-white transition"
        >
          About
        </Link>


      </div>




      {/* Login Only */}

      <div className="flex items-center">


        <Link
          href="/login"
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
        >
          Login
        </Link>


      </div>


    </nav>
  );
};


export default Navbar;