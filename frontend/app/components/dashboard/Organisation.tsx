"use client";

import { OrganizationNode as Node } from "../../types/organisation";

interface Props {
  node: Node;
}

export default function OrganizationNode({ node }: Props) {
  return (
    <div className="ml-6 mt-4">

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">

        <h2 className="font-semibold text-lg">
          {node.name}
        </h2>

        <p className="text-sm text-slate-400">
          {node.designation}
        </p>

        <div className="mt-2 flex gap-2">

          <span className="bg-blue-600 px-2 py-1 rounded text-xs">
            {node.department}
          </span>

          <span className="bg-green-600 px-2 py-1 rounded text-xs">
            {node.role}
          </span>

        </div>

      </div>

      {node.children.length > 0 && (
        <div className="border-l border-slate-700 pl-6 mt-4">
          {node.children.map((child) => (
            <OrganizationNode
              key={child.id}
              node={child}
            />
          ))}
        </div>
      )}
    </div>
  );
}