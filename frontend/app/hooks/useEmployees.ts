"use client";

import { useEffect, useState } from "react";
import { getEmployees } from "../services/employee";
import { Employee } from "../types/employees";

export default function useEmployees(page = 1) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const data = await getEmployees(page);

      setEmployees(data.employees);
      setTotalPages(data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  return {
    employees,
    loading,
    totalPages,
    fetchEmployees,
  };
}