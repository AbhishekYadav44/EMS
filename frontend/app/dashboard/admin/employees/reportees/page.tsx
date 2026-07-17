"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "@/app/components/dashboard/Navbar";
import Sidebar from "@/app/components/dashboard/Sidebar";

import { getReportees } from "@/app/services/organisation";

interface Reportee {
  id: string;
  name: string;
  email: string;
}

export default function ReporteesPage() {
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [manager, setManager] = useState("");

  const [reportees, setReportees] = useState<Reportee[]>([]);

  useEffect(() => {
    fetchReportees();
  }, []);

  const fetchReportees = async () => {
    try {
      const res = await getReportees(id);

      setManager(res.manager);

      setReportees(res.reportees);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          <h1 className="text-3xl font-bold">
            Reportees
          </h1>

          <p className="text-slate-400 mt-2">
            Reporting to <span className="text-white">{manager}</span>
          </p>

          <div className="mt-8 bg-slate-900 rounded-xl overflow-hidden border border-slate-800">

            <table className="w-full">

              <thead className="bg-slate-800">

                <tr>

                  <th className="text-left px-6 py-4">
                    Name
                  </th>

                  <th className="text-left px-6 py-4">
                    Email
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan={2}
                      className="text-center py-8"
                    >
                      Loading...
                    </td>

                  </tr>

                ) : reportees.length === 0 ? (

                  <tr>

                    <td
                      colSpan={2}
                      className="text-center py-8 text-slate-400"
                    >
                      No Reportees Found
                    </td>

                  </tr>

                ) : (

                  reportees.map((employee) => (

                    <tr
                      key={employee.id}
                      className="border-t border-slate-800 hover:bg-slate-800 transition"
                    >

                      <td className="px-6 py-4">
                        {employee.name}
                      </td>

                      <td className="px-6 py-4">
                        {employee.email}
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  );
}