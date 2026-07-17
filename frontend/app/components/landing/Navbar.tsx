"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full px-8 py-5 flex items-center justify-between">

      <div className="flex items-center gap-2">

        <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl">
          E
        </div>

        <h1 className="text-2xl font-bold">
          EMS Portal
        </h1>

      </div>


      <div className="flex gap-4">

        <Link
          href="/login"
          className="px-5 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition"
        >
          Login
        </Link>


        <Link
          href="/register"
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
        >
          Register
        </Link>

      </div>


    </nav>
  );
};

export default Navbar;