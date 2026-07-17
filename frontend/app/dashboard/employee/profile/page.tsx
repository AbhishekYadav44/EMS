"use client";

import { useEffect, useState } from "react";

import Navbar from "@/app/components/dashboard/Navbar";
import Sidebar from "@/app/components/dashboard/Sidebar";

import {
  getMyProfile,
  updateMyProfile,
} from "@/app/services/profile";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
//
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    role: "",
    salary: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();

      const emp = res.employee;

      setForm({
        name: emp.name,
        email: emp.email,
        phone: emp.phone,
        department: emp.department,
        designation: emp.designation,
        role: emp.role,
        salary: emp.salary,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);

      await updateMyProfile({
        name: form.name,
        phone: form.phone,
      });

      alert("Profile Updated Successfully");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      
      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8 max-w-4xl">

          <h1 className="text-3xl font-bold mb-8">
            My Profile
          </h1>

          <div className="bg-slate-900 rounded-xl p-8 space-y-6">

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label>Name</label>

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg bg-slate-950 border border-slate-700 p-3"
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  disabled
                  value={form.email}
                  className="mt-2 w-full rounded-lg bg-slate-950 border border-slate-700 p-3 opacity-70"
                />
              </div>

              <div>
                <label>Phone</label>

                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg bg-slate-950 border border-slate-700 p-3"
                />
              </div>

              <div>
                <label>Department</label>

                <input
                  disabled
                  value={form.department}
                  className="mt-2 w-full rounded-lg bg-slate-950 border border-slate-700 p-3 opacity-70"
                />
              </div>

              <div>
                <label>Designation</label>

                <input
                  disabled
                  value={form.designation}
                  className="mt-2 w-full rounded-lg bg-slate-950 border border-slate-700 p-3 opacity-70"
                />
              </div>

              <div>
                <label>Role</label>

                <input
                  disabled
                  value={form.role}
                  className="mt-2 w-full rounded-lg bg-slate-950 border border-slate-700 p-3 opacity-70"
                />
              </div>

              <div>
                <label>Salary</label>

                <input
                  disabled
                  value={form.salary}
                  className="mt-2 w-full rounded-lg bg-slate-950 border border-slate-700 p-3 opacity-70"
                />
              </div>

            </div>

            <button
              onClick={handleUpdate}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
            >
              {saving ? "Updating..." : "Update Profile"}
            </button>

          </div>

        </main>

      </div>

    </div>
  );
}