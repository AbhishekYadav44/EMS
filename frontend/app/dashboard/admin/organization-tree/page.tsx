"use client";

import { useEffect, useState } from "react";

import Navbar from "@/app/components/dashboard/Navbar";
import Sidebar from "@/app/components/dashboard/Sidebar";
import OrganizationNode from "../../../components/dashboard/Organisation";

import { getOrganizationTree } from "../../../services/organisation";
import { OrganizationNode as Node } from "../../../types/organisation";

export default function OrganizationPage() {

  const [tree, setTree] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTree();
  }, []);

  const loadTree = async () => {
    try {
      const res = await getOrganizationTree();
      setTree(res.tree);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          <h1 className="text-3xl font-bold">
            Organization Tree
          </h1>

          <p className="text-slate-400 mt-2 mb-8">
            Company reporting hierarchy
          </p>

          {loading ? (
            <p>Loading...</p>
          ) : (
            tree.map((node) => (
              <OrganizationNode
                key={node.id}
                node={node}
              />
            ))
          )}

        </main>

      </div>

    </div>
  );
}