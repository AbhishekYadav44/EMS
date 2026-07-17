import api from "../lib/axios";
import { EmployeeResponse } from "../types/employees";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getEmployees = async (
  page = 1,
  search = "",
  department = "",
  role = ""
): Promise<EmployeeResponse> => {
  const token = getToken();

  const res = await api.get("/employees", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      limit: 10,
      search,
      department,
      role,
    },
  });

  return res.data;
};

export const getEmployeeById = async (id: string) => {
  const token = getToken();

  const res = await api.get(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createEmployee = async (data: any) => {
  const token = getToken();

  const res = await api.post("/employees", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateEmployee = async (id: string, data: any) => {
  const token = getToken();

  const res = await api.put(`/employees/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteEmployee = async (id: string) => {
  const token = getToken();

  const res = await api.delete(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getDeletedEmployees = async () => {
  const token = getToken();

  const res = await api.get("/employees/deleted", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const restoreEmployee = async (id: string) => {
  const token = getToken();

  const res = await api.patch(
    `/employees/${id}/restore`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const permanentDeleteEmployee = async (id: string) => {
  const token = getToken();

  const res = await api.delete(`/employees/${id}/permanent`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};